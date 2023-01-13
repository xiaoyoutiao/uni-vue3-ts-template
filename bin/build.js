/* eslint-disable */
const minimist = require('minimist')
// const miniprogramCi = require('miniprogram-ci')

const args = minimist(process.argv.slice(2))

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
}

CiProgram.prototype.run = function () {
  if (this.mode === ModeEnum.Upload) {
    this.upload()
  }

  if (this.mode === ModeEnum.Preview) {
    this.preview()
  }
}

CiProgram.prototype.preview = function () {}

CiProgram.prototype.upload = function () {}

CiProgram.prototype.validate = function () {}

function validateVersion(version) {}

const ciProgram = new CiProgram(args)
ciProgram.run()
