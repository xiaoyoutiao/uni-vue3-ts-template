import { defineEnum } from '@/utils/index'

export const enum BoolEnum {
  Falsy,
  Truthy,
}

export const StatusDef = defineEnum([
  ['Success', 1, '成功'],
  ['Fail', 0, '失败'],
] as const)
