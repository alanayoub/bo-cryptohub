// Node
const EventEmitter = require('events');

// CryptoHub
const logger         = require.main.require('./logger');
const commonDelay    = require.main.require('./utils/common-delay');
const scrapeJSON     = require('./scrape-json');

/**
 *
 * SCRAPE QUEUE
 *
 */
module.exports = class ScrapeQueue extends EventEmitter {

  constructor(options) {
    super();
    this.rateLimit = options.rateLimit;
    this.bootstraped = false;
    this.queues = {};
    this.proxies = {};
    this.groups = {};
    this.timestamp = +new Date();
    this.requests = 0;
    this.options = options;
    //
    // Intercept 'shift'
    // If last item in array call getJobs()
    // Calls function only after interval has elapsed
    //
    this.handler = {
      get: function (obj, prop) {
        if (prop === 'shift' && obj.length === 0) {
          const t = +new Date();
          const currentInterval = t - (obj.startTimestamp || 0);
          const timeLeft = obj.interval - currentInterval;
          const reset = () => {
            obj.getJobs(obj);
            obj.timeout = void 0;
            obj.startTimestamp = +new Date();
          };
          if (timeLeft > 0) {
            logger.info(`get ${obj.name} jobs in ${timeLeft}ms`);
            if (!obj.timeout) {
              obj.saveToDb();
              obj.timeout = setTimeout(reset, timeLeft);
            }
          }
          else {
            logger.info(`get ${obj.name} jobs now because timeleft = ${timeLeft}ms`);
            obj.saveToDb();
            reset();
          }
        }
        return obj[prop];
      }
    }
    this.run();
  }

  addToQueue(config) {
    const name = config.name;
    logger.info(`Starting ${name} scraper`);
    this.queues[name] = [];
    this.queues[name].name = name;
    this.queues[name].interval = config.interval;
    this.queues[name].getJobs = config.getJobs;
    this.queues[name].saveToDb = config.save;
    this.proxies[name] = new Proxy(this.queues[name], this.handler);
  }

  async run() {
    // bootstrap
    if (this.options.bootstrap && !this.bootstraped) {
      this[this.options.bootstrap.name] = await this.options.bootstrap.func();
      this.bootstraped = true;
    }
    // do scrape
    for (let [name, queue] of Object.entries(this.proxies)) {
      const item = queue.shift();
      if (item) {
        const { uri, key, cacheForDays, groupKey, last } = item;
        const file = await scrapeJSON(uri, key, cacheForDays);
        const elapsedTime = +new Date() - this.timestamp;
        const name = queue.name;
        this.requests++;
        logger.info(`time: ${elapsedTime/this.requests} ms per ${name} request`);
        logger.info(`total ${name} requests: ${this.requests}`);
        //
        // Deal with paginated requests
        // Collect groups of files in an Array then save a master file
        //
        if (groupKey) {
          if (last) {
            if (this.groups[name]) {
              this.groups[name].push(file);
              global.cache.set(groupKey, JSON.stringify(this.groups[name]));
              this.groups[name] = [];
            }
          }
          else {
            if (!this.groups[name]) {
              this.groups[name] = [];
            }
            this.groups[name].push(file);
          }
        }
      }
      await commonDelay(50);
    }
    this.run();
    return true;
  }

}
