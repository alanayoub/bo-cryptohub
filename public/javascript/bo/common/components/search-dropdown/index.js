'use strict';

import { getRandomInt } from '../../../../libs/bo-utils-client';
import initPug from '../../../../generated/init-pug.generated.js';

import style from './index.scss';

export default class SearchDropdown {

  constructor({selector, placeholder, name, options}) {
    this.rand = getRandomInt(100000, 999999);
    this.id = `ch-gadget-${this.rand}`;
    this.container = document.querySelector(selector);
    this.name = name;
    this.options = options;
    this.placeholder = placeholder;
    const input = this.render();
    return input;
  }

  addListeners() {
    const inputListener = event => {
      event.stopPropagation();
      this.renderDropdown();
    }
    const containerListener = event => {
      event.stopPropagation();
      const target = event.target;
      const dataset = target.dataset;
      const dropdown = this.dropdown;
      const input = this.input;
      if (target.nodeName === 'INPUT') {
        dropdown.style.display = 'block';
        this.renderDropdown();
        document.body.addEventListener('mousedown', event => {
          dropdown.style.display = 'none';
        }, {once: true});
      }
      else if (target.nodeName === 'LI') {
        input.value = event.target.textContent;
        input.setAttribute('data-id', dataset.id);
        dropdown.style.display = 'none';
      }
    }
    this.input.removeEventListener('keyup', inputListener);
    this.input.addEventListener('keyup', inputListener);
    this.container.removeEventListener('mousedown', containerListener);
    this.container.addEventListener('mousedown', containerListener);
  }

  render() {
    const model = {placeholder: this.placeholder, name: this.name};
    const html = initPug['common.search.dropdown'](model);
    this.container.innerHTML = html;
    this.dropdown = this.container.querySelector('.bo-dropdown');
    this.input = this.container.querySelector('input');
    this.dropdown.style.display = this.input.value ? 'block' : 'none';
    this.addListeners();
    return this.input;
  }

  renderDropdown() {
    const value = this.input.value && this.input.value.toLowerCase();
    const html = ['<ul>'];
    this.options.forEach(x => {
      if (!value || new RegExp(`^${value}`).test(x.name.toLowerCase())) {
        html.push(`<li data-id=${x.id}>${x.name}</li>`);
      }
    });
    html.push('</ul>');
    this.dropdown.innerHTML = html.join('');
  }

}
