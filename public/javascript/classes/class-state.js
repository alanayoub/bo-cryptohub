'use strict'

import { diff } from 'deep-object-diff';

// Binary Overdose Projects
import { objectsAreEqual }                      from '../libs/bo-utils-client';
import { objectSetNestedProperty }              from '../libs/bo-utils-client';
import { objectGetNestedProperty as gnp }       from '../libs/bo-utils-client';
import { objectIsEmptyObject as isEmptyObject } from '../libs/bo-utils-client';

// ag-grid config
import generateColumnDefs                       from '../ag-grid-column-defs-generate.js';

export default class State {

  /**
   *
   * TODO: Sanitise
   *
   */
  constructor(defaultConfig) {

    this.defaultConfig = defaultConfig;
    this.baseUrl = `${window.location.protocol}//${window.location.host}/`;

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

    const urlConfig = await this.get();
    const state = await this.set({newState: !!urlConfig ? urlConfig : this.defaultConfig});
    return {state};

  }

  /**
   *
   * URL Encode
   *
   */
  static async urlEncode(obj, algo = 'lzma') {

	const codec = JsonUrl(algo);
	const output = await codec.compress(obj);

    return output;

  }

  /**
   *
   * URL Decode
   *
   */
  static async urlDecode(str, algo = 'lzma') {

	const codec = JsonUrl(algo);
    const output = await codec.decompress(str);

    return output;

  }

  /**
   *
   * If cols changed return new cols
   * else if calc exists return cols
   *
   */
  static columnsChanged(oldCols, newCols) {

    let output = false;

    const oldFields = oldCols.map(x => x.id).sort((a, b) => a.length - b.length);
    const newFields = newCols.map(x => x.id).sort((a, b) => a.length - b.length);
    const calcIds = newCols.filter(v => v.calc).map(v => v.id);
    const changed = !objectsAreEqual(oldFields, newFields, true);

    if (changed || calcIds.length) {
      output = newFields;
    }

    return output;

  }

  /**
   *
   * Sanitize
   *
   * TODO: sanitize propertly, check for code insertion etc
   *
   */
  static sanitize(state) {

    return state;
    if (!state) return;

    state.window[0] = {
      id: state.window[0].id,
      type: state.window[0].type,
      sort: state.window[0].sort,
      columns: state.window[0].columns
    }

    return state;

  }

  static async getGadgetState(gadgetId) {
    const state = await bo.inst.state.get();
    for (const val of bo.clas.Layout.iterateStacks(state.layout)) {
      if (val.type === 'stack') {
        for (const [key, value] of Object.entries(val.ref.content)) {
          if (value.id === gadgetId) {
            return value;
          }
        }
      }
    }
  }

  static async setGadgetState(gadgetId, newGadgetState) {
    const state = await bo.inst.state.get();
    for (const val of bo.clas.Layout.iterateStacks(state.layout)) {
      if (val.type === 'stack') {
        for (const [key, value] of Object.entries(val.ref.content)) {
          if (value.id === gadgetId) {
            for (const key of Object.keys(newGadgetState)) {
              value[key] = newGadgetState[key];
            }
            return state;
          }
        }
      }
    }
  }

  static async getStackState(stackId) {
    const state = await bo.inst.state.get();
    for (const val of bo.clas.Layout.iterateStacks(state.layout)) {
      if (val.type === 'stack') {
        if (Number(val.ref.sid) === Number(stackId)) {
          return val.ref;
        }
      }
    }
  }

  static async setStackState(stackId, newStackState) {
    const state = await bo.inst.state.get();
    for (const val of bo.clas.Layout.iterateStacks(state.layout)) {
      if (val.type === 'stack') {
        if (Number(val.ref.sid) === Number(stackId)) {
          for (const key of Object.keys(newStackState)) {
            val.ref[key] = newStackState[key];
          }
          return state;
        }
      }
    }
  }

  /**
   *
   * TODO: Sanitise
   * TODO: get this from the URL. The URL should be the only state
   *
   */
  async get() {

    const url = new URL(window.location);
    const fragmentId = url.hash.substr(1);
    if (fragmentId.length) {
      const obj = await State.urlDecode(fragmentId);
      return obj;
    }
    else {
      return void 0;
    }

  }

  /**
   *
   * Set
   *
   * NOTE: Overloaded
   * @param {String|Object} target - target property to update or a state object
   * @param {String|Object} data - data to set on target property. Could be any value
   *
   */
  async set({gadgetId, stackId, handler, newState, suppressUpdate}) {

    const oldState = await this.get();
    if (gadgetId && handler) {
      const oldGadgetState = await State.getGadgetState(gadgetId);
      const newGadgetState = handler(oldGadgetState);
      newState = await State.setGadgetState(gadgetId, newGadgetState);
    }
    else if (stackId && handler) {
      const oldStackState = await State.getStackState(stackId);
      const newStackState = handler(oldStackState);
      newState = await State.setStackState(stackId, newStackState);
    }
    else if (handler) {
      newState = handler(JSON.parse(JSON.stringify(oldState)));
    }
    const query = await State.urlEncode(newState);
    const changes = diff(oldState, newState);
    if (Object.keys(changes).length) {
      const hash = `#${query}`;
      const oldURL = window.location.href;
      const newURL = `${window.origin}/${hash}`;
      if (!suppressUpdate && !bo.flag.popstate) {
        if (oldURL !== newURL) {
          history.pushState({oldURL, newURL}, 'BinaryOverdose', newURL);
          if (bo.inst.gadgets && bo.inst.gadgets.manager) {
            bo.inst.events.handleChange(oldURL, newURL);
          }
        }
      }
      if (bo.flag.popstate) {
        bo.flag.popstate = false;
      }
    }

    return newState;

  }

  /**
   *
   * Get Active AG Grid State Representation
   *
   */
   getAgState() {

     const columns = [];
     const api = bo.agOptions.api;
     const filters = api.getFilterModel() || {};
     const sort = api.getSortModel()[0];
     const cols = api.columnController.getColumnState();
     cols.forEach(c => {
       columns.push({
         ...(filters[c.colId] !== void 0 && {filter: filters[c.colId]}),
         id: c.colId,
         width: c.width
       })
     });

     return {columns, sort};

   }

}
