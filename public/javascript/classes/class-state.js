'use strict'

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
    const state = await this.set(!!urlConfig ? urlConfig : this.defaultConfig);
    const filterModel = await this.getFilterModel();
    return {state, filterModel};

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

    state.window[0] = {
      id: state.window[0].id,
      type: state.window[0].type,
      sort: state.window[0].sort,
      columns: state.window[0].columns
    }

    return state;

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
  async set(target, data, action) {

    let state;
    if (arguments.length === 1) {
      state = target;
      target = null;
    }
    else {
      state = await this.get();
    }

    switch (true) {
      case target === 'layout':
        state.layout = data;
        break;
      case target === 'columns':
        objectSetNestedProperty(state.window[0], target, data);
        break;
      case target === 'sort':
        objectSetNestedProperty(state.window[0], target, data);
        break;
      case target === 'filter':
        const filters = Object.keys(data);
        const columns = state.window[0].columns;
        for (const column of columns) {
          if (filters.includes(column.id)) {
            column.filter = data[column.id];
          }
          else {
            delete column.filter;
          }
        }
        objectSetNestedProperty(state.window[0], 'columns', columns);
        break;
      case /^stack/.test(target):
        const sid = +target.split('.')[1];
        let stack;
        for (const {ref, type} of bo.clas.Layout.iterateStacks(state.layout)) {
          if (type === 'stack' && ref.sid === sid) {
            stack = ref;
          }
        }
        if (action === 'push') {
          stack.content.push(data);
        }
        else if (sid > -1) {
          debugger
          // state.window[sid] = data;
        }
        break;
      case target === null:
        // do nothing
      default:
        break;
    }

    const newState = State.sanitize(state);
    const oldState = await this.get();

    if (!oldState || !objectsAreEqual(newState, oldState, true)) {
      const obj = newState;
      const query = await State.urlEncode(obj);
      window.location.hash = query;
      if (bo.inst.gadgets && bo.inst.gadgets.manager) bo.inst.gadgets.manager.load();
      // history.pushState(obj, '/// Binary Overdose', `#${query}`);
      // gtag('config', 'UA-640029-16', {
      //   'page_path': location.pathname + location.search  + location.hash
      // });
      // await this.update(newState);
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

    let model = state.window[0].columns
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

    // Generate columnDefs
    const columns = newState.window[0].columns;
    const columnDefs = generateColumnDefs(newState.window[0]);

    // Set sort order on columnDefs
    let sortUpdated = false;
    {
      const sort = newState.window[0].sort;
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
    const columnsUpdated = !objectsAreEqual(agState.columns, newState.window[0].columns, true);

    // Update AG Grid columnDefs
    if (columnsUpdated) {
      bo.agOptions.api.columnController.setColumnDefs(columnDefs);
    }
    else if (sortUpdated) {
      bo.agOptions.api.setSortModel([{colId: newState.window[0].sort.column, sort: newState.window[0].sort.direction}]);
    }

    // Update AG Grid filters
    const filterModel = await bo.inst.state.getFilterModel();
    bo.agOptions.api.setFilterModel(filterModel);

    // If columns have changed emit a socket event with the new column state
    if (columnsUpdated && bo.inst.socket) {
      const oldCols = gnp(agState, 'columns') || [];
      const sort = newState.window[0].sort;
      const newColFields = State.columnsChanged(oldCols, newState.window[0].columns);
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
        // const calcIds = newState.window[0].columns.filter(v => v.calc).map(v => v.id);
        // const params = {
        //   force: true,
        //   columns: calcIds
        // };
        // bo.agOptions.api.refreshCells(params);
      }
    }

    //
    // Load / update other panels
    //
    bo.inst.gadgets.manager.load();

  }

}
