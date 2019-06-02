'use strict'

// Binary Overdose Projects
import { objectSetNestedProperty }              from '../libs/bo-utils-client';
import { objectIsEmptyObject as isEmptyObject } from '../libs/bo-utils-client';

// ag-grid config
import generateColumnDefs                       from '../ag-grid-column-defs-generate.js';

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
      await this.update();
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
   * Copy state from url to ag-grid state
   *
   * TODO: make sure only stuff that needs updating gets updated
   *
   */
  async update(state) {

    if (!state) {
      state = await this.get();
    }

    // Generate columnDefs
    const columns = state.columns;
    const columnDefs = generateColumnDefs(state);

    /**
     *
     * Update sort
     *
     */
    function updateSort(sort) {

      const sortModel = bo.agOptions.api.getSortModel()[0];
      const changed = JSON.stringify(sortModel) !== JSON.stringify(sort);

      if (!changed) {
        return false
      }
      else {

        // Delete old
        for (const def of columnDefs) {
          delete def.sort;
        }

        // Add new
        const sortCol = sort.column;
        const sortDir = sort.direction;
        const col = columnDefs.filter(v => v.colId === sortCol)[0];
        if (col) {
          col.sort = sortDir;
        }

        return true;

      }

    }

    // Set sort order
    const sortUpdated = updateSort(state.sort);

    const Pstate = bo.inst.state.get();
    const Pfilters = bo.inst.state.getFilterModel();
    Promise.all([Pstate, Pfilters]).then(values => {

      const [lastState, filterModel] = values;

      const columnsUpdated = JSON.stringify(lastState.columns) !== JSON.stringify(state.columns);

      if (columnsUpdated || sortUpdated) {
        bo.agOptions.api.columnController.setColumnDefs(columnDefs);
      }

      bo.agOptions.api.setFilterModel(filterModel);

    });

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
