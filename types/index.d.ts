// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}