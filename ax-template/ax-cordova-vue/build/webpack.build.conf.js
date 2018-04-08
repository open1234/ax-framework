'use strict'

// node.js路径模块，作用是连接路径
const path = require('path')
// utils工具配置文件，作用是处理css类文件的loader
const utils = require('./utils')
// webpack模块，引入内置的插件和webpack的方法API
const webpack = require('webpack')
// 配置文件模块
const config = require('../config')
// webpack的merge插件，作用是来处理配置对象合并
const merge = require('webpack-merge')
// webpack.base.conf.js配置文件，作用是处理不同类型文件的loader
const baseWebpackConfig = require('./webpack.base.conf')
// copy-webpack-plugin插件，作用是复制文件或文件夹到指定目录
const CopyWebpackPlugin = require('copy-webpack-plugin')
// html-webpack-plugin插件，作用是生成html文件，可以设置模版
const HtmlWebpackPlugin = require('html-webpack-plugin')
// extract-text-webpack-plugin插件，作用是将bundle中的css等文件单独产出bundle文件
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// optimize-css-assets-webpack-plugin插件，作用是压缩css代码，同时还能去除extract-text-webpack-plugin插件抽离文件产生的重复代码
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// uglifyjs-webpack-plugin插件，作用是用来压缩js代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 根据操作环境变量获取配置信息
const env = require(`../config/${process.env.NODE_ENV}.env`)

// 把当前的配置对象和基础配置对象进行合并
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    // 使用utils配置好的处理各种css类型的配置处理器处理
    rules: utils.styleLoaders({
      // 是否开启cssmap
      sourceMap: config.build.sourceMap,
      // 是否进行文件单独提取
      extract: true,
      // 是否使用PostCSS
      usePostCSS: true
    })
  },
  // devtool开发工具，用来生成个sourceMap方便调试
  devtool: config.build.sourceMap ? config.build.devtool : false,
  // 输出配置
  output: {
    path: path.join(config.build.assetsRoot, process.env.NODE_PLATFORM, process.env.NODE_ENV),
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // DefinePlugin插件，定义process.env环境变量为env
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // UglifyJsPlugin插件，用来压缩js文件
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false // 禁止压缩时的警告信息
        }
      },
      // 是否生成map文件
      sourceMap: config.build.sourceMap,
      parallel: true
    }),
    // ExtractTextPlugin插件，生成独立的css文件
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true,
    }),
    // OptimizeCSSPlugin插件，压缩css文件
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.sourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // 生成html页面
    new HtmlWebpackPlugin({
      filename: config.build.index,
      // 模板文件
      template: `index.${process.env.NODE_PLATFORM}.html`,
      // 将js文件放到body标签的结尾
      inject: true,
      // 压缩产出后的html页面
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // 分类要插到html页面的模块
      chunksSortMode: 'dependency'
    }),
    // 模块稳定的时候保持模块ID不变
    new webpack.HashedModuleIdsPlugin(),
    // 将js模块提供商拆分到自己的文件中
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 将打包后的第三方库文件抽取出来，便于浏览器缓存，提高程序的运行速度
    new webpack.optimize.CommonsChunkPlugin({
      // common 模块的名称
      name: 'vendor',
      minChunks (module) {
        // 将所有依赖于node_modules下面文件打包到vendor中
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // 把webpack的runtime代码和module manifest代码提取到manifest文件中，防止修改了代码但是没有修改第三方库文件导致第三方库文件也打包的问题
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    // 复制文件插件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, `../config/${process.env.NODE_ENV}.config.js`),
        to: 'configuration.js'
      }
    ])
  ]
})

if (config.build.gzip) {
  // 开启Gzip压缩打包后的文件
  // vue-cli默认将这个功能禁用掉，原因是Surge和Netlify静态主机默认帮你把上传的文件gzip了
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp( // 这里是把js和css文件压缩
        '\\.(' +
        config.build.gzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  // 打包编译后的文件打印出详细的文件信息
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig



