'use strict'

// Binary Overdose Projects
import { objectSetNestedProperty } from '../libs/bo-utils-client';

import jsonUrl from '../libs/json-url-single.js';

export default class State {

  /**
   *
   * TODO: Sanitise
   *
   */
  constructor(defaultConfig) {

    this.defaultConfig = defaultConfig;
    this.baseUrl = `${window.location.protocol}//${window.location.host}/`;
    this.whitelist = ['sort', 'columns', 'portfolio', 'favourites'];

  }

  /**
   *
   * Init
   *
   * - Get the url config
   * - If no config use the default config
   * - Set the initial state
   * - Set the url state
   *
   */
  async init() {

    const urlConfig = await this.getUrl();
    const config = !!urlConfig ? urlConfig : this.defaultConfig;

    for (const field of this.whitelist) {
      this[field] = config[field];
    }

    await this.setUrl();

  }

  static async urlEncode(obj, algo = 'lzma') {
	const codec = jsonUrl(algo);
	const output = await codec.compress(obj);
    return output;
  }

  static async urlDecode(str, algo = 'lzma') {
	const codec = jsonUrl(algo);
    const output = await codec.decompress(str);
    return output;
  }

  /**
   *
   * TODO: Sanitise
   *
   */
  get() {

    let field;
    const output = {};
    for (field of this.whitelist) {
      output[field] = this[field];
    }

    return output;

  }

  /**
   *
   * Set
   *
   */
  async set(path, data) {
    objectSetNestedProperty(this, path, data);
    await this.setUrl();
  }

  /**
   *
   * Get Url
   *
   * Get the compressed url data, parse and return the object data
   *
   */
  async getUrl() {

    const fragmentId = window.location.hash.substr(1);

    if (fragmentId) {
      return await State.urlDecode(fragmentId);
    }
    else {
      return void 0;
    }

  }

  async setUrl() {

    const state = this.get();
    const query = await State.urlEncode(state);
    window.location.hash = query;

  }

  setProperty() {}

  getProperty() {}

}
