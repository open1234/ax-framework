'use strict'
const utils = require('./utils')
const config = require('../config')
const isDev = process.env.NODE_ENV === 'dev'
const sourceMapEnabled = isDev
  ? config.dev.cssSourceMap
  : config.build.sourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: !isDev
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
