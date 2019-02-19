const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('page', resolve('src/page'))
      .set('common', resolve('src/common'))
      .set('component', resolve('src/component'))
  },
  devServer: {
    proxy: {
      '/dmp': {
        target: 'http://172.16.0.148:20003'
      }
    }
  }
}