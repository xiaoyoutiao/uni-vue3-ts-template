/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * lodash/underscore 部分方法原生替代实现
 * @implements You-Dont-Need-Lodash-Underscore
 * @link https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_frompairs
 */

/**
 * Creates an array of elements split into groups the length of size.
 * @example chunk(['a', 'b', 'c', 'd'], 2); // => [['a', 'b'], ['c', 'd']]
 * @example chunk(['a', 'b', 'c', 'd'], 3); // => [['a', 'b', 'c'], ['d']]
 */
export const chunk = (input: any[], size: number) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
  }, [])
}

/**
 * Flattens array a single level deep.
 * @example flatten([1, [2, [3, [4]], 5]]); // => [1, 2, [3, [4]], 5]
 */
export const flatten = (arr: any[]) => arr.reduce((a, b) => a.concat(b), [])

/**
 * Recursively flattens array.
 * @example flattenDeep([1, [[2], [3, [4]], 5]]); // => [1, 2, 3, 4, 5]
 */
export const flattenDeep = <T>(arr: T): T extends any[] ? T : T[] =>
  Array.isArray(arr) ? arr.reduce((a, b) => a.concat(flattenDeep(b)), []) : [arr]

/**
 * Similar to without, but returns the values from array that are not present in the other arrays.
 * @example difference([[1, 2, 3, 4, 5], [5, 2, 10]]); // => [1, 3, 4]
 */
export const difference = (arr: any[]) => arr.reduce((a, b) => a.filter((c: any) => !b.includes(c)))

/**
 * Returns an object composed from key-value pairs.
 * @example fromPairs([['a', 1], ['b', 2]]); // => { 'a': 1, 'b': 2 }
 */
export const fromPairs = (arr: Array<[string, any]>) =>
  arr.reduce((acc, val) => ((acc[val[0]] = val[1]), acc), {})

/**
 * Returns an array that is the intersection of all the arrays. Each value in the result is present in each of the arrays.
 * @example intersection( [[1, 2, 3], [101, 2, 1, 10], [2, 1]]); // => [1, 2]
 */
export const intersection = <T extends any[][]>(arr: T): T[number] =>
  arr.reduce((a, b) => a.filter((c: any) => b.includes(c)))

/**
 * Removes all provided values from the given array using strict equality for comparisons, i.e. ===.
 * @example pull([1, 2, 3, 1, 2, 3], 2, 3) // => [1, 1]
 */
export const pull = <T>(sourceArray: T[], ...removeList: T[]): T[] => {
  const removeSet = new Set(removeList)
  return sourceArray.filter((el) => !removeSet.has(el))
}

/**
 * Creates an array of unique values, taking an iteratee to compute uniqueness with (note that to iterate by a key in an object you must use x => x.key instead of key for the iteratee)
 * @example unionBy([2.1], [1.2, 2.3], Math.floor) // => [2.1, 1.2]
 */
export function unionBy(...arrays: any[]) {
  const iteratee = arrays.pop()

  if (Array.isArray(iteratee)) {
    return [] // return empty if iteratee is missing
  }

  return [...arrays].flat().filter(
    (
      (set) => (o) =>
        set.has(iteratee(o)) ? false : set.add(iteratee(o))
    )(new Set())
  )
}

/**
 * Creates an object composed of keys generated from the results of running each element of collection through iteratee. (keyBy for array only)
 * @example keyBy(['a', 'b', 'c']) // => {a: "a", b: "b", c: "c"}
 * @example keyBy([{ id: 'a1', title: 'abc' }, { id: 'b2', title: 'def' }], 'id') // => { a1: {id: "a1", title: "abc"} b2: {id: "b2", title: "def"} }
 */
export const keyBy = <T>(array: T[], key?: string) =>
  (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {})

/**
 * Creates an object composed of keys generated from the results of running each element of collection through iteratee.
 */
export const collectionKeyBy = <T>(collection: T, key?: string) => {
  const c = collection || {}
  return Array.isArray(c) ? keyBy(c, key) : keyBy(Object.values(c), key)
}

/**
 * Use Array#reduce for find the maximum or minimum collection item
 * @example unionBy([2.1], [1.2, 2.3], Math.floor) // => [2.1, 1.2]
 */
export const minBy = <T>(arr: T[], key: keyof T): T =>
  arr.reduce((a, b) => (a[key] <= b[key] ? a : b))
export const maxBy = <T>(arr: T[], key: keyof T): T =>
  arr.reduce((a, b) => (a[key] >= b[key] ? a : b))

/**
 * Creates an array of numbers progressing from start up to.
 * @example
 * range(4)  // => [0, 1, 2, 3]
 * range(-4) // => [-4, -3, -2, -1]
 * range(1, 5) // => [1, 2, 3, 4]
 * range(0, 20, 5) // => [0, 5, 10, 15]
 */
export const range = (start: number, end = 0, step = 1) => {
  if (start === end) start = 0
  if (start > end) [start, end] = [end, start]
  const nums = []

  for (let index = start; nums.length < (end - start) / step; index += step) {
    nums.push(index)
  }
  return nums
}

/**
 * Gets a random element from array.
 * @example sample([0, 1, 2, 3, 4])  // => 2
 */
export const sample = <T extends unknown[]>(arr: T) => {
  const len = arr.length
  return len ? arr[Math.floor(Math.random() * len)] : undefined
}

/**
 * Returns the number of values in the collection.
 * @example size({one: 1, two: 2, three: 3})  // => 3
 */
export const size = (val: Record<any, any>) => Object.keys(val).length

/**
 * Produces a duplicate-free version of the array, using === to test object equality.
 * @example uniq([1, 2, 1, 4, 1, 3])  // => [1, 2, 4, 3]
 */
export const uniq = (arr: any[]) => [...new Set(arr)]

/**
 * Create a new function that calls func with thisArg and args.
 * @example jQuery(window).on('resize', debounce(calculateLayout, 150));
 */
export function debounce(func: (...args: any[]) => any, wait: number) {
  let timeout: any = null
  return function <T>(this: T, ...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

/**
 * Create a new function that limits calls to func to once every given timeframe.
 * @example jQuery(window).on('resize', throttle(calculateLayout, 150));
 */
export function throttle(func: (...args: any[]) => any, timeFrame: number) {
  let lastTime = 0
  return function (...args: any[]) {
    const now = new Date().getTime()
    if (now - lastTime >= timeFrame) {
      func(...args)
      lastTime = now
    }
  }
}

/**
 * Creates a function that is restricted to invoking func once.
 * Repeat calls to the function return the value of the first invocation.
 * The func is invoked with the this binding and arguments of the created function.
 * @example
 * var initialize = _.once(createApplication);
 * initialize();
 * initialize();
 * // => `createApplication` is invoked once
 */
export function once(f: (...args: any[]) => unknown) {
  let result: unknown
  let revoked = false

  return (...args: unknown[]) => {
    if (revoked) return result
    const r = f(...args)
    revoked = true
    result = r
    return r
  }
}

/**
 * Puts the value into an array of length one if it is not already an array.
 * @example  castArray(5) // => [5]
 */
export function castArray<T>(arr: T | T[]): T[] {
  return Array.isArray(arr) ? arr : [arr]
}

/**
 * The method is used to copy the values of all enumerable own and inherited properties from one or more source objects to a target object.
 * @example
 * function Foo() {
 *   this.c = 3;
 * }
 * function Bar() {
 *   this.e = 5;
 * }
 * Foo.prototype.d = 4;
 * Bar.prototype.f = 6;
 * var result = _.extend({}, new Foo, new Bar);
 * console.log(result);
 * // output: { 'c': 3, 'd': 4, 'e': 5, 'f': 6 }
 */
export const extend = (target: any, ...sources: any[]) => {
  const length = sources.length

  if (length < 1 || target == null) return target
  for (let i = 0; i < length; i++) {
    const source = sources[i]

    for (const key in source) {
      target[key] = source[key]
    }
  }
  return target
}

/**
 * Checks if key is a direct property of object. Key may be a path of a value separated by .
 * @example has({ a: 1, b: 'settings' }, 'a'); // => output: true
 */
export const has = function (obj: Record<any, any>, key: string): boolean {
  const keyParts = key.split('.')

  return (
    !!obj &&
    (keyParts.length > 1
      ? has(obj[key.split('.')[0]], keyParts.slice(1).join('.'))
      : Object.prototype.hasOwnProperty.call(obj, key))
  )
}

/**
 * Gets the value at path of object. Note: If provided path does not exist inside the object js will generate error.
 * @example get({ a: [{ b: { c: 3 } }] }, 'a.0.b.c') // => 3
 * @example get({ a: [{ b: { c: 3 } }] }, 'a[0].b.c') // => 3
 */
export const get = (obj: Record<any, any>, path: string, defaultValue = undefined) => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj)
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
  return result === undefined || result === obj ? defaultValue : result
}

/**
 * Creates an object composed of the object properties predicate returns truthy for.
 * @example pick({ a: 1, b: '2', c: 3, 2: 4 }, ['a', 'c', '2'])
 */
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const pickedObj = {} as Pick<T, K>
  keys.forEach((key) => {
    pickedObj[key] = obj[key]
  })
  return pickedObj
}
/**
 * onverts the first character of string to upper case and the remaining to lower case.
 * @example capitalize('hasOwn') // => Hasown
 */
export const capitalize = <T extends string>(str: T) => {
  return (str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '') as Capitalize<T>
}

/**
 * Converts the first character of string to lower case.
 * @example lowerFirst('FRED') // => fRED
 */
export const lowerFirst = (string: string) => {
  return string ? string.charAt(0).toLowerCase() + string.slice(1) : ''
}

/**
 *  Uppercases the first letter of a given string
 * @example lowerFirst('frEd') // => FrEd
 */
export const upperFirst = (string: string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
}

/** Clamps number within the inclusive lower and upper bounds. */
export const clamp = (number: number, boundOne: number, boundTwo: number): number => {
  if (!boundTwo) {
    return Math.max(number, boundOne) === boundOne ? number : boundOne
  } else if (Math.min(number, boundOne) === number) {
    return boundOne
  } else if (Math.max(number, boundTwo) === number) {
    return boundTwo
  }
  return number
}

/**
 * Checks if n is between start and up to, but not including, end.
 * If end is not specified, it's set to start with start then set to 0.
 * If start is greater than end the params are swapped to support negative ranges.
 */
export const inRange = (num: number, a: number, b = 0) =>
  Math.min(a, b) <= num && num < Math.max(a, b)

/** Produces a random number between the inclusive lower and upper bounds */
export const random = (a = 1, b = 0) => {
  const lower = Math.min(a, b)
  const upper = Math.max(a, b)
  return lower + Math.random() * (upper - lower)
}

/** Produces a random int number between the inclusive lower and upper bounds */
export const randomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b))
  const upper = Math.floor(Math.max(a, b))
  return Math.floor(lower + Math.random() * (upper - lower + 1))
}

export const pipe =
  (...functions: Array<(...args: any[]) => any>) =>
  (input: any) =>
    functions.reduce((chain, func) => func(chain), input)

export const pipeAsync: any =
  (...fns: Array<(...args: any[]) => any>) =>
  (input: any) =>
    fns.reduce((chain, func) => chain.then(func), Promise.resolve(input))

export const compose =
  (...fns: Array<(...args: any[]) => any>) =>
  (input: any) =>
    fns.reduceRight((chain, func) => func(chain), input)

export const composeAsync =
  (...fns: Array<(...args: any[]) => any>) =>
  (input: any) =>
    fns.reduceRight((chain, func) => chain.then(func), Promise.resolve(input))

export function uuid(prefix = '') {
  let d = Date.now()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now() //use high-precision timer if available
  }

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })

  return prefix + uuid
}

export function deepClone<T>(obj: T, visited: Map<any, any> = new Map()): T {
  if (visited.has(obj)) {
    return visited.get(obj)
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj) as any
  }

  if (typeof obj === 'function') {
    return obj as any
  }

  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  let result: any
  if (Array.isArray(obj)) {
    result = []
    visited.set(obj, result)
    for (let i = 0; i < obj.length; i++) {
      result[i] = deepClone(obj[i], visited)
    }
  } else if (obj instanceof Set) {
    result = new Set()
    visited.set(obj, result)
    for (const value of obj) {
      result.add(deepClone(value, visited))
    }
  } else if (obj instanceof Map) {
    result = new Map()
    visited.set(obj, result)
    for (const [key, value] of obj) {
      result.set(key, deepClone(value, visited))
    }
  } else {
    const proto = Object.getPrototypeOf(obj)
    result = Object.create(proto)
    visited.set(obj, result)
    for (const [key, value] of Object.entries(obj)) {
      result[key] = deepClone(value, visited)
    }
  }

  return result
}

export function omit<T extends AnyObject, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result: Partial<T> = {}

  Object.keys(obj).forEach((key) => {
    if (!keys.includes(key as K)) {
      result[key as keyof T] = obj[key as keyof T]
    }
  })

  return result as Omit<T, K>
}
