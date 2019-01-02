// Node
const cookieParser = require('cookie-parser');
const { join }     = require('path');
const fs           = require('fs-extra');

// Libs
const express      = require('express');
const app          = express();
const server       = require('http').Server(app);
const io           = require('socket.io')(server);

// CryptoHub
const Cache        = require('./class-cache');
const Watcher      = require('./class-watcher');
const DataStore    = require('./class-data-store');
const ScrapeQueue  = require('./class-scrape-queue');
const logger       = require.main.require('./logger');

/**
 *
 * Binary Overdose Data Table
 *
 */
module.exports = class BinaryOverdoseDataTable {

  constructor(config = {}) {
    //
    // TODO: validate config
    //
    this.dataStore = new DataStore(config.mergeHandler);
    this.dataStore.on('data', config.dataHandler);
    this.cache = new Cache(config.cacheDir, false);
    this.startServer(config);
    this.startScrape(config);
  }

  async startServer(config) {

    const port = config.server && config.server.port || 3000;

    app.use(cookieParser());
    app.use(express.static(join(__dirname, '/../public')));

    try {

      logger.info('index.js: Starting server');

      server.listen(port, () => {
        logger.info(`index.js: listening on *: ${port}`);
      });

      const fileWatcher = new Watcher({
        delay: 100,
        deleteFiles: false,
        cacheArgs: [config.tmpDir, 'newest'],
        handler: async (data, timestamp) => {
          this.cache.set(config.outDir, JSON.stringify(data));
          return {data, timestamp};
        }
      });

      fileWatcher.on('data', ({data, timestamp}) => {
        if (!socket || !data) return;
        socket.emit('data', data);
        fs.writeFileSync(`${__dirname}/../public/javascript/init-data.generated.js`, `const initData = ${JSON.stringify(data)}`);
        logger.info('app-stream.js: emiting data');
      });

      let socket;
      io.on('connection', sock => {
        socket = sock;
      });

      app.get('/', (req, res) => {
        res.sendFile(join(`${__dirname}/../apps/stream/index.html`));
      });

    }

    catch(error) {
      logger.error(`app-stream.js: Um some error happened yo: ${error}`);
      debugger
      process.exit(1);
    }

  }

  async startScrape(config) {

    for (let [siteName, siteConfig] of Object.entries(config.scrapeSites)) {

      const bootstrappedData = await siteConfig.bootstrap();

      const scrapeQueue = new ScrapeQueue({
        rateLimit: siteConfig.rateLimitDelayMs,
        // bootstrap: siteConfig.bootstrap
      });

      const siteDataStore = new DataStore();

      for (let sectionConfig of Object.values(siteConfig.sections)) {

        scrapeQueue.addToQueue(sectionConfig);

        const { name, cacheArgs, formatter:handler } = sectionConfig;
        const watcher = new Watcher({
          delay: 1000,
          cacheArgs,
          handler(data, timestamp) {
            return handler(data, timestamp, bootstrappedData);
          },
        });

        siteDataStore.data = {name, data: {}};

        watcher.on('data', ({data, timestamp}) => {
          siteDataStore.data = {name, data};
          logger.debug(`index.js: emitting ${name} data`);
        });

      }

    }

  }

}
