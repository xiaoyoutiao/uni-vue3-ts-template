import { describe, it, expect } from 'vitest'

import { isEmail, isIP, isMobilePhone, isURL, isNumeric } from '@/utils/validator'

describe('validator test', () => {
  it('isEmail check', () => {
    expect(isEmail('xiaoyoutiaoupup@gmail.com')).toEqual(true)
    expect(isEmail('xiaoyoutiaoupup@qq.com')).toEqual(true)
    expect(isEmail('xiaoyoutiaoupup')).toEqual(false)
    expect(isEmail('xiaoyoutiaoupup@gmail')).toEqual(false)
  })

  it('isIP check', () => {
    expect(isIP('http://google.com')).toEqual(false)
    expect(isIP('http://127.0.0.1')).toEqual(false)
    expect(isIP('127.0.0.1')).toEqual(true)
    expect(isIP('255.255.255.255')).toEqual(true)
  })

  it('isMobilePhone check', () => {
    expect(isMobilePhone('+8615112701387', 'zh-CN', { strictMode: true })).toEqual(true)
    // 严格模式必须包含 +国家代码
    expect(isMobilePhone('15112701387', 'zh-CN', { strictMode: true })).toEqual(false)
    expect(isMobilePhone('15112701387', 'zh-CN')).toEqual(true)

    expect(isMobilePhone('15112701387', 'zh-HK')).toEqual(false)

    // 166开头号码
    expect(isMobilePhone('16639928105', 'zh-CN')).toEqual(true)
  })

  it('isURL check', () => {
    expect(isURL('http://google.com')).toEqual(true)
    expect(isURL('google.com')).toEqual(true)
    expect(isURL('google.cn')).toEqual(true)
    expect(isURL('google.sub.cn')).toEqual(true)

    expect(isURL('google.sub.cn')).toEqual(true)
    expect(isURL('google.sub.cn', { require_protocol: true })).toEqual(false)
  })

  it('isNumeric check', () => {
    expect(isNumeric('120')).toEqual(true)
    expect(isNumeric('120.22')).toEqual(true)
    expect(isNumeric('120.2222')).toEqual(true)
    expect(isNumeric('-120.22')).toEqual(true)
    expect(isNumeric('+120.22')).toEqual(true)
  })
})
