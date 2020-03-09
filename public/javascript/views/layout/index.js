import GoldenLayout from '../../libs/golden-layout/js/goldenlayout.js';
import { getRandomInt } from '../../libs/bo-utils-client';

import style from './index.scss';

//
// NOTE: Golden-layout makes it very difficult to programatically update the layout.
// While its the best layout manager out there its really bad. Build your own
// if you get the time
//
export default class Layout {

    constructor({container, state, data = []}) {

      const config = Layout.#getConfig(state, data);
      const layout = this.layout = new GoldenLayout(config, container);

      // We don't use the golden layout component types
      // We have our own system, therefor every component
      // is a commonComponent
      layout.registerComponent('commonComponent', (container, componentState) => {
        container.getElement().html(`<div id=gadget-container-${componentState.id}></div>`);
      });

      Layout.#registerEvents(layout);

      layout.init();

      bo.inst.events.on('LAYOUT_STATE_CHANGED', ({newState}) => {
        const stacksChanged = this.#stacksChanged(newState);

        if (stacksChanged) {
          this.layout.destroy();
          this.layout.config = Layout.#getConfig(newState, data);
          this.layout.init();
        }
        else {
          this.#syncStackDimentions(newState);
          this.#syncStackActiveTabs(newState);
          this.#syncStackTabs(newState);
          bo.inst.gadgets.manager.load();
        }
      });

      return layout;

    }

    static * iterateStacks(config) {
      function* recurse(config) {
        for (const ref of config) {
          if (ref.content) {
            yield* recurse(ref.content);
          }
          if (ref.type === 'stack') {
            yield {ref, type: 'stack'};
          }
          else if (ref.type === 'component') {
            yield {ref, type: 'component'};
          }
          else {
            yield {ref, type: 'other'};
          }
        }
      }
      yield* recurse(config);
    }

    static isActiveGadget(gadgetId, config) {
      for (const val of Layout.iterateStacks(config)) {
        if (val.type === 'stack') {
          for (const [idx, component] of Object.entries(val.ref.content)) {
            if (component.id === gadgetId) {
              if (Number(val.ref.activeItemIndex) === Number(idx)) {
                return true;
              }
            }
          }
        }
      }
      return false;
    }

    static #getConfig(state, data) {

      const content = state.layout;

      Layout.#decompress(content, data);

      const config = {
        settings: {
          hasHeaders: true,
          constrainDragToContainer: true,
          reorderEnabled: true,
          selectionEnabled: false,
          popoutWholeStack: false,
          blockedPopoutsThrowError: true,
          closePopoutsOnUnload: true,
          showPopoutIcon: true,
          showMaximiseIcon: true,
          showCloseIcon: true
        },
        dimensions: {
          borderWidth: 5,
          minItemHeight: 50,
          minItemWidth: 50,
          headerHeight: 24,
          dragProxyWidth: 300,
          dragProxyHeight: 200
        },
        labels: {
          close: 'close',
          maximise: 'maximise',
          minimise: 'minimise',
          popout: 'open in new window'
        }
      };

      config.content = content;

      return config;

    }

    static #registerEvents(layout) {

      layout.on('componentCreated', component => {
        component.container.on('resize', () => {
          const stack = component.parent;
          const item = stack.getActiveContentItem().config;
          const gadget = bo.inst.gadgets.manager.gadgets[item.componentState.id];
          if (gadget && gadget.resize) {
            gadget.resize();
          }
        });
      });

      layout.on('stackCreated', stack => {
        const sid = stack.config.sid;
        stack.element[0].setAttribute('data-sid', sid);
      });

      layout.on('tabCreated', tab => {
        tab.contentItem.element[0].setAttribute('data-id', tab.contentItem.config.id);
        const config = tab.contentItem.config;
        bo.inst.gadgets.manager.loadTabGadget(config);
      });

      layout.on('stateChanged', arg => {
        Layout.#save(layout);
      });

      layout.on('stackCreated', stack => {
        const $html = $(`
          <li class="a-add-tab">
            <i class="fa fa-plus-circle" aria-hidden="true"></i>
            New
          </li>
          <li class="a-divider"></li>
        `);
        $html.on('click', event => {
          const id = getRandomInt(100000, 999999);
          stack.addChild({
            id,
            type: 'component',
            componentName: 'commonComponent',
            componentState: {id, type: 'default'},
            title: 'Default',
          });
          debugger;
          const sid = stack.config.sid;
          bo.inst.state.set({stackId: sid, handler: oldStack => {
            oldStack.content.push({id, type: 'default'});
            return oldStack;
          }});
        });
        stack.header.controlsContainer.prepend($html);
      });

      layout.on('newTab', event => {});
      layout.on('rowCreated', row => {});
      layout.on('urlChanged', event => {});
      layout.on('itemCreated', item => {});
      layout.on('initialised', something => {});
      layout.on('stackCreated', stack => {});
      layout.on('columnCreated', column => {});
      layout.on('itemDestroyed', item => {});
      layout.on('selectionChanged', selection => {});

      $(window).on('resize', event => {
        layout.updateSize();
      });

    }

    static #getContentFromUrl(state) {
    }

    static #compress(config) {
      for (const val of Layout.iterateStacks(config)) {
        if (val.type === 'stack') {
          Object.keys(val.ref).forEach(key => {
            if (!['sid', 'type', 'content', 'width', 'height', 'activeItemIndex'].includes(key)) {
              delete val.ref[key];
            }
          });
        }
        else if (val.type === 'component') {
          // Delete everything except for componentState
          Object.keys(val.ref).forEach(key => {
            if (!['componentState'].includes(key)) {
              delete val.ref[key];
            }
          });
          // Flatten component state on the main object
          Object.keys(val.ref.componentState).forEach(key => {
            val.ref[key] = val.ref.componentState[key];
          });
          // Delete componentState
          delete val.ref.componentState;
        }
        else {
          Object.keys(val.ref).forEach(key => {
            if (!['type', 'content', 'width', 'height'].includes(key)) {
              delete val.ref[key];
            }
          });
        }
      }
      return config;
    }

    static #decompress(content, data) {
      const typeMap = {
        html: 'Data',
        treemap: 'Treemap',
        wallets: 'Wallets',
        default: 'Default',
        exchanges: 'Exchanges',
        tradingview: 'Chart'
      }
      for (const val of Layout.iterateStacks(content)) {
        if (val.type === 'stack') {

          // itterate components in stack
          for (const [key, value] of Object.entries(val.ref.content)) {

            const id = value.id;

            const d = data.find(v => v.id === value.rowId);
            let title;
            if (d) {
              const name = d['cc-total-vol-full-FullName'].value;
              const type = typeMap[value.type];
              title = `${name} ${type}`;
            }
            else if (value.type === 'default') {
              title = 'Default';
            }
            else if (value.type === 'treemap') {
              title = 'Treemap';
            }
            else if (value.type === 'main') {
              title = 'All Assets';
            }

            const newItem = {
              id,
              title,
              type: 'component',
              componentName: 'commonComponent',
              componentState: {
                ...value
              }
            }
            Object.assign(val.ref.content[key], newItem);
          }

        }
      }

    }

    /**
     *
     * Check if the number of stacks or stack ids between newState and
     * instance state have diverged
     *
     */
    #stacksChanged(newState) {
      const layoutStacks = this.layout.root.getItemsByType('stack').reduce((acc, val) => {
        acc[val.config.sid] = val;
        return acc;
      }, {});

      const urlStacks = {};
      for (const val of Layout.iterateStacks(newState.layout[0].content)) {
        if (val.type === 'stack') {
          urlStacks[val.ref.sid] = val.ref;
        }
      }

      const stacksChanged = Object.keys(layoutStacks).join() !== Object.keys(urlStacks).join();
      return stacksChanged;
    }

    /**
     *
     * Copy properties from the layout provided to the instance layout
     *
     */
    #syncStackDimentions(newState) {
      const propsToCopy = ['width', 'height'];
      const layoutStacks = this.layout.root.getItemsByType('stack').reduce((acc, val) => {
        acc[val.config.sid] = val;
        return acc;
      }, {});
      const stackDimentions = {};
      for (const val of Layout.iterateStacks(newState.layout)) {
        if ((val.ref.width || val.ref.height) && (val.ref.type === 'row' || val.ref.type === 'column')) {
          for (const stack of val.ref.content) {
            stackDimentions[stack.sid] = {};
            for (const prop of propsToCopy) {
              stackDimentions[stack.sid][prop] = stack.hasOwnProperty(prop) ? stack[prop] : val.ref[prop];
            }
          }
        }
      }
      for (const [id, stack] of Object.entries(layoutStacks)) {
        const stackDims = stackDimentions[Number(id)];
        for (const prop of propsToCopy) {
          if (stack.parent.config[prop]) {
            stack.parent.config[prop] = stackDims[prop];
          }
          if (stack.config[prop]) {
            stack.config[prop] = stackDims[prop];
          }
        }
      }
      bo.inst.layout.updateSize();
    }

    #syncStackTabs(newState) {

      // Delete components that are no longer in the stack
      const layoutStacks = bo.inst.layout.root.getItemsByType('stack');
      for (const {ref, type} of Layout.iterateStacks(newState.layout)) {
        if (type === 'stack') {
          const layoutStack = layoutStacks.filter(x => x.config.sid === ref.sid)[0];
          const layoutStackComponentIds = layoutStack.contentItems.map(x => x.config.id);
          const stateStackComponentIds = ref.content.map(x => x.id);
          for (const id of layoutStackComponentIds) {
            if (!stateStackComponentIds.includes(id)) {
              const component = bo.inst.layout.root.getItemsById(id)[0];
              layoutStack.removeChild(component);
            }
          }
        }
      }

    //  const layoutStacks = this.layout.root.getItemsByType('stack');
    //  for (const val of Layout.iterateStacks(newState.layout)) {
    //    if (val.ref.type === 'stack') {
    //      const stateStack = val.ref;
    //      const layoutStack = layoutStacks.filter(stack => stack.config.sid === val.ref.sid)[0];
    //      for (const component of stateStack.content) {
    //        const newStateComponent = val.ref.content[0];
    //        const layoutComponent = layoutStack.contentItems[0];
    //        const newStateComponentStr = JSON.stringify(newStateComponent);
    //        const layoutComponentStr = JSON.stringify(layoutComponent.config.componentState);
    //        if (newStateComponentStr === layoutComponentStr) {
    //            // do nothing
    //        }
    //        else {
    //          // layoutStack.replaceChild(layoutComponent, newStateComponent);
    //        }
    //      }
    //      // const item = layoutStack.contentItems[val.ref.activeItemIndex];
    //      // item.tab.header.parent.setActiveContentItem(item);
    //    }
    //  }
    //  // check ids
    //  // check count
    //  //   add / remove
    //  // check order
    //  //   reorder
    //  //
    //  //   [01, 02, 04]
    //  //   [02, 03, 04, 05]
    //  //
    //  //   myLayout.selectedItem.addChild(newItemConfig, index)
    //  //   replaceChild( oldChild, newChild )
    //  //   removeChild
    }

    /**
     *
     * Set active tab for all stacks based on new state
     *
     */
    #syncStackActiveTabs(newState) {
      const layoutStacks = this.layout.root.getItemsByType('stack');
      for (const val of Layout.iterateStacks(newState.layout)) {
        if (val.ref.type === 'stack') {
          const layoutStack = layoutStacks.filter(stack => stack.config.sid === val.ref.sid)[0];
          const item = layoutStack.contentItems[val.ref.activeItemIndex];
          item.tab.header.parent.setActiveContentItem(item);
        }
      }
    }

    static #save(layout) {
      const config = layout.toConfig().content;
      const compressedConfig = Layout.#compress(config);
      bo.inst.state.set({newState: {layout: compressedConfig}});
    }

}
