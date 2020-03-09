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

      if (newState.silent) {
        delete newState.silent;
        const newUrlHash = await bo.clas.State.urlEncode(newState);
        history.replaceState(newState, '', window.location.origin + '#' + newUrlHash);
        return;
      }

      let changed, emitData;

      ({ changed, emitData } = this.checkGadgetStateChange(oldState, newState));
      if (changed && emitData) {
        this.emit('GADGET_STATE_CHANGED', emitData);
      }

      ({ changed, emitData } = this.checkLayoutStateChange(oldState, newState));
      if (changed && emitData) {
        this.emit('LAYOUT_STATE_CHANGED', emitData);
      }

    };

  }


  checkGadgetStateChange(oldState, newState) {
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
        return {changed: true, emitData};
      }
    }
    return {changed: false}
  }
  checkLayoutStateChange(oldState, newState) {
    const getLayoutOnlyStr = function getLayoutOnlyStr(state) {
      const s = JSON.parse(JSON.stringify(state));
      for (const l of bo.clas.Layout.iterateStacks(s.layout)) {
        if (l.type === 'stack') {
          delete l.ref.content
        }
      }
      return JSON.stringify(s);
    }
    const changed = getLayoutOnlyStr(oldState) !== getLayoutOnlyStr(newState);
    const emitData = {oldState, newState};
    return {changed, emitData}
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
