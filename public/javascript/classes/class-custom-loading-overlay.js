export default class CustomLoadingOverlay {

  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `
      <div class="ag-overlay-loading-center">
        <img src="/images/binaryoverdose-loading-64x64.gif" width="48" height="48" />
        <br />
        <i>${params.loadingMessage}</i>
      </div>
    `;
  }

  getGui() {
    return this.eGui;
  }

};
