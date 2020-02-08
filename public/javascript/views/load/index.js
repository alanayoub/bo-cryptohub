'use strict';

import initPug from '../../generated/init-pug.generated.js';
import style from './index.scss';

export default class Load {

  constructor(selector) {
    this.selector = selector;
    this.update();
  }

  async update() {

    const { data = {} } = await bo.rest.views.get(null, {cacheFor: 1000});
    const user = (data.user || []).filter(Boolean);
    const main = data.default || [];
    const context = {
      views: {
        user,
        main
      }
    };
    const html = initPug['load'](context);
    const container = document.querySelector(this.selector);
    container.innerHTML = html;
    container.querySelectorAll('a').forEach(element => {
      element.addEventListener('click', event => {
        container.style.display = 'none';
        setTimeout(() => {
          container.style.display = 'inherit';
        }, 1000);
      });
    });

  }

}
