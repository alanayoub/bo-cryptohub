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

import isValidCustomCalculation from '../utils/is-valid-custom-calculation.js';
import segment       from '../utils/segment.js';

// Styles
import style         from './edit-dialogue.scss';

export default class EditDialogue {

  constructor(parentSelector, selector) {

    const options = {
      footer: true,
      stickyFooter: false,
      closeMethods: ['overlay', 'button', 'escape'],
      closeLabel: 'Close',
      cssClass: ['BO-edit-dialog-tingle'],
      onOpen: () => {},
      onClose: () => {},
      beforeClose: () => {
        return true; // close the modal
      }
    }

    this.modal = new tingle.modal(options);

    this.modal.addFooterBtn('Cancel', 'BO-btn bo-btn-secondary', async () => {
      this.setErrorState({error: false});
      this.modal.close();
      const state = await bo.inst.state.get();
      const selectorData = this.selector.get();
      const stateCols = state.window[0].columns;
      segment.editAborted(stateCols, selectorData);
    });

    this.modal.addFooterBtn('OK', 'BO-btn bo-btn-primary', async () => {
      this.okButtonHandler();
    });

    delegate(parentSelector, selector, 'click', event => {
      this.open();
      segment.editStarted();
    }, false);

  }

  setErrorState(data) {
    const button = document.querySelector('.BO-edit-dialog-tingle .bo-btn-primary');
    if (data.error) {
      button.classList.add('bo-btn-disabled');
      button.setAttribute('title', data.message);
      button.setAttribute('disabled', true);
    }
    else {
      button.classList.remove('bo-btn-disabled');
      button.removeAttribute('title');
      button.removeAttribute('disabled');
    }
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
    const selectorData = this.selector.get();
    const stateCols = state.window[0].columns;
    let isValid = true;

    if (!selectorData.error) {
      const list = selectorData.map(v => v.id);
      const columns = [];
      for (const [idx, field] of Object.entries(list)) {
        if (idx > -1) {
          const stateItem = stateCols.filter(v => v.id === selectorData[idx].id)[0];
          const obj = {...stateItem, ...selectorData[idx]};
          if (obj.calc && !isValidCustomCalculation(obj.calc)) {
            isValid = false;
            console.log(`invalid custom calculation ${obj.calc}`);
          }
          else {
            columns.push(obj);
          }
        }
        else {
          columns.push({
            id: field
          });
        }
      }
      if (isValid) {
        bo.inst.state.set('columns', columns);
        this.modal.close();
      }
    }
    else {
      console.log('error', selectorData);
    }

    segment.editApplied(stateCols, selectorData);

  }

  /**
   *
   * Open dialogue and build view
   *
   */
  async open() {

    const groupMapping = {};
    const frozen = [];
    const state = await bo.inst.state.get();

    // Adding custom columns to colLib
    const customColumnGroup = {};
    state.window[0].columns.forEach(custom => {
      if (/^c-\d{1,4}$/.test(custom.id)) {
        customColumnGroup[custom.id] = custom;
      }
    });
    if (Object.keys(customColumnGroup).length) {
      columnLibrary.custom = customColumnGroup;
    }

    const colLib = flatten(columnLibrary);

    // Source data
    const source = [];
    let first = 0;
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
      source.push({
        children,
        title: key,
        folder: true,
        expanded: first ? undefined : !!++first
      });
    }

    // Destination Data
    const destination = [];
    const columns = state.window[0].columns;
    const frozenFields = frozen.map(v => v.key);
    for (const col of columns) {
      const key = col.id;
      const sources = col.sources;
      const type = col.type;
      const calc = col.calc;
      const hide = col.hide;
      const group = groupMapping[key];
      const headerName = colLib[key].headerName;
      const title = `${group}: ${headerName}`;
      const custom = /^c-\d{1,2}/.test(key);
      if (!frozenFields.includes(key)) {
        const item = {
          key,
          title,
          data: {
            calc,
            type,
            custom,
            sources,
            headerName
          }
        };
        if (hide) item.data.hide = hide;
        destination.push(item);
      }
    }

    const totalAvailable = source.reduce((a, b) => a + b.children.length, 0);
    const totalSelected = columns.length - 2;

    // HTML data
    const context = {
      header: {
        title: 'Edit Columns',
        subtitle: ''
      },
      totalSelected,
      totalAvailable,
      frozenColumns: frozen,
    };

    this.modal.setContent(initPug['edit-dialogue'](context));
    this.modal.open();

    this.selector = new Selector(
      document.querySelector('#tree'),
      document.querySelector('#tree2'),
      source,
      destination,
      frozen,
      this.setErrorState
    );

  }

  close() {
    this.modal.close();
  }

}
