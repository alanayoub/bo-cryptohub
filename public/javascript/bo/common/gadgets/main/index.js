'use strict';

import Gadget from '../gadget';
import initPug from '../../../../generated/init-pug.generated.js';

import Grid                                     from '../../libs/grid/';
import columnLibrary                            from '../../../../columns/';
import { getRandomInt }                         from '../../../../libs/bo-utils-client';
import { objectsAreEqual }                      from '../../../../libs/bo-utils-client';
import { objectIsEmptyObject as isEmptyObject } from '../../../../libs/bo-utils-client';

import style from './index.scss';

export default class Main extends Gadget {

  constructor({componentState}) {
    super({componentState})

    const containerId = this.containerId = `ch-gadget-${getRandomInt(100000, 999999)}`;
    const content = initPug['common-gadget-main']({containerId});
    this.selector = `#gadget-container-${this.id}`;
    this.id = componentState.id;
    document.querySelector(this.selector).innerHTML = content;

    // Initial data
    this.data = bo.inst.data.last.main || null;

    // Data updated
    bo.inst.data.on('main', data => {
      this.data = data.data;
      this.updateData();
    });

    bo.inst.events.on('GADGET_STATE_CHANGED', ({gadgetId, oldState, newState}) => {
      if (gadgetId === componentState.id) {
        const oldCols = oldState.columns;
        const newCols = newState.columns;
        const sort = newState.sort;
        const newColFields = Main.columnsChanged(oldCols, newCols);
        if (newColFields) {
          const columns = newColFields
            .filter(v => !/^c-\d{1,4}$/.test(v)) // filter out custom columns
            .join();
          const emitData = JSON.stringify({columns, sort});
          bo.inst.socket.emit('cols', emitData);
        }
        this.grid.setColumnDefs(newState.columns, newState.sort);
      }
    });

    this.render();
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
    const changed = !objectsAreEqual(oldFields, newFields);

    if (changed || calcIds.length) {
      output = newFields;
    }

    return output;

  }

  async render() {
    const gadgetState = await bo.clas.State.getGadgetState(this.id);
    const container = document.querySelector(`#${this.containerId}`);
    this.grid = new Grid(container, columnLibrary, gadgetState, this.data);
  }

  update() {
    updateDate();
  }

  updateData() {
    if (this.grid) {
      this.grid.agGrid.gridOptions.api.setRowData(this.data);
    }
    // move upadate from state to here!
  }

  updateColumns() {
    //
  }

  updateFilters() {
    //
  }

  updateSort() {
    //
  }

  alive() {
    return !!document.querySelector(this.selector);
  }

}
