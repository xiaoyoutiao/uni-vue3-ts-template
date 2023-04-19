/* eslint-disable @typescript-eslint/no-explicit-any */
const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val).toLowerCase() === `[object ${type}]`
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isNil(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'object')
}

export function isDate(val: unknown): val is Date {
  return is(val, 'date')
}

export function isNumber(val: unknown): val is number {
  return is(val, 'number')
}

export function isString(val: unknown): val is string {
  return is(val, 'string')
}

export function isFunction(val: unknown): val is (...args: any[]) => any {
  return typeof val === 'function'
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'boolean')
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'regexp')
}

export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'map')
}

export function isUrl(path: string): boolean {
  const reg =
    // eslint-disable-next-line no-useless-escape
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}
