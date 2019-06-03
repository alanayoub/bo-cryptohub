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
    const state = !!urlConfig ? urlConfig : this.defaultConfig;

    return await this.set(state);

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

    const url = new URL(window.location);
    const fragmentId = url.hash.substr(1);
    if (fragmentId.length) {
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
   * NOTE: Overloaded
   * @param {String|Object} target - target property to update or a state object
   * @param {String|Object} data - data to set on target property. Could be any value
   *
   */
  async set(target, data) {

    let state;
    if (arguments.length === 1) {
      state = target;
      target = null;
    }
    else {
      state = await this.get();
    }

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
      case null:
        // do nothing
      default:
        break;
    }

    const sanitizedState = State.sanitize(state);
    const currentState = await this.get();

    if (JSON.stringify(sanitizedState) !== JSON.stringify(currentState)) {
      const query = await State.urlEncode(sanitizedState);
      history.pushState(sanitizedState, '/// Binary Overdose', `#${query}`);
      await this.update();
    }

    return sanitizedState;

  }

  /**
   *
   * Sanitize
   *
   * TODO: sanitize propertly, check for code insertion etc
   *
   */
  static sanitize(state) {

    if (!state) return;

    const whitelist = ['sort', 'columns', 'portfolio', 'favourites'];
    const sanitizedState = {};

    for (const field of whitelist) {
      sanitizedState[field] = state[field];
    }

    return sanitizedState;

  }

  /**
   *
   * Get Filter Model
   *
   */
  async getFilterModel() {
    const state = await this.get();
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

    if (!bo.agOptions) return;

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

}
