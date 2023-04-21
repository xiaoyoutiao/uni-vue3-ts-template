import queryString from 'query-string'

const parseOptions: queryString.ParseOptions = {
  /** 如果值是数字，则将值解析为数字类型而不是字符串类型 */
  parseNumbers: false,
  parseBooleans: true,
  decode: true,
  arrayFormat: 'none'
}

interface ParseUrlResult<Query extends queryString.ParsedQuery> {
  url: string
  query: Query
  hash: string | undefined
}

export function parse(search: string) {
  return queryString.parse(search, parseOptions)
}

const StringifyOptions: queryString.StringifyOptions = {
  strict: false,
  arrayFormat: 'none',
  encode: true,
  skipEmptyString: true,
  skipNull: true
}

export function stringify(object: AnyObject) {
  return queryString.stringify(object, StringifyOptions)
}

const parseUrlOptions: queryString.ParseOptions = {
  ...parseOptions,
  parseFragmentIdentifier: true
}

export function parseUrl<Query extends queryString.ParsedQuery>(
  url: string
): ParseUrlResult<Query> {
  const result = queryString.parseUrl(url, parseUrlOptions)
  return {
    url: result.url,
    query: (result.query || {}) as Query,
    hash: result.fragmentIdentifier
  }
}

interface StringifyUrlObject {
  url: string
  query: AnyObject
  hash?: string
}

export function stringifyUrl(urlObject: StringifyUrlObject) {
  return queryString.stringifyUrl(
    { url: urlObject.url, query: urlObject.query, fragmentIdentifier: urlObject.hash },
    StringifyOptions
  )
}
