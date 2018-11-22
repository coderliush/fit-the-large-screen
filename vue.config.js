const path = require('path')
const px2rem = require('postcss-px2rem')
const postcss = px2rem({
  remUnit: 32   //基准大小 baseSize，需要和rem.js中相同
})
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('common', resolve('src/common'))
      .set('component', resolve('src/component'))
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  }
}

