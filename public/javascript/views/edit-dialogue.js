'use strict';

// Binary Overdose Projects
import { objectFlattenObject as flatten } from '../libs/bo-utils-client';

// Binary Overdose Cols
import columnLibrary from '../columns/';

// Binary Overdose View
import Selector      from './tree-selector/tree-selector.js';

// Libs
import delegate      from 'delegate';

// Templates
import initPug       from '../generated/init-pug.generated.js';

// Styles
import style         from './edit-dialogue.css';

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
      await this.okButtonHandler();
      this.modal.close();
    });

    delegate(parentSelector, selector, 'click', event => {
      this.open();
    }, false);

  }

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
  async okButtonHandler() {

    const state = await bo.inst.state.get();
    const stateCols = state.columns;

    // Map field names to indexes
    const map = {};
    for (const [i, col] of Object.entries(stateCols)) {
      map[col.id] = i;
    }

    const list = this.selector.get().map(v => v.id);

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

  /**
   *
   * Open dialogue and build view
   *
   */
  async open() {

    const colLib = flatten(columnLibrary);

    const groupMapping = {};
    const availableColumns = [];
    for (const [key, val] of Object.entries(columnLibrary)) {
      let children = [];
      for (const [k, v] of Object.entries(val)) {
        children.push({key: k, title: v.headerName});
        groupMapping[k] = key;
      }
      availableColumns.push({title: key, folder: true, children});
    }

    const activeColumns = [];
    const state = await bo.inst.state.get();
    const columns = state.columns;
    for (const col of columns) {
      const key = col.id;
      const group = groupMapping[key];
      const name = colLib[key].headerName;
      const title = `${group}: ${name}`;
      activeColumns.push({key, title});
    }

    const frozenColumns = activeColumns.splice(0, 2);

    const data = {
      header: {
        title: 'Edit',
        subtitle: 'Drag & Drop the columns you want displayed'
      },
      // frozenColumns: {rowIndex: true, name: true},
      frozenColumns,
      // availableColumns,
      // activeColumns
    };
    const content = initPug['edit-dialogue'](data);

    this.modal.setContent(content);

    const leftCol = document.querySelector('.bo-available-columns');
    const rightCol = document.querySelector('.bo-active-columns');

    const sourceElement = document.querySelector('#tree');
    const destinationElement = document.querySelector('#tree2');
    const source = availableColumns;
    const destination = activeColumns;
    const frozen = frozenColumns;

    this.modal.open();

    this.selector = new Selector(sourceElement, destinationElement, source, destination, frozen);

  }

  close() {
    this.modal.close();
  }

}
