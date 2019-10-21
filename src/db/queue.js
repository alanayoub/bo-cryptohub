import { bulkUpdatePerDay } from './save';
import logger from '../logger';

export default class DbQueue {

  constructor(interval = 50) {
    this.queue = [];
    this.interval = interval;
    this.init();
    return this;
  }

  init() {

    const context = this;

    if (!this.queue.length) {
      const that = this;
      setTimeout(function() {
        context.init();
      }, this.interval);
    }
    else {
      const time = +new Date();
      const dataItem = this.queue.shift();
      bulkUpdatePerDay(dataItem, time).then(updated => {
        // logger.info(`dbQueue: item removed from queue & added to database. Queue length now: ${this.queue.length}`);
        logger.info(`dbQueue save-perDay update time: ${+new Date() - time}`);
        setTimeout(function () {
          context.init()
        }, this.interval);
      });
    }

  }

  push(items) {
    this.queue.push(...items);
    // logger.info(`dbQueue: adding ${items.length} items. Queue length now: ${this.queue.length}`);
  }

}
