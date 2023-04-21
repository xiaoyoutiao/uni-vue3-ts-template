import { has } from '@/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function configMerge(origin: any, source: any) {
  Object.keys(source).forEach((key) => {
    if (!(key in origin)) {
      origin[key] = source[key]
    }
  })
}

export function isStringifyOptions(options: AnyObject, primaryKey: string) {
  return !has(options, primaryKey) && has(options, '0')
}

export function concatNumericProperties(options: AnyObject) {
  let num = 0
  let result = ''
  while (has(options, String(num))) {
    result += options[num]
    num++
  }
  return result
}
