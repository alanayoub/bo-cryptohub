// Node
const EventEmitter = require('events');

// CryptoHub
const logger = require.main.require('./logger');
const analyticsMergeDataByKey = require.main.require('./utils/analytics-merge-data-by-key');

// TODO: put in utils
function isObject(object) {
  return Object.prototype.toString.call(object) === '[object Object]';
}

/**
 *
 * Store, Merge and Emit Data
 *
 */
module.exports = class DataStore extends EventEmitter {

  constructor() {
    super();
    this.cc;
    this.db = {};
  }

  mergeData() {
    const dataArray = Object.values(this.db);
    this.cc = analyticsMergeDataByKey(dataArray);
    this.emit('data', this.cc);
  }

  set data({name, data}) {
    if (!isObject(data)) {
      const msg = 'DataStore: Trying to set non Object data';
      logger.error(msg);
      throw new Error(msg);
    }
    this.db[name] = data;
    this.mergeData();
  }

  get data() {
    return this.cc;
  }

}
