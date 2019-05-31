'use strict'

// Binary Overdose Projects
import { objectSetNestedProperty }              from '../libs/bo-utils-client';
import { objectIsEmptyObject as isEmptyObject } from '../libs/bo-utils-client';


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
    const state = !!urlConfig ? urlConfig : this.defaultConfig;

    return await this.setUrl(state);

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
   * TODO: get this from the URL. The URL should be the only state
   *
   */
  async get() {

    // let field;
    // const output = {};
    // for (field of this.whitelist) {
    //   output[field] = this[field];
    // }

    // return output;
    const url = new URL(window.location);
    const fragmentId = url.hash.substr(1);
    if (fragmentId) {
      return await State.urlDecode(fragmentId);
    }
    else {
      return void 0;
    }

  }

  /**
   *
   * Set
   *
   */
  async set(target, data) {
    //
    // might as well get the url, then set it
    // bypassing the local state
    //
    const state = await this.get();
    switch (target) {
      case 'columns':
        objectSetNestedProperty(state, target, data);
        break;
      case 'sort':
        objectSetNestedProperty(state, target, data);
        break;
      case 'filter':
        const filters = Object.keys(data);
        const columns = state.columns;
        for (const column of columns) {
          if (filters.includes(column.id)) {
            column.filter = data[column.id];
          }
        }
        objectSetNestedProperty(state, 'columns', columns);
        break;
      default:
        break;
    }
    await this.setUrl(state);
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
    const fragmentId = url.hash.substr(1);
    if (fragmentId) {
      return await State.urlDecode(fragmentId);
    }
    else {
      return void 0;
    }

  }

  async setUrl(state) {

    // const state = this.get();
    // const query = await State.urlEncode(state);
    // window.location.hash = query;

    const currentState = await this.getUrl();
    if (!state) {
      state = currentState;
    }

    const sanitizedState = {};
    for (const field of this.whitelist) {
      sanitizedState[field] = state[field];
    }

    const query = await State.urlEncode(sanitizedState);
    //
    // TODO: check changes before pushing, sometimes we get a change when we didnt
    // actually changes something. Try inputing into a field and deleting without blur
    //
    if (JSON.stringify(sanitizedState) !== JSON.stringify(currentState)) {
      history.pushState(sanitizedState, '/// Binary Overdose', `#${query}`);
      console.log('pushState');
    }

    return sanitizedState;

  }

  /**
   *
   * Get Filter Model
   *
   */
  async getFilterModel() {
    const state = await this.getUrl();
    let model = state.columns
      .reduce((a, v) => {
        if (v.filter) a[v.id] = v.filter;
        return a;
      }, {});
    model = isEmptyObject(model) ? null : model;
    return model;
  }

  /**
   *
   * Get Sort Model
   *
   */
  getSortModel() {}

  setProperty() {}

  getProperty() {}

}
