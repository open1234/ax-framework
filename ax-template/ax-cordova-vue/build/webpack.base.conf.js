'use strict'

// node.js路径模块
const path = require('path')
// utils工具配置文件
const utils = require('./utils')
// 配置文件模块
const config = require('../config')
// 引入vue-loader.conf配置文件，用来解决各种css文件，定义了诸如css,less,sass等和样式有关的loader
const vueLoaderConfig = require('./vue-loader.conf')

// 此函数返回当前目录的平行目录路径，因为有个'..'
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// 创建eslint规则
const createLintingRule = () => ({
  // 对.js和.vue文件在编译前进行检测，检查有没有语法错误
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  // enforce: 'pre'选项可以确保eslint插件能够在编译之前检测
  enforce: 'pre',
  // include选项指明这些目录下的文件要被eslint-loader检测，还有一个exclude表示排除某些文件夹
  include: [resolve('src'), resolve('test')],
  // options表示传递给eslint-loader的参数
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  // 入口文件
  entry: {
    app: `./src/main.${process.env.NODE_PLATFORM}.js`
  },
  output: {
    path: path.join(config.build.assetsRoot, process.env.NODE_PLATFORM, process.env.NODE_ENV),
    filename: '[name].js',
    // 真正的文件引用路径
    publicPath: process.env.NODE_ENV === 'dev'
      ? config.dev.assetsPublicPath
      : config.build.assetsPublicPath
  },
  resolve: {
    // 省略扩展名
    extensions: ['.js', '.vue', '.json'],
    // 别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  // module来解析不同的模块
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
