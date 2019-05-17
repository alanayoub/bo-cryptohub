'use strict'

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
    this.queryProp = 'q';
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
   * Get Url
   *
   * Get the compressed url data, parse and return the object data
   *
   */
  async getUrl() {

    const url = new URL(window.location);
    const params = new URLSearchParams(url.search.slice(1));
    const queryValue = params.get(this.queryProp);

    if (queryValue) {
      return await State.urlDecode(queryValue);
    }
    else {
      return void 0;
    }

  }

  async setUrl() {

    const url = new URL(this.baseUrl);
    const state = this.get();
    const params = new URLSearchParams();
    const query = await State.urlEncode(state);
    params.set(this.queryProp, query);
    const queryString = params.toString();

    history.pushState(state, '/// Binary Overdose', `?${queryString}`);

  }

  setProperty() {}

  getProperty() {}

}
