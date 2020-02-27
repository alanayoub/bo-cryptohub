import GoldenLayout from '../../libs/golden-layout/js/goldenlayout.js';
import { getRandomInt } from '../../libs/bo-utils-client';

import style from './index.scss';

function* iterateStacks(config) {
  function* recurse(config) {
    for (var ref of config) {
      if (ref.content) {
        yield* recurse(ref.content);
      }
      if (ref.type === 'stack') {
        yield ref;
      }
    }
  }
  yield* recurse(config);
}

//
// Strip junk from layout
//
// var config = bo.inst.layout.toConfig().content;
// function recurse(config) {
//   for (var ref of config) {
//     if (ref.content) {
//       recurse(ref.content);
//     }
//     if (ref.type === 'stack') {
//       Object.keys(ref).forEach(key => {
//         if (!['type', 'content', 'width', 'height'].includes(key)) {
//           delete ref[key];
//         }
//       })
//     }
//     else if (ref.type === 'component') {
//       Object.keys(ref).forEach(key => {
//         if (!['id', 'type', 'content'].includes(key)) {
//           delete ref[key];
//         }
//       })
//     }
//     else {
//       Object.keys(ref).forEach(key => {
//         if (!['type', 'content'].includes(key)) {
//           delete ref[key];
//         }
//       })
//     }

//   }
// }
// recurse(config)
// console.log(JSON.stringify(config, null, 2));

export default class Layout {

    constructor({container, state}) {

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
        },
        content: [
          {
            type: 'row',
            content: [
              {
                type: 'column',
                width: 70,
                content: [
                  {
                    id: 0,
                    type: 'stack',
                    height: 70,
                    content: [
                      {
                        id: 0,
                        type: 'component',
                        isClosable: false,
                        componentName: 'commonComponent',
                        componentState: {},
                      },
                    ]
                  },
                  {
                    id: 1,
                    type: 'stack',
                    content: []
                  }
                ]
              },
              {
                type: 'column',
                content: [
                  {
                    id: 2,
                    type: 'stack',
                    content: []
                  },
                  {
                    id: 3,
                    type: 'stack',
                    content: []
                  },
                  {
                    id: 4,
                    type: 'stack',
                    content: []
                  }
                ]
              }
            ]
          }
        ]
      };

      function generateStacks() {
        console.log('layout generateStacks');
        const typeMap = {
          html: 'Data',
          treemap: 'Treemap',
          wallets: 'Wallets',
          default: 'Default',
          exchanges: 'Exchanges',
          tradingview: 'Chart'
        }
        const stacks = {};
        for (const [sid, arr] of Object.entries(state.window)) {
          sid = +sid;
          if (sid === 0) {
            arr = [arr];
          }
          for (const value of arr) {

            const id = value.id;

            const data = refs.rowData.find(v => v.id === value.rowId);
            let title;
            if (data) {
              const name = data['cc-total-vol-full-FullName'].value;
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
              sid,
              title,
              type: 'component',
              componentName: 'commonComponent',
              componentState: {
                id,
                sid,
                type,
                ...colId && {colId},
                ...rowId && {assetId: rowId}
              }
            }
            if (!stacks[sid]) stacks[sid] = [];
            stacks[sid].push(newItem);
          }
        }
        return stacks;
      }

      const stacks = generateStacks();
      for (const val of iterateStacks(config.content)) {
        val.content = stacks[val.id] || [];
      }

      let layout = new GoldenLayout(config, container);
      layout.registerComponent('commonComponent', function(container, componentState) {
        container.getElement().html(`<div id=gadget-container-${componentState.id}></div>`);
      });
      layout.on('selectionChanged', function (selection) {});
      layout.on('itemCreated', function (item) {});
      layout.on('componentCreated', function (component) {
        component.container.on('resize',function() {
          console.log('component.resize', component.componentName);
          const sid = component.config.sid;
          bo.inst.gadgets.manager.resize(sid);
        });
      });
      layout.on('rowCreated', function (row) {});
      layout.on('columnCreated', function (column) {});
      layout.on('stackCreated', function (stack) {
        const sid = stack.contentItems[0].config.sid;
        stack.element[0].setAttribute('data-sid', sid);
        stack.config.sid = sid;
      });
      layout.on('tabCreated', function (tab) {
        tab.contentItem.element[0].setAttribute('data-id', tab.contentItem.config.id);
        const config = tab.contentItem.config;
        bo.inst.gadgets.manager.loadTabGadget(config);
      });
      layout.on('itemDestroyed', function (item) {});
      layout.on('initialised', function (something) {
        console.log('layout initialized');
      });

      layout.on('urlChanged', function () {});

      layout.on('newTab', event => {
        // const webview = event.target;
        // const url = event.url;
        // const id = getRandomInt(0, 9999999999);
        // let stack;
        // golden_layout._getAllContentItems().forEach(item => {
        //     item.contentItems.forEach(citem => {
        //         if ($(webview).data('id') === citem.config.id) {
        //             stack = item;
        //         }
        //     });
        // });
        // stack.addChild({
        //     id,
        //     type: 'component',
        //     componentName: 'default',
        //     componentState: {id, url, title: ''}
        // });
      });

      layout.on('stateChanged', () => {
        console.log('state changed');
        if (!bo.agOptions.api) return;
        this.save(layout);
        // vm.last_change = +new Date();
        // setTimeout(() => {
        //     vm.save({
        //         layout: golden_layout.toConfig().content,
        //         id: vm.id,
        //         title
        //     });
        // }, 2000);
        // // const config = {
        // //     layout: golden_layout.toConfig().content,
        // //     title,
        // //     id
        // // }
        // // akakor.api.save(config, id).then(new_id => {
        // //     if (id !== new_id) {
        // //         window.akakor.bus.$emit('NEW_LAYOUT_CREATED', id, Object.assign(config, {
        // //             id: new_id
        // //         }));
        // //         id = new_id;
        // //     }
        // // });
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
          bo.inst.state.set(`window.${sid}`, {id, type: 'default'}, 'push');
        });
        stack.header.controlsContainer.prepend($html);
      });

      $(window).on('resize', event => {
        layout.updateSize();
      });

      layout.init();
      return layout;

    }

    save(layout) {
      const config = layout.toConfig().content;
      bo.inst.state.set('layout', JSON.stringify(config));
      // const vm = this;
      // const current_time = +new Date();
      // if ((current_time - vm.last_change) < 2000) return;
      // akakor.api.save(config, vm.id).then(new_id => {
      //     if (vm.id !== new_id) {
      //         window.akakor.bus.$emit('NEW_LAYOUT_CREATED', vm.id, Object.assign(config, {
      //             id: new_id
      //         }));
      //         vm.id = new_id;
      //     }
      // });
    }

}
