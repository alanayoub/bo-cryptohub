'use strict';

import EventEmitter from 'events';

export default class Data extends EventEmitter {

  constructor() {

    this.emit('main', {full: true, data: {}});
    this.emit('main', {partial: true, data: {}});

  }

}
