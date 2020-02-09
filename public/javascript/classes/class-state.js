'use strict'

import JsonUrl from '../libs/json-url-single';

// Binary Overdose Projects
import { objectSetNestedProperty }              from '../libs/bo-utils-client';
import { objectGetNestedProperty as gnp }       from '../libs/bo-utils-client';
import { objectIsEmptyObject as isEmptyObject } from '../libs/bo-utils-client';

// ag-grid config
import generateColumnDefs                       from '../ag-grid-column-defs-generate.js';

function JSONstringifyOrder(obj, space) {
  const allKeys = [];
  JSON.stringify(obj, (key, value) => {
    allKeys.push(key); {
      return value;
    }
  });
  allKeys.sort();
  return JSON.stringify(obj, allKeys, space);
}

function objectsAreEqual(obj1, obj2, order) {
  const stringify = order ? JSONstringifyOrder : JSON.stringify;
  const str1 = stringify(obj1);
  const str2 = stringify(obj2);
  return str1 === str2;
}

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
          else {
            delete column.filter;
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

    if (!oldState || !objectsAreEqual(newState, oldState, true)) {
      const obj = {window: {0: newState}};
      const query = await State.urlEncode(obj);
      history.pushState(obj, '/// Binary Overdose', `#${query}`);
      // gtag('config', 'UA-640029-16', {
      //   'page_path': location.pathname + location.search  + location.hash
      // });
      await this.update(newState);
    }

    return newState;

  }

  /**
   *
   * Get URL Filter State
   *
   */
  async getFilterModel() {

    const state = await this.get();

    if (!state) {
      return null;
    }

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
      newState = await this.get();
    }

    // Stub while we only have one "window"
    if (newState.window) {
      newState = newState.window[0];
    }

    // Generate columnDefs
    const columns = newState.columns;
    const columnDefs = generateColumnDefs(newState);

    // Set sort order on columnDefs
    let sortUpdated = false;
    {
      const sort = newState.sort;
      const sortModel = bo.agOptions.api.getSortModel()[0];

      const changed = !!sortModel && ((sortModel.colId !== sort.column) || (sortModel.sort !== sort.direction));

      if (changed) {

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

        sortUpdated = true;

      }
    }

    const agState = this.getAgState();
    const columnsUpdated = !objectsAreEqual(agState.columns, newState.columns, true);

    // Update AG Grid columnDefs
    if (columnsUpdated) {
      bo.agOptions.api.columnController.setColumnDefs(columnDefs);
    }
    else if (sortUpdated) {
      bo.agOptions.api.setSortModel([{colId: newState.sort.column, sort: newState.sort.direction}]);
    }

    // Update AG Grid filters
    const filterModel = await bo.inst.state.getFilterModel();
    bo.agOptions.api.setFilterModel(filterModel);

    // If columns have changed emit a socket event with the new column state
    if (columnsUpdated && bo.inst.socket) {
      const oldCols = gnp(agState, 'columns') || [];
      const sort = newState.sort;
      const newColFields = State.columnsChanged(oldCols, newState.columns);
      if (newColFields) {
        const columns = newColFields
          .filter(v => !/^c-\d{1,4}$/.test(v)) // filter out custom columns
          .join();
        const emitData = JSON.stringify({columns, sort});
        bo.inst.socket.emit('cols', emitData);
      }
      else {
        //
        // Update custom calculations
        // We currently dont know if they have changed because we cant store
        // custom properties on the column definitions
        //
        // const calcIds = newState.columns.filter(v => v.calc).map(v => v.id);
        // const params = {
        //   force: true,
        //   columns: calcIds
        // };
        // bo.agOptions.api.refreshCells(params);
      }
    }

  }

}
