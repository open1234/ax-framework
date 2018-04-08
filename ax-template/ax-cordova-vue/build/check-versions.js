'use strict'
// chalk插件，作用是在控制台中输出不同颜色的文字
const chalk = require('chalk')
// semver插件，作用是对特定的版本号做判断
const semver = require('semver')
// 引入package.json文件，主要使用里面的engines选项
const packageConfig = require('../package.json')
// shelljs插件，作用是执行UNIX系统命令
const shell = require('shelljs')

// 执行UNIX命令
function exec(cmd) {
  // 脚本通过child_process模块新建子进程，从而执行UNIX系统命令
  // 把cmd这个参数传递的值传化为前后没有空格的字符串，也就是版本号
  return require('child_process').execSync(cmd).toString().trim()
}

// 版本需求数组容器
const versionRequirements = [{
  name: 'node', // node版本信息
  currentVersion: semver.clean(process.version), // 当前版本信息，使用semver插件转化为规定的版本格式
  versionRequirement: packageConfig.engines.node // 规定的package.json中engines的node版本信息
}]

// 判断是否存在npm命令
if (shell.which('npm')) {
  // 存在，则在版本需求数组容器中添加npm版本信息检查
  versionRequirements.push({
    name: 'npm', // npm版本信息
    currentVersion: exec('npm --version'), // 当前版本信息，自动调用npm --version命令返回给exec函数，从而获取规定的版本格式
    versionRequirement: packageConfig.engines.npm // 规定的package.json中engines的npm版本信息
  })
}

module.exports = function () {
  // 警告提示数组容器
  const warnings = []

  // 循环遍历版本需求数组容器
  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    // 判断版本号是否符合要求
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      // 如果不符合则添加到警告容器提示
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  // 如果警告容器中存在数据，则进行提示并结束程序
  if (warnings.length) {
    console.log('')
    // 提示信息：如果想使用此模版，你必须更新以下程序版本
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}
