'use strict';

import EventEmitter from 'events';

export default class Events extends EventEmitter {

  constructor() {
    super();

    window.onhashchange = async event => {
      this.emit('hashchange', event);

      const { oldURL, newURL } = event;
      const oldState = await Events.getState(oldURL);
      const newState = await Events.getState(newURL);
      if (!oldState) {
        return;
      }
      const oldColumns = oldState.window[0].columns.map(v => v.id).sort().toString();
      const newColumns = newState.window[0].columns.map(v => v.id).sort().toString();
      if (oldColumns !== newColumns) {
        this.emit('MAIN_COLUMNS_CHANGED', {oldState, newState});
      }

    };

  }

  static async getState(url) {
    if (!url) return;
    const urlObj = new URL(url);
    const fragmentId = urlObj.hash.substr(1);
    if (!fragmentId) return;
    const state = await bo.clas.State.urlDecode(fragmentId);
    return state;
  }

}
