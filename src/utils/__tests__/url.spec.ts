import { describe, it, expect } from 'vitest'

import { parse, stringify, parseUrl, stringifyUrl } from '@/utils/url'
import { isURL } from '@/utils/validator'

describe('parse module test', () => {
  it('parse check', () => {
    expect(parse(`?id=12&type=i18n&used=true`)).toEqual({ id: '12', type: 'i18n', used: true })
  })
  it('parse valid check', () => {
    expect(parse(`?id=12&&`)).toEqual({ id: '12' })
    expect(parse(`id=12`)).toEqual({ id: '12' })
    expect(parse(`id&name=ryu`)).toEqual({ id: null, name: 'ryu' })
  })
})

describe('stringify function test', () => {
  it('stringify object', () => {
    expect(stringify({ name: 'ryu', born: 1996 })).toEqual('born=1996&name=ryu')
  })

  it('stringify skipEmptyString=true', () => {
    const input = { name: 'ryu', born: '1996', hobby: '' }
    const ouput = stringify(input)
    expect(ouput).include('born=1996').include('name=ryu')
    expect(parse(ouput)).not.toHaveProperty('hobby')
  })

  it('stringify skipNull=true', () => {
    const input = { hobby: null }
    const ouput = stringify(input)
    expect(stringify(input)).toEqual('')
    expect(parse(ouput)).toEqual({})
  })
})

describe('parseUrl function test', () => {
  it('parseUrl result', () => {
    const url =
      'https://dev-ldm-cxx.xdp8.cn?type=redirect&params=%7B%22actId%22:5,%22storeNumber%22:%22C00000006%22,%22storeName%22:%22123%22,%22actQrcodeNo%22:%22ddfcb377-4c59-4e45-a40e-e70aa35a8e93%22,%22actRole%22:1,%22__page%22:%22/pages/user/UserPage%22%7D'
    const result = parseUrl(url)

    expect(result).toHaveProperty('url')
    expect(result).toHaveProperty('query')
    expect(result).toHaveProperty('hash')
    expect(result.query).toHaveProperty('type')
    expect(result.query).toHaveProperty('params')
  })

  it('parseUrl plain url', () => {
    const url = 'https://dev-ldm-cxx.xdp8.cn'
    const result = parseUrl(url)

    expect(result).toHaveProperty('url')
    expect(result).toHaveProperty('query')
    expect(result).toHaveProperty('hash')

    expect(result.query).toEqual({})
    expect(result.hash).not.toBeDefined()
  })

  it('parseUrl invalid url', () => {
    const url = '///dev-ldm-c###/#/####/#//'
    const result = parseUrl(url)

    expect(result).toHaveProperty('url')
    expect(result).toHaveProperty('query')
    expect(result).toHaveProperty('hash')

    expect(result.query).toEqual({})
    expect(result.hash).toBeDefined()
  })
})

describe('stringifyUrl function test', () => {
  it('stringifyUrl check', () => {
    const object = {
      url: 'https://dev-ldm-cxx.xdp8.cn',
      query: { type: 'login', accout: 'ryu', pwd: '123456' }
    }
    const string = stringifyUrl(object)
    expect(isURL(string)).toBe(true)
    expect(string).include('type=login').include('accout=ryu').include('pwd=123456')
  })

  it('stringifyUrl append hash string check', () => {
    const object = {
      url: 'https://dev-ldm-cxx.xdp8.cn',
      query: {},
      hash: '/pages/index'
    }
    const string = stringifyUrl(object)

    expect(isURL(string)).toBe(true)
    expect(string).include('#/pages/index')
    expect(string).not.include('?')
  })
})
