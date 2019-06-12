'use strict'

// Binary Overdose Projects
import { objectSetNestedProperty }              from '../libs/bo-utils-client';
import { objectGetNestedProperty as gnp }       from '../libs/bo-utils-client';
import { objectIsEmptyObject as isEmptyObject } from '../libs/bo-utils-client';

// ag-grid config
import generateColumnDefs                       from '../ag-grid-column-defs-generate.js';
import columnLibrary                            from '../column-library.js';

import jsonUrl                                  from '../libs/json-url-single.js';

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
      const obj = await State.urlDecode(fragmentId);
      return obj.window[0];
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
      state = target.window ? target.window[0] : target;
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

    const newState = State.sanitize(state);
    const oldState = await this.get();

    if (JSON.stringify(newState) !== JSON.stringify(oldState)) {
      const obj = {window: {0: newState}};
      const query = await State.urlEncode(obj);
      await this.update(newState);
      history.pushState(obj, '/// Binary Overdose', `#${query}`);
    }

    return newState;

  }

  /**
   *
   *
   */
  emit(oldState, newState) {
    if (bo.inst.socket) {
      const oldCols = gnp(oldState, 'columns') || [];
      const newColFields = State.columnsChanged(oldCols, newState.columns)
      if (newColFields) {
        const cols = newColFields.join();
        bo.inst.socket.emit('cols', cols);
        console.log('emit for new cols', cols);
      }
    }
  }

  /**
   *
   * If cols changed return new cols
   *
   */
  static columnsChanged(oldCols, newCols) {
    const oldFields = oldCols.map(x => x.id).sort((a, b) => a.length - b.length);
    const newFields = newCols.map(x => x.id).sort((a, b) => a.length - b.length);
    return JSON.stringify(oldFields) !== JSON.stringify(newFields) ? newFields : false;
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
   * Get URL Filter State
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
   * Get Active AG Grid State Representation
   *
   */
   getAgState() {
     const columns = [];
     const api = bo.agOptions.api;
     const filters = api.getFilterModel();
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

  /**
   *
   * Copy state from url to ag-grid state
   *
   * TODO: make sure only stuff that needs updating gets updated
   *
   */
  async update(newState) {

    if (!bo.agOptions) return;

    if (!newState) {
      debugger;
      // state = await this.get();
    }
    if (newState.window) {
      newState = newState.window[0];
    }

    // Generate columnDefs
    const columns = newState.columns;
    const columnDefs = generateColumnDefs(newState);

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
    const sortUpdated = updateSort(newState.sort);

    const agState = this.getAgState();
    const [ filterModel ] = await Promise.all([
      bo.inst.state.getFilterModel()
    ]);

    const columnsUpdated = JSON.stringify(agState.columns) !== JSON.stringify(newState.columns);

    if (columnsUpdated || sortUpdated) {
      bo.agOptions.api.columnController.setColumnDefs(columnDefs);
    }
    if (columnsUpdated) {
      this.emit(agState, newState);
    }

    bo.agOptions.api.setFilterModel(filterModel);

  }

}
