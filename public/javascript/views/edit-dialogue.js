'use strict';

// Binary Overdose Projects
import { objectFlattenObject as flatten } from '../libs/bo-utils-client';

// Libs
import delegate      from 'delegate';

// Templates
import initPug       from '../generated/init-pug.generated.js';

// Binary Overdose Uions
import columnLibrary from '../columns/';

// Styles
import style         from './edit-dialogue.css';

/**
 *
 * Ok button handler
 *
 * Generate column list from current column state and add new columns
 * Then set the new state
 *
 * @return void
 *
 */
const okButtonHandler = async function () {

  const state = await bo.inst.state.get();
  const stateCols = state.columns;

  // Map field names to indexes
  const map = {};
  for (const [i, col] of Object.entries(stateCols)) {
    map[col.id] = i;
  }

  // Get active column state for incumbent cols or create new col
  const selectorFrozen = '.BO-edit-dialogue .bo-active-columns-frozen li';
  const selectorActive = '.BO-edit-dialogue .bo-active-columns li';
  const elementListFrozen = document.querySelectorAll(selectorFrozen);
  const elementList = document.querySelectorAll(selectorActive);
  const list = Array.from([...elementListFrozen, ...elementList]).map(v => v.dataset.id);
  const columns = [];
  for (const field of list) {
    const idx = map[field];
    if (idx > -1) {
      columns.push(stateCols[idx]);
    }
    else {
      columns.push({
        id: field
      });
    }
  }

  bo.inst.state.set('columns', columns);

}

export default class EditDialogue {

  constructor(parentSelector, selector) {

    const options = {
      footer: true,
      stickyFooter: false,
      closeMethods: ['overlay', 'button', 'escape'],
      closeLabel: 'Close',
      cssClass: ['custom-class-2', 'custom-class-2'],
      onOpen: () => {},
      onClose: () => {},
      beforeClose: () => {
        return true; // close the modal
      }
    }

    this.modal = new tingle.modal(options);

    this.modal.addFooterBtn('Cancel', 'BO-btn bo-btn-secondary', () => {
      this.modal.close();
    });

    this.modal.addFooterBtn('OK', 'BO-btn bo-btn-primary', async () => {
      await okButtonHandler();
      this.modal.close();
    });


    delegate(parentSelector, selector, 'click', event => {
      this.open();
    }, false);

  }

  /**
   *
   * Open dialogue and build view
   *
   */
  async open() {

    const colLib = flatten(columnLibrary);

    const allColumns = [];
    for (const [key, val] of Object.entries(colLib)) {
      allColumns.push({id: key, name: val.headerName});
    }

    const activeColumns = [];
    const state = await bo.inst.state.get();
    const columns = state.columns;
    for (const col of columns) {
      const id = col.id;
      activeColumns.push({
        id,
        name: colLib[id].headerName
      });
    }

    const activeFields = activeColumns.map(v => v.id);
    const availableColumns = allColumns.filter(v => !activeFields.includes(v.id));
    const frozenColumns = activeColumns.splice(0, 2);

    const data = {
      header: {
        title: 'Edit',
        subtitle: 'Drag & Drop the columns you want displayed'
      },
      // frozenColumns: {rowIndex: true, name: true},
      frozenColumns,
      availableColumns,
      activeColumns
    };
    const content = initPug['edit-dialogue'](data);

    this.modal.setContent(content);

    const leftCol = document.querySelector('.bo-available-columns');
    const rightCol = document.querySelector('.bo-active-columns');

    new Sortable(leftCol, {
      group: 'shared', // set both lists to same group
      animation: 150,
      ghostClass: 'bo-ghost',
      chosenClass: 'bo-chosen'
    });

    new Sortable(rightCol, {
      filter: '.bo-active-columns .bo-frozen', // 'filtered' class is not draggable
      group: 'shared',
      animation: 150,
      ghostClass: 'bo-ghost',
      chosenClass: 'bo-chosen'
    });

    this.modal.open();

  }

  close() {
    this.modal.close();
  }

}
