import { defineEnum, defineOptions } from '@/utils/index'

const MpEnvConst = [
  ['Dev', 'development', '开发'],
  ['Test', 'testing', '测试'],
  ['Prod', 'production', '生产']
] as const

export const MpEnvOpts = defineOptions(MpEnvConst)
export const MpEnvEnum = defineEnum(MpEnvConst)
