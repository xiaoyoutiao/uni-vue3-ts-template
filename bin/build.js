/* eslint-disable */
const minimist = require('minimist')
const shelljs = require('shelljs')
const miniprogramCi = require('miniprogram-ci')
const path = require('path')
const semver = require('semver')

const args = minimist(process.argv.slice(2))

const ModeEnum = {
  Upload: 'upload',
  Preview: 'preview',
}

const log = (...args) => console.log(...args)
const exitWithErr = () => shelljs.exit(-1)

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
    qrcodeOutputDest: './preview.jpg',
    // onProgressUpdate: console.log,
  }
  this.uploadConfig = {}
}

CiProgram.prototype.run = async function () {
  try {
    this.validate()
    this.buildApp()
    this.makeCiProject()

    if (this.mode === ModeEnum.Upload) {
      await this.upload()
    }
    if (this.mode === ModeEnum.Preview) {
      await this.preview()
    }
  } catch (error) {
    console.error(error)
    exitWithErr()
  }
}

CiProgram.prototype.buildApp = function () {
  try {
    log('构建小程序代码')
    const execResult = shelljs.exec('npm run build:mp-weixin')

    if (execResult.stderr) {
      exitWithErr()
    }
  } catch (error) {
    throw error
  }
}

CiProgram.prototype.makeCiProject = function () {
  try {
    log('构建小程序CI项目')

    const project = new miniprogramCi.Project(this.projectConfig)

    this.project = project
  } catch (error) {
    throw error
  }
}

CiProgram.prototype.preview = async function () {
  try {
    log('执行小程序代码预览')
    const previewConfig = this.previewConfig || {}

    await miniprogramCi.preview({
      ...previewConfig,
      project: this.project,
      version: this.version,
      desc: this.desc,
      robot: this.robot,
    })
  } catch (error) {
    throw error
  }
}

CiProgram.prototype.upload = async function () {
  try {
    log('执行小程序代码上传')
    const uploadConfig = this.uploadConfig || {}
    await miniprogramCi.upload({
      ...uploadConfig,
      project: this.project,
      version: this.version,
      desc: this.desc,
      robot: this.robot,
      // onProgressUpdate: () => {}
    })
  } catch (error) {
    throw error
  }
}

CiProgram.prototype.validate = function () {
  optionsValidate({
    branch: this.branch,
    mode: this.mode,
    version: this.version,
    desc: this.desc,
    robot: this.robot,
  })
}

function optionsValidate(options) {
  Object.keys(options).forEach((key) => {
    if (!options[key]) {
      throw new Error(`构建参数无效："${key}"\n ${JSON.stringify(options)} \n`)
    }
  })

  if (!semver.valid(options.version)) {
    throw new Error(`版本号不符合semver规范\n  version: ${options.version}`)
  }
}

const ciProgram = new CiProgram(args)
ciProgram.run()
