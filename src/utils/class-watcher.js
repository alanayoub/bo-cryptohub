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
    this.symbolIdMap = options.symbolIdMap;
    this.lastFileHash = null;
    this.run();
  }

  addToQueue(fileList) {
    if (!fileList.length) return;
    let fileName;
    for (fileName of fileList) {
      if (!this.queue.has(fileName)) {
        if (fileName.length > 400) debugger;
        logger.debug(`Class Watcher: Adding to queue: ${fileName}`);
        this.queue.add(fileName);
      }
    }
  }

  //
  // Parse data
  // Emit data
  // Delete from queue
  // Delete file
  //
  async parseQueueItems() {
    const handler = this.options.handler;
    let fileName;
    for (fileName of this.queue) {
      let fileDataStr;
      if (!fs.existsSync(fileName)) {
        this.queue.delete(fileName);
        logger.debug(`Class Watcher: File no longer exists, deleting from queue: ${fileName}`);
        return;
      }
      fileDataStr = fs.readFileSync(fileName).toString();
      const fileDataObj = JSON.parse(fileDataStr);
      const timestamp = fileName.replace(/^cache.*<([0-9TZ:.-]*)>$/, '$1');
      let data;
      try {
        data = handler(fileDataObj, timestamp);
      }
      catch(error) {
        logger.error(`Class Watcher: ${error}`);
      }
      this.emit('data', data);
      if (data) {
        logger.debug(`Class Watcher: Removing from queue: ${fileName}`);
        this.queue.delete(fileName);
        logger.debug(`Class Watcher: Deleting file ${fileName}`);
        fs.unlink(fileName, async error => {
          if (error) {
            logger.notice(`Class Watcher: Unable to delete ${fileName}. NOTE: This is probably because it has been renamed due to it having the same hash as a new file. Safe to ignore`);
          }
        });
      }
      else {
        logger.error(`Class Watcher: Error saving ${fileName}: ${error}`);
      }
    }
  }

  async run() {

    const files = settings.cache.get(...this.options.cacheArgs);

    if (files[0] !== false) {
      this.addToQueue(files);
      await this.parseQueueItems();
    }

    await commonDelay(this.options.delay);
    this.run();

  }

}