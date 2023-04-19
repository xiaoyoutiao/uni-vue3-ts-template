import { describe, it, expect } from 'vitest'

import { add, div, mul, sub, toFixed } from '@/utils/numeric'

describe('加减乘除计算', () => {
  it('整数计算', () => {
    expect(add(111, 222)).toEqual(333)
    expect(sub(222, 111)).toEqual(111)
    expect(mul(111, 222)).toEqual(24642)
    expect(div(222, 111)).toEqual(2)
  })

  it('浮点数计算', () => {
    expect(add(2.22, 3.33)).toEqual(5.55)
    expect(sub(3.33, 2.22)).toEqual(1.11)
    expect(mul(2.22, 3.33)).toEqual(7.3926)
    expect(div(2.1, 0.3)).toEqual(7)
  })

  it('正负整数计算', () => {
    expect(add(100, -50)).toEqual(50)
    expect(sub(100, -50)).toEqual(150)
    expect(mul(100, -50)).toEqual(-5000)
    expect(div(100, -50)).toEqual(-2)
  })

  it('正负浮点数数计算', () => {
    expect(add(2.22, -3.33)).toEqual(-1.11)
    expect(sub(2.22, -3.33)).toEqual(5.55)
    expect(mul(2.22, -3.33)).toEqual(-7.3926)
    expect(div(2.1, -0.3)).toEqual(-7)
  })

  it('小数处理', () => {
    expect(toFixed(2.22222, 2)).toBe('2.22')
    expect(toFixed(2, 2)).toBe('2.00')
    expect(toFixed(2, 2, Number)).toBe(2.0)
  })
})
