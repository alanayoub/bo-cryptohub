import { bulkUpdatePerDay } from './save';
import logger from '../logger';

export default class DbQueue {

  constructor(interval = 50) {
    this.queue = [];
    this.interval = interval;
    this.init();
    return this;
  }

  async init() {

    setInterval(async () => {

      if (!this.queue.length) return;

      const time = +new Date();
      const dataItem = this.queue.shift();
      const updated = await bulkUpdatePerDay(dataItem, time);

      // logger.info(`dbQueue: item removed from queue & added to database. Queue length now: ${this.queue.length}`);
      logger.info(`dbQueue save-perDay update time: ${+new Date() - time}`);

    }, this.interval);

  }

  push(items) {
    this.queue.push(...items);
    // logger.info(`dbQueue: adding ${items.length} items. Queue length now: ${this.queue.length}`);
  }

}
