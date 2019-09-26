module.exports = class PostCompile {

  constructor(func) {
    this.func = func
  }

  apply(compiler) {
    const handler = stats => {
      if (typeof this.func === 'function') {
        this.func(stats)
      }
    }

    if (compiler.hooks) {
      compiler.hooks.done.tap('post-compile-webpack-plugin', handler)
    } else {
      compiler.plugin('done', handler)
    }
  }

}
