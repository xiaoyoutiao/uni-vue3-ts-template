import { describe, it, expect } from 'vitest'

import { defineEnum, defineOptions, mapFields } from '@/utils'

const StatusConst = [
  ['Success', 1, '成功'],
  ['Fail', 0, '失败']
] as const

describe('definitions check', () => {
  const StatusOpts = defineOptions(StatusConst)

  it('options check', () => {
    expect(StatusOpts).toEqual([
      { label: '成功', key: 'Success', value: 1 },
      { label: '失败', key: 'Fail', value: 0 }
    ])
  })
})

describe('definitions check', () => {
  const StatusEnum = defineEnum(StatusConst)

  it('enum check', () => {
    expect(StatusEnum).toMatchObject({
      '0': '失败',
      '1': '成功',
      Fail: 0,
      Success: 1
    })
  })
})

describe('mapFields check', () => {
  const StatusOpts = defineOptions(StatusConst)

  it('mapFields object check', () => {
    const mapFieldsResult = mapFields(
      { name: 'success', desc: 'Is Success Status' },
      { name: 'label', desc: 'text' }
    )
    expect(mapFieldsResult).toEqual({ label: 'success', text: 'Is Success Status' })
  })

  it('mapFields array check', () => {
    const mapFieldsResult = mapFields(StatusOpts, { label: 'text', value: 'val', key: 'name' })
    expect(mapFieldsResult).toEqual([
      { text: '成功', val: 1, name: 'Success' },
      { text: '失败', val: 0, name: 'Fail' }
    ])
  })
})
