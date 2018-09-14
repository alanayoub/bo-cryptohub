// Node
const EventEmitter = require('events');

// Libs
const { to }       = require('await-to-js');

// CryptoHub
const logger       = require.main.require('./logger');
const commonDelay  = require.main.require('./utils/common-delay');
const scrapeJSON   = require('./scrape-json');

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
    this.lastRequestTimestamp;
    //
    // Intercept 'shift'
    // If last item in array call getJobs()
    // Calls function only after interval has elapsed
    //
    this.handler = {
      get: function (obj, prop) {
        if (prop === 'shift' && obj.length === 0) {
          const interval = +new Date() - (obj.startTimestamp || 0);
          const timeLeft = obj.interval - interval;
          const reset = () => {
            obj.getJobs(obj);
            obj.timeout = void 0;
            obj.startTimestamp = +new Date();
          };
          if (timeLeft > 0) {
            logger.debug(`Class ScrapeQueue: waiting ${timeLeft}ms before getting more ${obj.name} jobs`);
            if (!obj.timeout) {
              obj.save();
              obj.timeout = setTimeout(reset, timeLeft);
            }
          }
          else {
            logger.debug(`Class ScrapeQueue: getting ${obj.name} jobs`);
            obj.save();
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
    logger.debug(`Class ScrapeQueue: Adding new ScrapeQueue (${name})`);
    this.queues[name] = [];
    this.queues[name].name = name;
    this.queues[name].interval = config.interval;
    this.queues[name].getJobs = config.getJobs;
    this.queues[name].save = config.save;
    this.proxies[name] = new Proxy(this.queues[name], this.handler);
  }

  async run() {

    // bootstrap
    if (this.options.bootstrap && !this.bootstraped) {
      this[this.options.bootstrap.name] = await this.options.bootstrap.func();
      this.bootstraped = true;
    }

    //
    // For each queue take one item and parse it
    //
    for (let [name, queue] of Object.entries(this.proxies)) {
      const item = queue.shift();
      if (item) {
        const { uri, key, cacheForDays, groupKey, last } = item;

        // Wait before next request if required
        const timeLapsedSinceLastRequest = +new Date() - this.lastRequestTimestamp;
        const timeToWaitMs = this.rateLimit - timeLapsedSinceLastRequest;
        console.group('time');
        console.log('timeLapsedSinceLastRequest', timeLapsedSinceLastRequest);
        console.log('timeToWaitMs', timeToWaitMs);
        if (timeToWaitMs) await commonDelay(timeToWaitMs);

        var t = +new Date();
        const promise = scrapeJSON(uri, key, cacheForDays);
        console.log('promise took', +new Date() - t);
        console.log('making request now');
        console.groupEnd('time');
        this.lastRequestTimestamp = +new Date();

        //
        // Deal with paginated requests
        // Collect groups of files in an Array then save a master file
        //
        if (groupKey) {
          if (last) {
            if (this.groups[name]) {
              this.groups[name].push(promise);
              Promise.all(this.groups[name]).then(values => {
                global.cache.set(groupKey, JSON.stringify(values));
              });
              this.groups[name] = [];
            }
          }
          else {
            if (!this.groups[name]) {
              this.groups[name] = [];
            }
            this.groups[name].push(promise);
          }
        }
      }
    }

    this.run();
    return true;
  }

}
