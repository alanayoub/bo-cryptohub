// Node
const fs = require('fs');
const EventEmitter = require('events');

// Libs
const { to } = require('await-to-js');

// CryptoHub
const logger      = require.main.require('./logger');
const settings    = require.main.require('./settings');
const commonDelay = require.main.require('./utils/common-delay');

/**
 *
 * Watch a folder for files
 * Parse and save file data via handlers
 * Delete files
 *
 */
module.exports = class Watcher extends EventEmitter {

  constructor(options) {
    super();
    this.options = options;
    this.queue = new Set([]);
    this.delay = options.delay || 1000;
    this.deleteFiles = options.deleteFiles === false ? false : true; // For debugging purposes
    this.symbolIdMap = options.symbolIdMap;
    this.run();
  }

  addToQueue(files) {
    const len = Object.keys(files).length;
    if (len) {
      for (const [fileName, currentFile] of Object.entries(files)) {
        const fingerprint = JSON.stringify({[fileName]: currentFile});
        if (!this.queue.has(fingerprint)) {
          logger.info(`Adding to queue: ${fileName}`);
          this.queue.add(fingerprint);
        }
      }
    }
  }

  async parseQueueItems() {
    const handler = this.options.handler;
    for (let itemStr of this.queue) {
      const itemObj = JSON.parse(itemStr);
      const fileName = Object.keys(itemObj)[0];
      const dataStr = itemObj[fileName];
      const dataObj = JSON.parse(dataStr);
      const timestamp = fileName.replace(/^cache.*<([0-9TZ:.-]*)>$/, '$1');
      const [error, data] = await to(handler(dataObj, timestamp));
      if (error) throw new Error(`Class Watcher: ${error}`);
      this.emit('data', data);
      if (data) {
        logger.info(`Deleting file and removing from queue: ${fileName}`);
        this.queue.delete(itemStr);
        if (this.deleteFiles) {
          fs.unlink(fileName, async error => {
            if (error) {
              logger.error(`Unable to delete ${fileName}: ${error}`);
              debugger;
              throw error;
            }
          });
        }
      }
      else {
        logger.error(`Error saving ${fileName}: ${error}`);
      }
    }
  }

  async run() {

    logger.info('WatchFolder(): START ------------------------------------------- /');
    const files = settings.cache.get(...this.options.cacheArgs);

    if (files[0] !== false) {
      this.addToQueue(files);
      await this.parseQueueItems();
    }

    await commonDelay(this.options.delay);
    logger.info('WatchFolder(): END --------------------------------------------- /\n\n');
    this.run();

  }

}
