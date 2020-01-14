import { webCookieGetCookieByName as getCookie } from '../libs/bo-utils-client';

const sId = getCookie('sId');
const debug = false;

/**
 *
 * Get the column changes from the saved state and the latest state
 *
 */
function getStateColsDiff(stateCols, selectorData) {
  const oldCols = stateCols.map(o => o.id).sort();
  const newCols = selectorData.map(o => o.id).sort();
  const numberOfCols = newCols.length;
  const numberOfHidden = selectorData.filter(o => o.hide === true).length;
  const numberOfCustom = selectorData.map(o => o.calc).filter(Boolean).length;
  let added = 0;
  let removed = 0;
  for (const col of oldCols) {
    if (!newCols.includes(col)) {
      removed++;
    }
  }
  for (const col of newCols) {
    if (!oldCols.includes(col)) {
      added++;
    }
  }
  const data = {
    number_of_columns: numberOfCols,
    number_of_columns_added: added,
    number_of_columns_removed: removed,
    number_of_hidden_columns: numberOfHidden,
    number_of_custom_columns: numberOfCustom
  }
  return data;
}

const aId = getCookie('aId');
analytics.ready(() => {
  analytics.user().anonymousId(aId);
});

/**
 *
 * Segment Events
 *
 */
export default {

  editStarted() {
    const data = {session_id: sId};
    window.analytics.track('Edit Started', data);
    if (debug) console.log('Edit Started', data);
  },

  editApplied(stateCols, selectorData) {
    const data = getStateColsDiff(stateCols, selectorData);
    data.session_id = sId;
    window.analytics.track('Edit Applied', data);
    if (debug) console.log('Edit Applied', data);
  },

  editAborted(stateCols, selectorData) {
    const data = getStateColsDiff(stateCols, selectorData);
    data.session_id = sId;
    window.analytics.track('Edit Aborted', data);
    if (debug) console.log('Edit Aborted', data);
  },

  columnSelected(label) {
    const data = {
      session_id: sId,
      column_name: label
    };
    window.analytics.track('Column Selected', data);
    if (debug) console.log('Column Selected', data);
  },

  columnDeselected(label) {
    const data = {
      session_id: sId,
      column_name: label
    };
    window.analytics.track('Column Deselected', data);
    if (debug) console.log('Column Deselected', data);
  },

  columnGroupSelected(label) {
    const data = {
      session_id: sId,
      column_group_name: label
    };
    window.analytics.track('Column Group Selected', data);
    if (debug) console.log('Column Group Selected', data);
  },

  columnGroupDeselected(label) {
    const data = {
      session_id: sId,
      column_group_name: label
    };
    window.analytics.track('Column Group Deselected', data);
    if (debug) console.log('Column Group Deselected', data);
  },

  allSelectionsCleared() {
    const data = {session_id: sId};
    window.analytics.track('All Selections Cleared', data);
    if (debug) console.log('All Selections Cleared', data);
  },

  addCustomColumnStarted() {
    const data = {session_id: sId};
    window.analytics.track('Add Custom Column Started', data);
    if (debug) console.log('Add Custom Column Started', data);
  },

  addCustomColumnAborted() {
  },

  columnHidden() {
  },

  columnUnhidden() {
  },

  columnSorted(sortModel) {
    const data = {
      session_id: sId,
      column_id: sortModel.colId,
      order: sortModel.sort
    };
    window.analytics.track('Column Sorted', data);
    if (debug) console.log('Column Sorted', data);
  },

  columnFiltered(model) {
    const data = Object.assign({session_id: sId}, model);
    window.analytics.track('Column Filtered', data);
    if (debug) console.log('Column Filtered', data);
  },

  columnWidthResized() {
    const data = {session_id: sId};
    window.analytics.track('Column Width Resized', data);
    if (debug) console.log('Column Width Resized', data);
  },

  columnMoved() {
    const data = {session_id: sId};
    window.analytics.track('Column Moved', data);
    if (debug) console.log('Column Moved', data);
  },

  homeLogoClicked() {
    const data = {session_id: sId};
    window.analytics.track('Home Logo Clicked', data);
    if (debug) console.log('Home Logo Clicked', data);
  },

  cellSelected(model) {
    const data = {
      name: model.name,
      row_id: model.rowId,
      column_id: model.columnId,
      session_id: sId,
      pop_div_type: model.popdivType
    };
    window.analytics.track('Home Logo Clicked', data);
    if (debug) console.log('Home Logo Clicked', data);
  },

  cellDeselected(model) {
    const data = {
      name: model.name,
      row_id: model.rowId,
      column_id: model.columnId,
      session_id: sId,
      pop_div_type: model.popdivType
    };
    window.analytics.track('Home Logo Clicked', data);
    if (debug) console.log('Home Logo Clicked', data);
  },

  scrolledTo500() {
  },

  scrolledTo1000() {
  },

  scrolledTo2000() {
  },
}
