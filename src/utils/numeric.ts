import Big from 'big.js'

import { isFunction } from './shared/lang'

type CallMethod = 'add' | 'sub' | 'mul' | 'div'

function normalizeCalc(method: CallMethod, val: number | string, other: number | string) {
  val = Number(val)
  other = Number(other)
  return new Big(val)[method](other).toNumber()
}

export function add(val: number | string, other: number | string) {
  return normalizeCalc('add', val, other)
}
export function sub(val: number | string, other: number | string) {
  return normalizeCalc('sub', val, other)
}
export function mul(val: number | string, other: number | string) {
  return normalizeCalc('mul', val, other)
}
export function div(val: number | string, other: number | string) {
  return normalizeCalc('div', val, other)
}

export function toFixed(val: number | string, num: number): string
export function toFixed<R>(val: number | string, num: number, formater: (v: string) => R): R
export function toFixed<R>(val: number | string, num: number, formater?: (v: string) => R) {
  if (isFunction(formater)) {
    return formater(new Big(Number(val)).toFixed(num))
  }
  return new Big(Number(val)).toFixed(num)
}
