#!/usr/bin/env node
const { deploy } = require('../build/deploy')
const program = require('commander')

program
  .version('1.0.0', '-V --version', '输出版本号')
  .option('-i --init', '初始化项目')
  .option('-t --target <WorkDir>', '指定目录')
  .option('-s --send', '发布钉钉消息')
  .option('-d --dir <WorkDir>', '工作目录')
  .option('--branch <Branch>', '指定上传的branch', 'build')
  .parse(process.argv)

if (program.dir) {
  process.chdir(program.dir)
}

const { target, send, branch } = program

const options = {
  target,
  send,
  branch,
}

Object.keys(options).forEach((key) => {
  if (!options[key] && typeof options[key] !== 'boolean') {
    Reflect.deleteProperty(options, key)
  }
})

deploy(options)