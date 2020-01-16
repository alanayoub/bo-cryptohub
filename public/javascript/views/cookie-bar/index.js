'use strict';

import { webCookieGetCookieByName as getCookie } from '../../libs/bo-utils-client';
import initPug from '../../generated/init-pug.generated.js';
import style from './index.scss';

/**
 *
 * Cookie bar
 *
 */
export default class CookieBar {

  constructor(config) {

    const cookie = getCookie('accept_privacy');
    if (cookie) {
      return;
    }
    this.openCookieBar();

    this.modal = new tingle.modal({
      footer: true,
      stickyFooter: false,
      closeMethods: ['overlay', 'button', 'escape'],
      closeLabel: "Close",
      cssClass: ['BO-cookie-details-tingle'],
      onOpen: () => {
        console.log('modal open');
      },
      onClose: () => {
        console.log('modal closed');
      }
    });

    this.modal.setContent(initPug['cookie-details']({}));

    const modal = this.modal;
    const cookieBar = this;
    modal.addFooterBtn('OK', 'BO-btn bo-btn-primary', async () => {
      modal.close();
      cookieBar.closeCookieBar();
    });

  }

  closeCookieBar() {
    $('#cookie-bar').remove();
    document.cookie = 'accept_privacy=true';
  }

  openCookieBar() {

    const cookieBar = this;
    document.body.innerHTML += initPug['cookie-bar']({});

    $('#cookie-bar a').on('click', event => {
      event.preventDefault();
      cookieBar.openModal();
    });

    $('#cookie-bar .fa-window-close').on('click', () => {
      this.closeCookieBar();
    });

  }

  openModal() {
    this.modal.open();
  }

}
