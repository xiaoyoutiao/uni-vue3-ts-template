import { describe, it, expect } from 'vitest'

import { pipe, pipeAsync, uuid } from '@/utils/shared/unodash'

describe('test pipe', () => {
  const toString = (val: unknown): string => String(val)
  const head = (val: string) => val[0]
  const concatHi = (val: string) => `Hi! ${val}`

  const stringHead = pipe(toString, head, concatHi)

  it('pipe check', () => {
    expect(stringHead('Ryu')).toEqual('Hi! R')
  })
})

describe('test pipeAsync', async () => {
  const toStringAsync = (val: unknown): Promise<string> =>
    new Promise((resolve) => setTimeout(() => resolve(String(val)), 1000))

  const headAsync = (val: string): Promise<string> =>
    new Promise((resolve) => setTimeout(() => resolve(val[0]), 1000))
  const concatHiAsync = (val: Promise<string>) =>
    new Promise((resolve) => setTimeout(() => resolve(`Hi! ${val}`), 1000))

  const stringHead = await pipeAsync(toStringAsync, headAsync, concatHiAsync)

  it('pipe check', async () => {
    expect(await stringHead('Ryu')).toEqual('Hi! R')
  })
})

describe('test uuid', () => {
  it('uuid check unique', () => {
    const batchCreateUuid = (num: number) =>
      new Array(num).fill(null).map(() => uuid())

    const size = 1000000

    expect(new Set(batchCreateUuid(size)).size).toEqual(size)
  })

  it('uuid check prefix', () => {
    const prefix = 'vitest_'
    expect(uuid(prefix)).toEqual(expect.stringContaining(prefix))
  })
})
