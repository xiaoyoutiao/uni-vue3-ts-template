/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComputedRef, Ref } from 'vue'

declare interface AnyFn<T = any, R = T> {
  (...arg: T[]): R
}
declare type AnyObj = Record<string, any>
declare type AnyProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>
}
