'use strict';

export default class Selector {

  constructor(sourceElement, destinationElement, source, destination, frozen) {

    this.delimiter = ': ';

    // Source
    this.initSource = false;
    this.sourceTree = sourceElement;
    this.$sourceTree = $(this.sourceTree);
    this.sourceOptions = this.getSourceOptions();
    this.sourceOptions.init = () => this.initSource = true;
    this.sourceOptions.source = source;
    $(this.sourceTree).fancytree(this.sourceOptions);

    // Destination
    this.initDest = false;
    this.destinationTree = destinationElement;
    this.$destinationTree = $(this.destinationTree);
    this.destinationOptions = this.getDestinationOptions();
    this.destinationOptions.init = () => this.initDest = true;

    for (const d of destination) {
      d = this.createDestinationItem(d);
    }

    this.destinationOptions.source = destination;
    $(this.destinationTree).fancytree(this.destinationOptions);

    // Frozen
    this.frozen = frozen;

    this.init();

  }

  createDestinationItem(d) {

    const hide = !!d.hide;

    const hideChild = {
      key: `hide-${d.key}`,
      title: `<span><label><input type="checkbox"${hide ? ' checked' : ''}>Hide</label></span>`,
      extraClasses: 'bo-edit-item'
    };

    d.extraClasses = `${hide ? ' bo-edit-item-hide' : 'bo-edit-item-show'}`;
    d.folder = true;
    d.children = [hideChild];

    const isCustom = /^c-\d{1,4}$/.test(d.key);
    if (isCustom) {
      d.children.push({
        key: `hide-custom-${d.key}`,
        title: `<span>Custom yo</span>`,
        extraClasses: 'bo-edit-item'
      });
    }
    return d;
  }


  /**
   *
   * Wait for both fancy trees to be initialised before binding event listeners
   * and completeing other works
   *
   */
  init() {
    if (this.initSource && this.initDest) {
      this.sourceTree.addEventListener('click', event => this.checkboxHandler(event), false);
      this.sourceTree.addEventListener('matches', event => this.checkboxHandler(event), false);
      this.destinationTree.addEventListener('click', this.destinationClickHandler, false);
      this.initDestinationButtons();
      this.dropHandler();
      this.initFilter();
    }
    else {
      setTimeout(() => this.init(), 100);
    }
  }

  initFilter() {

    //
    // TODO: Create close method and unbind these handlers
    //

    const ft = $('#tree').fancytree('getTree');
    const input = document.querySelector('.BO-edit-dialogue .bo-search input');
    const matches = document.querySelector('.BO-edit-dialogue .bo-matches');
    const btnAddMatches = document.querySelector('.BO-edit-dialogue .bo-add-matches');
    const btnClearMatches = document.querySelector('.BO-edit-dialogue .bo-clear-matches');
    const btnClearFilter = document.querySelector('.BO-edit-dialogue .bo-search .fa-window-close');

    // filter input
    input.onkeyup = () => {
      const filter = input.value.toUpperCase();
      matches.textContent = ft.filterNodes(filter) || 0;
      if (matches.textContent === '0') {
        btnClearMatches.classList.add('bo-btn-disabled');
        btnAddMatches.classList.add('bo-btn-disabled');
      }
      else {
        btnClearMatches.classList.remove('bo-btn-disabled');
        btnAddMatches.classList.remove('bo-btn-disabled');
      }
    }

    // Clear filter input button
    btnClearFilter.onclick = () => {
      input.value = '';
      matches.textContent = 0;
      ft.clearFilter();
      btnClearMatches.classList.add('bo-btn-disabled');
      btnAddMatches.classList.add('bo-btn-disabled');
    };

    // Add / Clear matches buttons
    for (const args of [[btnClearMatches, false], [btnAddMatches, true]]) {
      args[0].onclick = () => {
        let item;
        const list = document.querySelectorAll('.fancytree-match .fancytree-checkbox');
        const matches = [];
        for (item of list) {
          const checked = item.classList.contains('fa-check-square');
          if (checked !== args[1]) {
            matches.push(item.parentElement.textContent);
          }
        }
        item.dispatchEvent(new CustomEvent('matches', {
          bubbles: true,
          detail: {
            matches,
            select: args[1]
          }
        }));
      };
    }
  }

  initDestinationButtons() {
    const btnClearSelections = document.querySelector('.BO-edit-dialogue .bo-clear-selections');
    const btnAddCustom = document.querySelector('.BO-edit-dialogue .bo-add-custom');
    btnClearSelections.onclick = () => {
      this.checkboxHandler(new CustomEvent('clear'));
    };
    btnAddCustom.onclick = () => {
      this.addCustom();
    };
  }

  /**
   *
   *
   */
  addCustom() {
    const $destT = $('#tree2').fancytree('getTree');
    $destT.rootNode.addNode({key: 'custom-1', title: 'Custom colum 1'});
    document.querySelector('#tree2 li:last-child').scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
  }

  get() {
    const output = [];
    let frozen = this.frozen;
    let active = this.$destinationTree.fancytree('getTree').toDict();
    for (const type of [frozen, active]) {
      type.forEach(v => {
        const obj = {
          id: v.key,
          hide: v.data && v.data.hide
        };
        output.push(obj);
      });
    }
    return output;
  }

  /**
   *
   * Default source fancytree options
   *
   */
  getSourceOptions() {
    const options = {
      extensions: ['dnd5', 'glyph', 'filter'],
      treeId: '1',
      nodata: 'No data',
      icon: false,
      checkbox: true,
      //
      // TODO: Add information icon
      //
      // icon: function(event, data) {
      //  var node = data.node;
      //  // Create custom icons
      //  if( node.data.refType === "foo" ) {
      //    return "foo-icon-class";
      //  }
      clickFolderMode: 3,
      filter: {         // override default settings
        autoExpand: true,
        leavesOnly: true,
        hideExpanders: true,
        highlight: true,
        counter: false, // No counter badges
        mode: 'hide'    // "dimm": Grayout unmatched nodes, "hide": remove unmatched nodes
      },
      glyph: {
        preset: 'awesome5',
        map: {
          dropMarker: 'fas fa-angle-double-right',
          // folder: "fa-folder",
          // folderOpen: "fa-folder-open"
          // nodata: 'fas fa-meh',
        }
      },
      dnd5: {
        preventForeignNodes: true,       // Prevent dropping nodes from another Fancytree
        preventNonNodes: true,           // Prevent dropping items other than Fancytree nodes
        preventRecursion: true,          // Prevent dropping nodes on own descendants when in move-mode
        preventSameParent: true,         // Prevent dropping nodes under same direct parent
        preventVoidMoves: true,          // Prevent moving nodes 'before self', etc.
        scroll: true,                    // Enable auto-scrolling while dragging
        dragStart: function(node, data) {
          data.effectAllowed = 'copyMove';
          data.dropEffect = 'copy';
          return true;
        },
      },
    }
    return options;
  }

  /**
   *
   * Default destination fancytree options
   *
   */
  getDestinationOptions() {
    const options = {
      extensions: ['dnd5', 'glyph'],
      treeId: '2',
      nodata: 'No data',
      icon: false,
      checkbox: false,
      clickFolderMode: 3,
      renderNode: (event, data) => {

        const node = data.node;
        const $nodeSpan = $(node.span);
        const isNode = !node.extraClasses.split(' ').includes('bo-edit-item');

        if (isNode && !$nodeSpan.data('rendered')) {

          const $deleteButton = $('<i class="fas fa-window-close"></i>');

          $nodeSpan.append($deleteButton);
          $deleteButton.hide();

          $nodeSpan
            .hover(
              () => $deleteButton.show(),
              () => $deleteButton.hide()
            );

          $deleteButton.click(
            event => {

              // Remove from source
              const [groupName, leafName] = node.title.split(this.delimiter);
              this.$sourceTree.fancytree('getTree').visit(n => {
                if (n.folder) {
                  if (n.title === groupName) {
                    for (var c of n.children) {
                      if (c.title === leafName) {
                        c.setSelected(false);
                      }
                    }

                  }
                }
              });

              // Remove from destination
              let nodeToRemove;
              this.$destinationTree.fancytree('getTree').visit(n => {
                if (n.title === node.title) nodeToRemove = n;
              });
              nodeToRemove.remove();

            }
          );

          $nodeSpan.data('rendered', true);

        }
      },
      glyph: {
        preset: 'awesome5',
        map: {}
      },
      dnd5: {
        dropMarkerOffsetX: -4,           // absolute position offset for .fancytree-drop-marker
        dropMarkerInsertOffsetX: 0,      // additional offset for drop-marker with hitMode = 'before'/'after'
        preventNonNodes: true,           // Prevent dropping items other than Fancytree nodes
        preventRecursion: true,          // Prevent dropping nodes on own descendants when in move-mode
        preventSameParent: false,         // Prevent dropping nodes under same direct parent
        preventVoidMoves: true,          // Prevent moving nodes 'before self', etc.
        dragStart: (node, data) => {
          data.effectAllowed = 'move';
          data.dropEffect = data.dropEffectSuggested;
          return true;
        },
        dragEnter: (node, data) => {
          return ['before', 'after'];
        },
        dragOver: (node, data) => {
          return false;
        },
        dragDrop: (node, data) => {

          const sourceNodes = data.otherNodeList;
          const destNode = data.hitMode === 'after' ? node : node.getPrevSibling();
          const existingFields = node.tree.toDict().map(v => v.title);

          data.originalEvent.preventDefault(); // don't open links, files

          if (data.hitMode === 'after') {
            // If node are inserted directly after tagrget node one-by-one,
            // this would reverse them. So we compensate:
            sourceNodes.reverse();
          }
          else if (data.hitMode === 'over') {
            return false
          }

          if (data.otherNode) {
            const sameTree = data.otherNode.tree === data.tree;

            if (sameTree) {
              data.otherNode.moveTo(node, data.hitMode);
            }
            else if (data.otherNodeData.folder) {
              const nodes = sourceNodes[0].getChildren();
              let groupTitle = data.otherNode.title;
              let i = nodes.length;
              while (i--) {
                const title = `${groupTitle}${this.delimiter}${nodes[i].title}`;
                const key = nodes[i].key;
                if (!existingFields.includes(title)) {
                  destNode.appendSibling({key, title});
                }
              }
            }
            else {
              let groupTitle = data.otherNode.parent.title;
              const title = `${groupTitle}${this.delimiter}${data.otherNode.title}`;
              const key = data.otherNode.key;
              if (!existingFields.includes(title)) {
                destNode.appendSibling({key, title});
              }
            }

          }

          node.setExpanded();
          this.dropHandler();

        },
      },
    }
    return options;
  }

  /**
   *
   *
   */
  static setFolderCheckbox(node) {
    let count = 0;
    for (const childNode of node.children) {
      if (childNode.selected) count++;
    }
    if (count === node.children.length) {
      node.partsel = false;
      node.selected = true;
      node.render();
    }
    else if (count > 0 && count < node.children.length) {
      node.selected = false;
      node.partsel = true;
      node.render();
    }
    else {
      node.selected = false;
      node.partsel = false;
      node.render();
    }
  }

  /**
   *
   * Sync source fancytree checkboxes after a drop event
   *
   */
  dropHandler() {
    const selected = this.$destinationTree.fancytree('getTree').toDict().map(v => v.title);
    this.$sourceTree.fancytree('getTree').visit(node => {
      const folderNodes = new Set();
      if (node.folder) {
        folderNodes.add(node);
        for (const childNode of node.children) {
          if (selected.includes(`${node.title}${this.delimiter}${childNode.title}`)) {
            childNode.setSelected(true);
          }
        }
      }
      for (const folderNode of folderNodes.values()) {
        Selector.setFolderCheckbox(folderNode);
      };
    });
  }

  /**
   *
   * Fires when a destination item is clicked
   *
   */
  destinationClickHandler(event) {

    event.stopPropagation();

    const $destT = $('#tree2').fancytree('getTree');
    const isEditPanel = event.target.closest('.bo-edit-item') !== null;
    if (isEditPanel) {
      const title = event.target.closest('ul').parentElement.querySelector('.fancytree-title').textContent;
      const checkbox = event.target.closest('.bo-edit-item input[type="checkbox"]');
      const hide = checkbox && checkbox.checked;
      $destT.visit(n => {
        if (n.title === title) {
          n.data.hide = !!hide;
        };
      });
    }

  }

  /**
   *
   * Sync destination fancytree after a source fancytree checkbox click
   * Also manage some updates to the source checkboxes based on node clicks
   *
   */
  checkboxHandler(event) {

    function updateLeafNode(context, node, clickedNode) {
      const title = `${node.parent.title}: ${node.title}`;
      const key = node.key;
      if (node.isSelected()) {
        // add node
        if (!destSelections.includes(title)) {
          const newItem = context.createDestinationItem({key, title});
          $destT.rootNode.addNode(newItem);
        }
      }
      else {
        // remove node
        if ($destT.rootNode.children) {
          const n = $destT.rootNode.children.filter(v => v.title === title);
          if (n.length) {
            n[0].remove();
          }
        }
      }
    }

    function updateFolderNode(node, clickedNode) {
      if (node.isSelected()) {
        // check all children
        for (const childNode of node.children) {
          childNode.setSelected(true);
        }
      }
      else {
        const parentClicked = (clickedNode.children || []).map(v => v.title).includes(node.title);
        const isTargetFolder = node.title === event.target.closest('.fancytree-folder').textContent;
        if (parentClicked || isTargetFolder) {
          // uncheck all children
          for (const childNode of node.children) {
            childNode.partsel = false;
            childNode.setSelected(false);
          }
          node.selected = false;
          node.partsel = false;
          node.render();
        }
      }
    }

    const $sourceT = this.$sourceTree.fancytree('getTree');
    const $destT = this.$destinationTree.fancytree('getTree');
    const destSelections = ($destT.toDict() || []).map(v => v.title);

    const target = event.target;
    let clickedNode;
    let targetIsCheckbox;
    let targetIsFolder;
    if (target) {
      clickedNode = $sourceT.toDict().filter(v => v.title === target.parentElement.textContent)[0];
      targetIsCheckbox = $(target).hasClass('fancytree-checkbox');
      targetIsFolder = !!target.closest('.fancytree-folder');
    }

    if (event.type === 'clear') {
      $sourceT.visit(node => {
        if (!node.folder) {
          node.setSelected(false);
        }
      });
    }

    if (event.type === 'matches') {
      $sourceT.visit(node => {
        if (!node.folder) {
          const { select, matches } = event.detail;
          for (const match of matches) {
            if (match === node.title) {
              node.setSelected(select ? true : false);
            }
          }
        }
      });
    }

    if (targetIsFolder && targetIsCheckbox) {
      $sourceT.visit(node => {
        if (node.folder) {
          updateFolderNode(node, clickedNode);
        }
        else {
          updateLeafNode(this, node, clickedNode);
        }
      });
    }
    else {
      $sourceT.visit(node => {
        const folderNodes = new Set();
        if (!node.folder) {
          updateLeafNode(this, node, clickedNode);
          folderNodes.add(node.parent);
        }
        for (const folderNode of folderNodes.values()) {
          Selector.setFolderCheckbox(folderNode);
        };
      });
    }

  }

}
