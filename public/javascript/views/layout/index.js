import GoldenLayout from '../../libs/golden-layout/js/goldenlayout.js';
import { getRandomInt } from '../../libs/bo-utils-client';

import style from './index.scss';

export default class Layout {

    constructor({container, state, data = []}) {

      const config = Layout.#getConfig(state, data);
      const layout = new GoldenLayout(config, container);

      // We don't use the golden layout component types
      // We have our own system, therefor every component
      // is a commonComponent
      layout.registerComponent('commonComponent', (container, componentState) => {
        container.getElement().html(`<div id=gadget-container-${componentState.id}></div>`);
      });

      Layout.#registerEvents(layout);

      layout.init();

      return layout;

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

      layout.on('stateChanged', () => {
        console.log('state changed');
        if (!bo.agOptions || !bo.agOptions.api) return;
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
          // const sid = stack.config.sid;
          // bo.inst.state.set(`window.${sid}`, {id, type: 'default'}, 'push');
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

            const { colId, rowId, type } = value;
            const newItem = {
              id,
              title,
              type: 'component',
              componentName: 'commonComponent',
              componentState: {
                id,
                type,
                ...colId && {colId},
                ...rowId && {assetId: rowId}
              }
            }
            Object.assign(val.ref.content[key], newItem);
          }

        }
      }

    }

    static #save(layout) {
      const config = layout.toConfig().content;
      const compressedConfig = Layout.#compress(config);
      bo.inst.state.set('layout', compressedConfig);
    }

}
