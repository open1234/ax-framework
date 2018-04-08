'use strict'
// 立即执行版本检查
require('./check-versions')()

// chalk插件，作用是在控制台中输出不同颜色的文字
const chalk = require('chalk')

// 获取启动参数
const args = process.argv.splice(2)
const platform = args[0]
const env = args[1]

// 判断构建命令参数是否正确
if (!((platform === 'web' || platform === 'mobile') && (env === 'test' || env === 'uat' || env === 'prod'))) {
  console.log(chalk.yellow('To build this project, you need to use commands like this:'))
  console.log(chalk.green(' node <filePath> <platform> <env>'))
  console.log(chalk.green(' filePath: build/build.js'))
  console.log(chalk.green(' platform: web or mobile'))
  console.log(chalk.green(' env: test or uat or prod'))
  process.exit(1)
}

// 设置环境变量
process.env.NODE_PLATFORM = platform
process.env.NODE_ENV = env

// ora插件，作用是控制台转圈圈动画效果
const ora = require('ora')
// rimraf插件，作用是实行UNIX命令rm -rf来删除文件和文件夹
const rm = require('rimraf')
// node.js路径模块，作用是连接路径
const path = require('path')
// webpack模块，引入内置的插件和webpack的方法API
const webpack = require('webpack')
// 配置文件模块
const config = require('../config')
// 引入webpack构建配置文件
const webpackConfig = require('./webpack.build.conf')

// 开启转圈圈动画
const spinner = ora(`building for ${platform}.${env} ...`)
spinner.start()

// 调用rm删除方法，将第一个参数路径下的所有文件删除，第一个参数值为配置文件中的路径拼接而成
rm(path.join(config.build.assetsRoot, platform, env, config.build.assetsSubDirectory), err => {
  // 如果执行过程中出错，则抛出错误，并终止程序
  if (err) throw err
  // 没有错误，则执行webpack编译
  webpack(webpackConfig, (err, stats) => {
    // 该回调函数是webpack编译过程中执行

    // 停止转圈圈动画
    spinner.stop()
    // 如果出错则抛出错误
    if (err) throw err
    // 没有错误则执行下面代码
    // process.stdout.write和console.log类似，作用是输出对象
    // process.stdout用来控制标准输出，也就是编译过程中持续在命令行窗口输出信息给用户
    process.stdout.write(stats.toString({
      colors: true, // 增加控制台颜色开关
      modules: false, // 不增加内置模块信息
      children: false, // 不增加子级信息，备注：如果你使用ts-loader，设置此项为true，这样能输出在构建过程中TypeScript的错误
      chunks: false, // 允许较少的输出
      chunkModules: false // 不将内置模块信息加到包信息
    }) + '\n\n')

    // 如果有错误，则提示构建失败并退出程序
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    // 以下为构建成功后输出的信息
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
