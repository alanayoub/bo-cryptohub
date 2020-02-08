'use strict';

import initPug from '../../generated/init-pug.generated.js';
import style from './index.scss';

export default class Login {

  constructor(selector) {
    this.init(selector);
  }

  async init(selector) {

    let user = {};
    const res = await bo.rest.user.get(null, {cacheFor: 1000});
    if (res.data && res.data.google) {
      user = res.data.google;
      if (Array.isArray(user.photos)) {
        user.photo = user.photos[0];
      }
    }

    const html = initPug['login']({user});
    const container = document.querySelector(selector);
    container.innerHTML = html;

  }

}
