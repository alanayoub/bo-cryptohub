'use strict';

import EventEmitter from 'events';
import initPug from '../../generated/init-pug.generated.js';
import style from './index.scss';


export default class Save extends EventEmitter {

  constructor(selector, loggedin = true) {
    super();
    this.loggedin = loggedin;
    this.selector = selector;
    this.update();
  }

  async update() {

    if (!this.loggedin) {
      const html = initPug['save']({});
      const container = document.querySelector(this.selector);
      container.innerHTML = html;
    }
    else {
      const views = await bo.rest.views.get(null, {cacheFor: 1000});
      if (views.error) {
        throw new Error(views.error);
      }
      let count = 5;
      while (count--) {
        if (!views.data.user[count]) {
          views.data.user[count] = {};
        }
      }
      const context = {views: views.data.user};
      const html = initPug['save'](context);
      const container = document.querySelector(this.selector);
      container.innerHTML = html;
      container.querySelectorAll('.ch-button').forEach(node => {
        node.addEventListener('click', event => {
          this.save(event);
        });
      });
      container.querySelectorAll('.fa-times').forEach(node => {
        node.addEventListener('click', event => {
          this.save(event, true);
        });
      });
    }

  }

  save(event, del) {
    const target = event.target;
    const li = target.closest('li');
    const nodes = target.closest('ol').querySelectorAll('li');
    const input = li.querySelector('input');
    const value = input.value;
    const index = Array.from(nodes).indexOf(li);
    const container = target.closest('.ch-save');
    if (typeof value === 'string' && typeof index === 'number') {
      let payload;
      if (del) {
        payload = {
          slot: index + 1,
          del: true
        }
      }
      else {
        payload = {
          slot: index + 1,
          view: window.location.href,
          name: value
        }
      }
      bo.rest.views.post(payload).then(response => {
        if (response.error) return;
        this.emit('save');
        this.update();
        container.classList.add('ch-flash');
        setTimeout(() => {
          container.classList.remove('ch-flash');
        }, 2000);
      });
    }
    else {
      console.log('Error saving: incorrect data provided');
    }
  }

}
