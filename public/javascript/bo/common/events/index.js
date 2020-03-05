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

      const oldComponents = {};
      for (const val of bo.clas.Layout.iterateStacks(oldState.layout)) {
        if (val.type === 'stack') {
          for (const component of Object.values(val.ref.content)) {
            oldComponents[component.id] = component;
          }
        }
      }
      const newComponents = {};
      for (const val of bo.clas.Layout.iterateStacks(newState.layout)) {
        if (val.type === 'stack') {
          for (const component of Object.values(val.ref.content)) {
            newComponents[component.id] = component;
          }
        }
      }

      for (const [gadgetId, component] of Object.entries(newComponents)) {
        const newComponentStr = JSON.stringify(component);
        const oldComponentStr = JSON.stringify(oldComponents[gadgetId]);
        if (oldComponentStr !== newComponentStr) {
          const emitData = {
            gadgetId,
          }
          if (oldComponentStr) emitData.oldState = JSON.parse(oldComponentStr);
          if (newComponentStr) emitData.newState = JSON.parse(newComponentStr);
          this.emit('GADGET_STATE_CHANGED', emitData);
        }
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
