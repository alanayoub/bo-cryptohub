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
    const frozen = [];

    // Source data
    const source = [];
    for (const [key, val] of Object.entries(columnLibrary)) {
      let children = [];
      for (const [k, v] of Object.entries(val)) {
        if (v.pinned === 'left') {
          frozen.push({key: k, title: v.headerName});
        }
        else {
          children.push({key: k, title: v.headerName});
          groupMapping[k] = key;
        }
      }
      source.push({title: key, folder: true, children});
    }

    // Destination Data
    const destination = [];
    const state = await bo.inst.state.get();
    const columns = state.columns;
    const frozenFields = frozen.map(v => v.key);
    for (const col of columns) {
      const key = col.id;
      const group = groupMapping[key];
      const name = colLib[key].headerName;
      const title = `${group}: ${name}`;
      if (!frozenFields.includes(key)) {
        destination.push({key, title});
      }
    }

    // HTML data
    const context = {
      header: {
        title: 'Edit',
        subtitle: ''
      },
      frozenColumns: frozen,
    };

    this.modal.setContent(initPug['edit-dialogue'](context));
    this.modal.open();

    this.selector = new Selector(
      document.querySelector('#tree'),
      document.querySelector('#tree2'),
      source,
      destination,
      frozen
    );

  }

  close() {
    this.modal.close();
  }

}
