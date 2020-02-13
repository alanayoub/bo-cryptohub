import GoldenLayout from '../../libs/golden-layout/js/goldenlayout.js';

import style from './index.scss';

export default class Layout {

    constructor({container}) {

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
          headerHeight: 20,
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
                width: 80,
                content: [
                  {
                    type: 'component',
                    componentName: 'default',
                    componentState: {label: 'A'},
                    id: '1',
                    width: 80,
                    height: 80,
                    isClosable: false,
                    title: 'All Assets',
                    activeItemIndex: 1
                  },
                  {
                    type: 'component',
                    title: 'Test 0',
                    componentName: 'testComponent',
                    componentState: {label: 'B'}
                  },
                ]
              },
              {
                type: 'column',
                content: [
                  {
                    type: 'component',
                    title: 'Test 1',
                    componentName: 'testComponent',
                    componentState: {label: 'C'}
                  },
                  {
                    type: 'component',
                    title: 'Test 2',
                    componentName: 'testComponent',
                    componentState: {label: 'D'}
                  },
                  {
                    type: 'component',
                    title: 'Test 3',
                    componentName: 'testComponent',
                    componentState: {label: 'E'}
                  }
                ]
              }
            ]
          }
        ]
      };

      let layout = new GoldenLayout(config, container);
      layout.registerComponent('testComponent', function( container, componentState ){
        container.getElement().html( '<h2>' + componentState.label + '</h2>' );
      });
      layout.registerComponent('default', function( container, componentState ){
        container.getElement().html('<div id=ch-grid class=ag-theme-balham></div>');
      });

      layout.on('initialised', function () {});

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

      layout.on('stateChanged', function () {
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

      layout.on('stackCreated', function (stack) {
        // const $html = $(`
        //         <li class="a-add-tab">
        //             <i class="fa fa-plus-circle" aria-hidden="true"></i>
        //             New
        //         </li>
        //         <li class="a-divider"></li>
        // `);
        // $html.on('click', function (event) {
        //     const id = getRandomInt(0, 9999999999);
        //     stack.addChild({
        //         id,
        //         type: 'component',
        //         componentName: 'default',
        //         componentState: {id, title: '', url: ''}
        //     });
        // });
        // stack.header.controlsContainer.prepend($html);
      });

      $(window).on('resize', event => {
        layout.updateSize();
      });

      layout.init();
      return layout;

    }

    save(config) {
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
