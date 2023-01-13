import { describe, it, expect } from 'vitest'

import { defineEnum } from '@/utils'

describe('util functions', () => {
  const StatusDef = defineEnum([
    ['Success', 1, '成功'],
    ['Fail', 0, '失败'],
  ])

  const statusDef = {
    Success: 1,
    Fail: 0,
    0: '失败',
    1: '成功',
  } as const

  it('defineEnum check', () => {
    expect(StatusDef).toEqual(statusDef)
  })
})
