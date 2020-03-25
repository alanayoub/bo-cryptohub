import GoldenLayout from '../../libs/golden-layout/js/goldenlayout.js';
import { getRandomInt } from '../../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';
import { objectFlattenObject as flatten } from '../../libs/bo-utils-client';
import initPug from '../../generated/init-pug.generated.js';
import columnLibrary from '../../columns';
import { waitUntil } from '../../libs/bo-utils-client';

import style from './index.scss';

const colLib = flatten(columnLibrary);

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
          this.#syncStackTabs(newState);
          this.#syncStackActiveTabs(newState);
          // bo.inst.gadgets.manager.load();
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

    getStackBySid(sid) {
      const stacks = this.layout.root.getItemsByType('stack');
      const stack = stacks.filter(x => x.config.sid === sid)[0];
      return stack;
    }

    moveGadget(sid, id) {
      const component = this.layout.root.getItemsById(id)[0];
      const stack = this.getStackBySid(sid);

      component.remove();
      component.config.sid = sid;
      component.config.componentState.sid = sid;

      stack.addChild(component);
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
          reorderEnabled: false, // Turn off tab drag / drop so we can implement our own
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
        tab.element[0].setAttribute('data-id', tab.contentItem.config.id);
        const config = tab.contentItem.config;
        bo.inst.gadgets.manager.loadTabGadget(config);

        waitUntil(
          () => {
            return document.body.contains(tab.element[0]);
          },
          () => {
            const draggable = $(tab.element[0]).draggable({
              helper: function (event, ui) {
                const id = +event.target.closest('.lm_tab').dataset.id;
                const config = bo.inst.layout.root.getItemsById(id)[0].config;
                const data = bo.inst.data.last.main.filter(x => x.id === config.rowId)[0];
                const name = gnp(data, 'cc-total-vol-full-FullName.value');
                const field = colLib[config.componentState.colId].field;
                const title = `${name} ${field}`;
                const rowId = config.componentState.rowId;
                const colId = config.componentState.colId;
                const context = {title, id, rowId, colId};
                const html = initPug['CH-tippy-drag-helper'](context);
                return html;
              },
              zIndex: 10000,
              cursor: 'move',
              revert: 'invalid',
              scroll: false,
              distance: 20,
              cursorAt: {top: 25, left: 10},
              iframeFix: true,
              appendTo: 'body',
              revertDuration: 500,
            });
            draggable.on('dragstart', (event, ui) => {
              ui.helper[0].style.transform = 'none';
              ui.helper[0].style.top = ui.originalPosition.top;
              ui.helper[0].style.left = ui.originalPosition.left;
            });
          },
          100);

      });

      layout.on('stateChanged', async arg => {
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
          const sid = stack.config.sid;
          bo.inst.state.set({stackId: sid, handler: oldStack => {
            oldStack.content.push({id, type: 'default'});
            return oldStack;
          }});
        });
        stack.header.controlsContainer.prepend($html);
      });

      layout.on('newTab', event => {});

      layout.on('stackCreated', stack => {

        if (this.$droppable) {
          this.$droppable.droppable('destroy');
        }
        this.$droppable = $('.lm_stack:not([data-sid="0"])').droppable({
          drop: async (event, ui) => {

            // from cell to stack
            let { rowid:rowId, colid:colId, id } = ui.helper[0].dataset
            const colDef = colLib[colId];
            const type = colDef.cellRendererParams.popdiv;
            if (id) id = +id;

            if (!id) {
              // from cell to stack
              const field = colDef.field;
              const $cell = ui.draggable[0]._tippy.reference;
              const row = $cell.closest('.ag-row').getAttribute('row-index');
              const id = getRandomInt(100000, 999999);
              const sid = +event.target.dataset.sid;
              bo.clas.CellInteractions.close({$cell, row, field});
              bo.inst.state.set({stackId: sid, handler: stack => {
                stack.content.push({id, sid, rowId, colId, type});
                stack.activeItemIndex = stack.content.length - 1;
                return stack;
              }});
            }
            else {
              // from stack to stack
              const config = bo.inst.layout.root.getItemsById(id)[0].config;
              const fromSid = config.sid;
              const toSid = +event.target.dataset.sid;
              bo.inst.state.set({handler: state => {
                for (const val of Layout.iterateStacks(state.layout)) {
                  if (val.type === 'stack') {
                    const stack = val.ref;
                    if (stack.sid === fromSid) {
                      // remove from stack
                      const idx = stack.content.findIndex(x => x.id === id);
                      stack.content.splice(idx, 1);
                      if (stack.activeItemIndex > stack.content.length - 1) {
                        stack.activeItemIndex = stack.content.length - 1;
                      }
                    }
                    if (stack.sid === toSid) {
                      // add to stack
                      stack.content.push({id, sid: toSid, rowId, colId, type});
                      stack.activeItemIndex = stack.content.length - 1;
                    }
                  }
                }
                return state;
              }});
            }

          }
        });
      });

      layout.on('columnCreated', column => {});
      layout.on('itemDestroyed', item => {});
      layout.on('selectionChanged', selection => {});
      layout.on('rowCreated', row => {});
      layout.on('urlChanged', event => {});
      layout.on('itemCreated', item => {});
      layout.on('initialised', something => {});

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

    static #getTypeMap() {
      const typeMap = {
        html: 'Data',
        treemap: 'Treemap',
        wallets: 'Wallets',
        default: 'Default',
        exchanges: 'Exchanges',
        tradingview: 'Chart'
      }
      return typeMap;
    }

    static #decompress(content, data) {
      const typeMap = Layout.#getTypeMap();
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

    getTitle(component) {
      let data;
      let title;
      const { colId, rowId, type } = component;
      if (rowId) {
        data = bo.inst.data.last.main.find(x => x.id === rowId);
      }
      if (data) {
        const name = data['cc-total-vol-full-FullName'].value;
        const typeMap = Layout.#getTypeMap();
        const typeName = typeMap[type];
        title = `${name} ${typeName}`;
      }
      else if (type === 'default') {
        title = 'Default';
      }
      else if (type === 'treemap') {
        title = 'Treemap';
      }
      return title;
    }

    #syncStacksDelete(newState) {
      for (const {ref, type} of Layout.iterateStacks(newState.layout)) {
        if (type === 'stack') {
          const layoutStack = this.getStackBySid(ref.sid);
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
    }

    #syncStacksAdd(newState) {
      for (const {ref, type} of Layout.iterateStacks(newState.layout)) {
        if (type === 'stack') {
          const layoutStack = this.getStackBySid(ref.sid);
          const layoutStackComponentIds = layoutStack.contentItems.map(x => x.config.id);
          const stateStackComponentIds = ref.content.map(x => x.id);
          for (const id of stateStackComponentIds) {
            if (!layoutStackComponentIds.includes(id)) {
              const config = ref.content.filter(x => x.id === id)[0];
              const title = this.getTitle({rowId: config.rowId, colId: config.colId, type: config.type});
              const newItem = {
                title,
                id: config.id,
                sid: config.sid,
                type: 'component',
                componentName: 'commonComponent',
                componentState: {
                  ...config
                }
              }
              layoutStack.addChild(newItem);
            }
          }
        }
      }
    }

    #syncStacksMove(newState) {
      for (const {ref, type} of Layout.iterateStacks(newState.layout)) {
        if (type === 'stack') {
          const layoutStack = this.getStackBySid(ref.sid);
          const layoutStackComponentIds = layoutStack.contentItems.map(x => x.config.id);
          const stateStackComponentIds = ref.content.map(x => x.id);
          for (const component of ref.content) {
            const { id, sid } = component;
            const title = this.getTitle(component);
            const gadget = bo.inst.gadgets.manager.gadgets[id];

            if (bo.inst.gadgets.manager.gadgetHasMoved(gadget, sid)) {
              this.moveGadget(sid, id);
            }

            if (bo.inst.gadgets.manager.gadgetIsAlive(gadget)) {
              continue;
            }

            const stack = this.getStackBySid(sid);
            if (!stack) {
              continue
            }

            const newComponent = {
              id,
              sid,
              title,
              type: 'component',
              componentName: 'commonComponent',
              componentState: {
                ...config
                // id,
                // sid,
                // type,
                // ...colId && {colId},
                // ...rowId && {rowId}
              }
            }
            stack.addChild(newComponent);
          }
        }
      }
    }

    #syncStackTabs(newState) {
      const layoutStacks = bo.inst.layout.root.getItemsByType('stack');
      const layoutStackMap = layoutStacks.reduce((acc, val) => {
        acc[val.config.sid] = val;
        return acc;
      }, {});
      this.#syncStacksDelete(newState);
      this.#syncStacksAdd(newState);
      this.#syncStacksMove(newState);
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
