'use strict';

module.exports = class PreBuild {

  constructor(func) {
    this.func = func;
  }

  apply(compiler) {
    compiler.plugin('beforeRun', () => {
      if (typeof this.func === 'function') {
        this.func();
      }
    });
  }

}
