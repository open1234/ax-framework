'use strict'

// node.js路径模块，作用是连接路径
const path = require('path')
// 配置文件模块
const config = require('../config')
// extract-text-webpack-plugin插件，作用是将bundle中的css等文件单独产出bundle文件
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 引入package.json文件
const packageConfig = require('../package.json')

// 返回一个干净的相对跟路径
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'dev'
    ? config.dev.assetsSubDirectory
    : config.build.assetsSubDirectory
  //path.join和path.posix.join的区别：前者返回完整路径，后者返回完整路径的相对根路径
  return path.posix.join(assetsSubDirectory, _path)
}

// 导出cssLoaders的相关配置
exports.cssLoaders = function (options) {
  // options如果没值就是空对象
  options = options || {}

  // cssLoader的基本配置
  const cssLoader = {
    loader: 'css-loader',
    options: {
      // 是否开启cssmap
      sourceMap: options.sourceMap
    }
  }

  // postcssLoader的基本配置
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      // 是否开启cssmap
      sourceMap: options.sourceMap
    }
  }

  // 生成最终读取和导入loader，来处理对应类型的文件
  function generateLoaders (loader, loaderOptions) {
    // 根据是否使用PostCSS，来选择基础加载器
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    // 如果该函数传递了单独的loader就加到这个loaders数组里面，这个loader可能是less，sass之类的
    if (loader) {
      loaders.push({
        // 加载对应的loader
        loader: loader + '-loader',
        // Object.assign是ES6的方法，主要用来合并对象，浅拷贝
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // extract可以在options里配置，当为true时就把文件单独提取，false时不单独提取
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(), // css对应vue-style-loader和css-loader
    postcss: generateLoaders(), // postcss对应vue-style-loader和css-loader
    less: generateLoaders('less'), // less对应vue-style-loader和less-loader
    sass: generateLoaders('sass', { indentedSyntax: true }), // sass对应vue-style-loader和sass-loader
    scss: generateLoaders('sass'), // scss对应vue-style-loader和sass-loader
    stylus: generateLoaders('stylus'), // stylus对应vue-style-loader和stylus-loader
    styl: generateLoaders('stylus') // styl对应vue-style-loader和styl-loader
  }
}

// 处理import这种方式导入的文件类型打包
exports.styleLoaders = function (options) {
  const output = []
  // 生成的各种css文件的loader对象
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    // 把每一种文件的laoder都提取出来
    const loader = loaders[extension]
    output.push({
      // 把最终的结果都push到output数组中
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
