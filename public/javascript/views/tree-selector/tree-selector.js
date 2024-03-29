'use strict';

import initPug from '../../generated/init-pug.generated.js';
import isValidCustomCalculation from '../../utils/is-valid-custom-calculation.js';
import segment from '../../utils/segment.js';

export default class Selector {

  constructor(sourceElement, destinationElement, source, destination, frozen, errorHandler) {

    this.delimiter = ': ';
    this.errorHandler = errorHandler;

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
      this.nodeGenerate(d, destination);
    }

    this.destinationOptions.source = destination;
    $(this.destinationTree).fancytree(this.destinationOptions);

    // Frozen
    this.frozen = frozen;

    this.init();

    this.destinationTree.addEventListener('scroll', event => {
      this.lastScrollTop = event.srcElement.scrollTop;
    });

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
      this.destinationTree.addEventListener('click', event => this.destinationClickHandler(this, event), false);
      this.initDestinationButtons();
      this.dropHandler();
      this.initFilter();
    }
    else {
      setTimeout(() => this.init(), 100);
    }
  }

  /**
   *
   * Text filter
   *
   */
  initFilter() {

    //
    // TODO: Create close method and unbind these handlers
    //

    const ft = $('#tree').fancytree('getTree');
    const input = document.querySelector('.BO-edit-dialogue .bo-search input');
    const matches = document.querySelectorAll('.BO-edit-dialogue .bo-matches');
    const btnAddMatches = document.querySelector('.BO-edit-dialogue .bo-add-matches');
    const btnClearMatches = document.querySelector('.BO-edit-dialogue .bo-clear-matches');
    const btnClearFilter = document.querySelector('.BO-edit-dialogue .bo-search .fa-window-close');

    // filter input
    input.onkeyup = () => {
      const filter = input.value.toUpperCase();
      matches[0].textContent = matches[1].textContent = ft.filterNodes(filter) || 0;
      if (matches[0].textContent === '0') {
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
      matches[0].textContent = matches[1].textContent = 0;
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
          const checked = item.closest('.fancytree-node').classList.contains('fancytree-selected')
          if (checked !== args[1]) {
            matches.push(item.parentElement.querySelector('.fancytree-title').textContent);
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

  /**
   *
   * Destination tree buttons
   *
   */
  initDestinationButtons() {
    const btnClearSelections = document.querySelector('.BO-edit-dialogue .bo-clear-selections');
    const btnAddCustom = document.querySelector('.BO-edit-dialogue .bo-add-custom');
    btnClearSelections.onclick = () => {
      this.checkboxHandler(new CustomEvent('clear'));
      segment.allSelectionsCleared();
    };
    btnAddCustom.onclick = () => {
      this.addCustom();
      segment.addCustomColumnStarted();
    };
  }

  /**
   *
   * Is Valid Custom Node
   *
   */
  checkValidCustomNode(node, subset) {

    let isValid = true;

    const $ft = $('#tree2').fancytree('getTree');
    const custom = node.li.querySelector('.bo-custom');
    const $itemNode = $ft.getNodeByKey(custom.dataset.id);

    const title = node.li.querySelector('.bo-step1 input');
    const sources = node.li.querySelector('.bo-overselect');
    const textarea = node.li.querySelector('textarea');

    const type = custom.querySelector('.bo-step3 select').value;
    const titleValue = title.value;
    const textareaValue = textarea.value;
    const selectedSources = Array.from(node.li.querySelectorAll('.bo-checkboxes input:checked')).map(v => v.dataset.source);
    const isValidCalc = isValidCustomCalculation(textareaValue);


    if (!titleValue) {
      title.classList.add('bo-error');
    }
    else {
      title.classList.remove('bo-error');
    }

    if (!selectedSources.length) {
      sources.classList.add('bo-error');
    }
    else {
      sources.classList.remove('bo-error');
    }

    if (!isValidCalc || !textareaValue) {
      textarea.classList.add('bo-error');
    }
    else {
      textarea.classList.remove('bo-error');
    }

    if (!isValidCalc || !textareaValue || !selectedSources.length || !titleValue || !type) {
      isValid = false;
      $itemNode.addClass('bo-edit-item-error');
    }
    else {
      $itemNode.removeClass('bo-edit-item-error');
    }

    return isValid;

  }

  /**
   *
   * Get current selections
   *
   */
  get() {

    const invalid = [];

    // Get updated data
    const lis = document.querySelectorAll('#tree2 ul[role=group] li');
    const ft = $('#tree2').fancytree('getTree');
    for (const li of lis) {
      const options = li.querySelector('.bo-options');
      const custom = li.querySelector('.bo-custom');
      if (options) {
        const id = options.dataset.id;
        if (id) {
          const node = ft.getNodeByKey(id);
          const hide = options.querySelector('.bo-hide input').checked;
          node.data.hide = hide;
        }
      }
      if (custom) {
        const id = custom.dataset.id;
        if (id) {
          const node = ft.getNodeByKey(id);
          const calc = custom.querySelector('textarea').value;
          const type = custom.querySelector('.bo-step3 select').value;
          const title = custom.querySelector('.bo-step1 input').value;
          const sources = Array.from(custom.querySelectorAll('.bo-checkboxes input:checked')).map(v => v.dataset.source);
          const isValid = this.checkValidCustomNode(node);
          if (!isValid) {
            invalid.push(node);
          }
          node.data.calc = calc;
          node.data.sources = sources;
          node.data.headerName = title;
          node.data.type = type;
        }
      }
    }

    // Generate columns
    const output = [];
    let frozen = this.frozen || [];
    let active = this.$destinationTree.fancytree('getTree').toDict() || [];
    for (const type of [frozen, active]) {
      type.forEach(v => {
        const obj = {
          id: v.key
        };
        if (v.data) {
          obj.hide = v.data.hide;
          if (v.data.custom) {
            obj.calc = v.data.calc;
            obj.sources = v.data.sources;
            obj.type = v.data.type;
            obj.headerName = v.data.headerName;
          }
        }
        output.push(obj);
      });
    }

    if (invalid.length) {
      return {error: true, errorNodes: invalid};
    }
    else {
      return output;
    }

  }

  /**
   *
   * Default source fancytree options
   *
   */
  getSourceOptions() {
    const options = {
      keyboard: false,
      extensions: ['dnd5', 'filter', 'childcounter'],
      treeId: '1',
      nodata: 'No data',
      icon: true,
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
      childcounter: {
        deep: true,
        hideZeros: true,
        hideExpanded: false
      },
      loadChildren(event, data) {
        // update node and parent counters after lazy loading
        data.node.updateCounters();
      },
      filter: {         // override default settings
        autoExpand: true,
        leavesOnly: true,
        hideExpanders: true,
        highlight: true,
        counter: false, // No counter badges
        mode: 'hide'    // "dimm": Grayout unmatched nodes, "hide": remove unmatched nodes
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
      keyboard: false,
      extensions: ['dnd5'],
      treeId: '2',
      nodata: 'No data',
      icon: false,
      checkbox: false,
      clickFolderMode: 3,
      collapse: (event, data) => {},
      modifyChild: (event, node) => {
        if (event.type === 'modifyChild') {
          const treeElement = document.querySelector('#tree2');
          const containerElement = document.querySelector('.BO-edit-dialogue .bo-total-selected');
          const numberOfColumns = treeElement.querySelectorAll(':scope > ul > li').length;
          treeElement.scrollTop = this.lastScrollTop;
          containerElement.innerHTML = numberOfColumns;
        }
      },
      renderNode: (event, data) => {

        const context = this;
        const node = data.node;
        // const isNode = !node.extraClasses.split(' ').includes('bo-edit-item');
        const $nodeSpan = $(node.span);
        const $nodeLi = $(node.li);

        if (!$nodeSpan.data('rendered')) {

          const $deleteButton = $('<i class="fas fa-window-close"></i>');

          $nodeSpan.append($deleteButton);
          $deleteButton.hide();

          $nodeSpan
            .hover(
              () => $deleteButton.show(),
              () => $deleteButton.hide()
            );

          $nodeLi.on('input click', '.bo-custom', () => {
            this.checkValidCustomNode(node, 'textarea');
          });

          $deleteButton.click(
            event => {

              event.stopPropagation();

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
      dnd5: {
        dropMarkerOffsetX: -28,          // absolute position offset for .fancytree-drop-marker
        dropMarkerInsertOffsetX: 0,      // additional offset for drop-marker with hitMode = 'before'/'after'
        preventNonNodes: true,           // Prevent dropping items other than Fancytree nodes
        preventRecursion: true,          // Prevent dropping nodes on own descendants when in move-mode
        preventSameParent: false,        // Prevent dropping nodes under same direct parent
        preventVoidMoves: true,          // Prevent moving nodes 'before self', etc.
        dragStart: (node, data) => {
          data.effectAllowed = 'move';
          data.dropEffect = data.dropEffectSuggested;
          return true;
        },
        dragEnter: (node, data) => {

          // Only allow changing order
          let allowDrop;
          const hasSameParent = node.parent === data.otherNode.parent;
          const isOpen = node.span.classList.contains('fancytree-expanded')
          const isSameTree = node.tree.rootNode.key === data.otherNode.tree.rootNode.key;

          if (isSameTree) {
            if (hasSameParent && isOpen) {
              allowDrop = ['before', 'after'];
              data.effectAllowed = 'move';
              data.dropEffect = 'move';
            }
            else if (hasSameParent && !isOpen) {
              allowDrop = ['before'];
              data.effectAllowed = 'move';
              data.dropEffect = 'move';
            }
            else if (!hasSameParent) {
              allowDrop = false;
            }
          }
          else {
            if (isOpen) {
              allowDrop = ['before', 'after'];
              data.effectAllowed = 'copyMove';
              data.dropEffect = 'copy';
            }
            else {
              allowDrop = ['before'];
              data.effectAllowed = 'copyMove';
              data.dropEffect = 'copy';
            }
          }


          return allowDrop;

        },
        dragOver: (node, data) => {
          return false;
        },
        // dragExpand: function(node, data) {
        //   return false;
        // },
        dragDrop: (node, data) => {

          data.originalEvent.stopPropagation();
          data.originalEvent.preventDefault();

          const sourceNodes = data.otherNodeList;
          const destNode = data.hitMode === 'after' ? node : node.getPrevSibling();
          const existingFields = node.tree.toDict().map(v => v.title);

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
                const headerName = nodes[i].title;
                const key = nodes[i].key;
                if (!existingFields.includes(title)) {
                  const hideChild = Selector.createOptionsChild(node);
                  destNode.appendSibling({
                    key,
                    title,
                    children: [hideChild],
                    extraClasses: 'bo-edit-item-show',
                    folder: true,
                    data: {
                      headerName
                    }
                  });
                }
              }
            }
            else {
              let groupTitle = data.otherNode.parent.title;
              const title = `${groupTitle}${this.delimiter}${data.otherNode.title}`;
              const headerName = data.otherNode.title;
              const key = data.otherNode.key;
              if (!existingFields.includes(title)) {
                const hideChild = Selector.createOptionsChild(node);
                destNode.appendSibling({
                  key,
                  title,
                  children: [hideChild],
                  extraClasses: 'bo-edit-item-show',
                  folder: true,
                  data: {
                    headerName
                  }
                });
              }
            }

          }

          this.dropHandler();

        },
      },
    }
    return options;
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
  destinationClickHandler(context, event) {

    event.stopPropagation();

    const target = event.target
    const group = target.closest('ul[role=group]');
    const folder = group
      ? group.closest('li').querySelector('.fancytree-folder')
      : target.closest('.fancytree-folder');
    const container = target.closest('.fancytree-title');

    if (container === null) return;

    const $destT = $('#tree2').fancytree('getTree');
    const custom = folder.closest('li').querySelector('.bo-custom');
    const options = folder.closest('li').querySelector('.bo-options');

    const id = custom ? custom.dataset.id : options.dataset.id;
    const node = $destT.getNodeByKey(id);

    // If is a custom column loop all previously new custom columns, check for errors and delete new flag
    // NOTE: shit, new custom starts with an error
    $destT.visit(n => {
      if (n.key !== node.key) {
        if (n.data.new && n.data.custom) {
          delete n.data.new;
          context.checkValidCustomNode(n);
        }
      }
    });
    if (custom) {
      node.data.new = true;
    }

    const isOptionsHide = target.parentElement.classList.contains('bo-hide');
    const isSelect = target.classList.contains('bo-overselect');
    const isChildOfSelect = target.closest('.BO-multiselect');
    const isCustomSources = target.parentElement.parentElement.classList.contains('bo-checkboxes');

    const checkboxes = container.querySelector('.BO-multiselect .bo-checkboxes');


    if (!isChildOfSelect && checkboxes) {
      checkboxes.style.display = 'none';
    }

    if (isCustomSources) {
      const checked = checkboxes.querySelectorAll('input:checked');
      const arr = Array.from(checked);
      let html = '';
      for (const [idx, checkElement] of Object.entries(arr)) {
        const title = checkElement.parentElement.textContent;
        html += `<li>c${idx} = ${title}</li>`;
      }
      container.querySelector('.bo-added').innerHTML = html;
      checkboxes.style.display = 'none';
    }

    if (isSelect) {
      const checkboxElement = target.parentElement.nextElementSibling;
      checkboxElement.style.display = checkboxElement.style.display === 'block'
        ? 'none'
        : 'block';
    }
    else if (isOptionsHide) {
      const title = target.closest('ul').parentElement.querySelector('.fancytree-title').textContent;
      const hide = target.checked;
      node.data.hide = !!hide;
      if (hide) {
        node.addClass('bo-edit-item-hide');
        node.removeClass('bo-edit-item-show');
      }
      else {
        node.removeClass('bo-edit-item-hide');
        node.addClass('bo-edit-item-show');
      }
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
      const headerName = node.title;
      const title = `${node.parent.title}: ${node.title}`;
      const key = node.key;
      if (node.isSelected()) {
        // add node
        if (!destSelections.includes(title)) {
          const columns = context.$destinationTree.fancytree('getTree').toDict();
          const newItem = context.nodeGenerate({key, title, data: {headerName}}, columns);
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
        const isTargetFolder = node.title === event.target.closest('.fancytree-folder').querySelector('.fancytree-title').textContent;
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
      clickedNode = $sourceT.toDict().filter(v => {
        return v.title === target.parentElement.querySelector('.fancytree-title').textContent;
      })[0];
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
      if (target && !targetIsCheckbox) {
        const selected = target.closest('.fancytree-selected');
        const node = $.ui.fancytree.getNode(target);
        node.setSelected(!selected);
      }
      const folderNodes = new Set();
      $sourceT.visit(node => {
        if (!node.folder) {
          updateLeafNode(this, node, clickedNode);
          folderNodes.add(node.parent);
        }
      });
      for (const folderNode of folderNodes.values()) {
        Selector.setFolderCheckbox(folderNode);
      };
    }

    // Segment Events
    if (target && !targetIsCheckbox) {
      const label = target.parentElement.querySelector('.fancytree-title').textContent;
      const state = target.classList.contains('fa-check-square') ? 'checked' : 'unchecked';
      const group = !!targetIsFolder;
      if (group) {
        if (state === 'checked') {
          segment.columnGroupSelected(label);
        }
        else {
          segment.columnGroupDeselected(label);
        }
      }
      else {
        if (state === 'checked') {
          segment.columnSelected(label);
        }
        else {
          segment.columnDeselected(label);
        }
      }
    }

  }

  /**
   *
   *
   */
  nodeGenerate(node, columns) {

    const hide = !!node.data.hide;
    node.extraClasses = `${hide ? ' bo-edit-item-hide' : 'bo-edit-item-show'}`;
    node.folder = true;

    const hideChild = Selector.createOptionsChild(node);
    node.children = [hideChild];

    const isCustom = /^c-\d{1,4}$/.test(node.key);
    if (isCustom) {
      const customChild = this.createCustomChild(node, columns);
      node.children.push(customChild);
    }

    return node;

  }


  /**
   *
   *
   */
  addCustom() {

    /**
     *
     * Get Name Idx
     *
     */
    const getNameIdx = function (prefix) {

      const regex = new RegExp(`^${prefix} \\d{1,2}$`);

      // Get current "new column x" numbers
      const nums = [];
      columns.forEach(v => {
        if (regex.test(v.data.headerName)) {
          nums.push(+v.data.headerName.split(`${prefix} `)[1]);
        }
      });

      // Find the first number that isnt used
      let i = 1;
      let result = null;
      while (!result && i < 100) {
        if (!nums.includes(i)) {
          result = i;
        }
        i++;
      }

      // This should only ever happen if someone is being a twat
      if (!result) {
        result = +new Date();
      }

      return result;
    }

    /**
     *
     * Get Custom column id number
     *
     */
    const getIdx = function () {

      const customCols = columns.filter(v => /^c-\d{1,2}/.test(v.key));
      const nums = customCols.map(v => +v.key.split('-')[1]);

      // Find the first number that isnt used
      let i = 1;
      let result = null;
      while (!result && i < 100) {
        if (!nums.includes(i)) {
          result = i;
        }
        i++;
      }

      // This should only ever happen if someone is being a twat
      if (!result) {
        result = +new Date();
      }

      return result;
    }

    const columns = this.$destinationTree.fancytree('getTree').toDict() || [];
    const prefix = 'New custom column';
    const nameIdx = getNameIdx(prefix);
    const headerName = `${prefix} ${nameIdx}`;

    const customColumnCount = getIdx();
    const newNode = {
      key: `c-${customColumnCount}`,
      title: `custom: ${headerName}`,
      data: {
        new: true,
        headerName,
        custom: true,
        sources: []
      }
    };
    const newItem = this.nodeGenerate(newNode, columns);
    const node = this.$destinationTree.fancytree('getTree').rootNode.addNode(newItem);
    node.setExpanded(true);
    this.destinationTree.querySelector('li:last-child').scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
  }

  /**
   *
   *
   */
  createCustomChild(node, columns) {

    const titles = [];

    columns = JSON.parse(JSON.stringify(columns));
    columns.forEach(val => {
      if (val.data.sources) {
        val.data.custom = true;
      }
      if (node.data.sources.includes(val.key)) {
        const idx = node.data.sources.indexOf(val.key);
        titles[idx] = val.title;
        val.selected = true;
      }
    });

    const id = node.key;
    const calc = node.data.calc;
    const type = node.data.type;
    const sources = node.data.sources;
    const title = node.title.split(this.delimiter)[1];
    const rand = Math.ceil(Math.random() * 100000);
    const html = initPug['tree-selector']({
      id,
      calc,
      rand,
      type,
      title,
      titles,
      sources,
      columns,
    });

    const child = {
      key: `hide-custom-${node.key}`,
      title: html.replace('[CALC]', node.data.calc || '').replace('[ID]', node.key),
      extraClasses: `bo-edit-item ${node.data.hide ? ' bo-edit-item-hide' : 'bo-edit-item-show'}`
    };

    return child;

  }

  /**
   *
   *
   */
  static createOptionsChild(node) {
    const hideChild = {
      key: `hide-${node.key}`,
      title: `
        <span class="bo-options" data-id="${node.key}">
          <h4>Options</h4>
          <label class="bo-hide">
            <input type="checkbox"${node.data.hide ? ' checked' : ''}>Hide
          </label>
        </span>
      `,
      extraClasses: `bo-edit-item bo-edit-item-${node.data.hide ? 'hide': 'show'}`
    };
    return hideChild;
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

}
