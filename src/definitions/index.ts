import { defineEnum, defineOptions } from '@/utils/index'

const StatusConst = [
  ['Success', 1, '成功'],
  ['Fail', 0, '失败']
] as const
export const StatusOpts = defineOptions(StatusConst)
export const StatusEnum = defineEnum(StatusConst)
