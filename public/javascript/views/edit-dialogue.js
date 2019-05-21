'use strict';

// Binary Overdose Projects
import { arrayDifference } from '../libs/bo-utils-client';

// Binary Overdose Util functions
import initPug             from '../generated/init-pug.generated.js';

import columnLibrary       from '../column-library.js';

import style               from './edit-dialogue.css';

export default class EditDialogue {

  constructor(selector) {

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

    this.modal.addFooterBtn('OK', 'BO-btn bo-btn-primary', () => {

      const elementListFrozen = document.querySelectorAll('.BO-edit-dialogue .bo-active-columns-frozen li');
      const elementList = document.querySelectorAll('.BO-edit-dialogue .bo-active-columns li');
      const list = Array.from([...elementListFrozen, ...elementList]).map(v => v.textContent);

      const columns = [];
      for (let field of list) {
        columns.push({id: field});
      }

      bo.inst.state.set('columns', columns);

      this.modal.close();

    });

    const $target = document.querySelector(selector);
    const activeClass = 'bo-active';
    $target.onclick = event => {
      this.open();
    }

  }

  open() {

    const allColumns = Object.keys(columnLibrary);
    const activeColumns = bo.inst.state.get().columns.map(v => v.id);
    const availableColumns = [...arrayDifference(allColumns, activeColumns)];
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
