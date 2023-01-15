/* eslint-disable */
const minimist = require('minimist')
const shelljs = require('shelljs')
const miniprogramCi = require('miniprogram-ci')
const path = require('path')

const args = minimist(process.argv.slice(2))
console.log('参数 ', JSON.stringify(args))
const ModeEnum = {
  Upload: 'upload',
  Preview: 'preview',
}

function CiProgram(options) {
  this.branch = options.branch
  this.mode = options.mode
  this.version = options.version
  this.desc = options.desc
  this.robot = options.robot

  // 以下参数由配置文件读取
  this.projectConfig = {
    appid: 'wx66a82c51d4a1ca97',
    type: 'miniProgram',
    projectPath: path.resolve(__dirname, '../dist/build/mp-weixin'),
    privateKeyPath: path.resolve(__dirname, './private.wx66a82c51d4a1ca97.key'),
    ignores: ['node_modules/**/*'],
  }

  this.previewConfig = {
    qrcodeFormat: 'image',
    qrcodeOutputDest: path.resolve(__dirname, './preview.jpg'),
    onProgressUpdate: console.log,
  }
}

const log = (...args) => console.log(...args)

CiProgram.prototype.run = async function () {
  this.buildApp()
  this.makeCiProject()
  if (this.mode === ModeEnum.Upload) {
    await this.upload()
  }
  if (this.mode === ModeEnum.Preview) {
    await this.preview()
  }
}

CiProgram.prototype.buildApp = function () {
  log('构建小程序代码')
  shelljs.exec('npm run build:mp-weixin')
}

CiProgram.prototype.makeCiProject = function () {
  log('构建小程序CI项目')

  const project = new miniprogramCi.Project(this.projectConfig)

  this.project = project
}

CiProgram.prototype.preview = async function () {
  log('执行小程序代码预览')
  const previewResult = await miniprogramCi.preview({
    ...this.previewConfig,
    project: this.project,
    version: this.version,
    desc: this.desc,
    robot: this.robot,
  })
  console.log('previewResult :>> ', previewResult);
}

CiProgram.prototype.upload = function () {
  log('执行小程序代码上传')
}

CiProgram.prototype.validate = function () {}

function versionValidate(version) {}

const ciProgram = new CiProgram(args)
ciProgram.run()
