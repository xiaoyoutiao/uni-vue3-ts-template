import { parseUrl, stringifyUrl } from '@/utils/url'

import { isStringifyOptions, concatNumericProperties } from '../utils'

let pages: ReturnType<typeof usePageStore>['pages']

export function normalizePageUrl(result: AnyObject) {
  if (isStringifyOptions(result, 'url')) {
    const url = concatNumericProperties(result)
    result.url = url
  }

  const parseResult = parseUrl(result.url as string)
  const query = Object.assign(parseResult.query, result.query)
  result.url = stringifyUrl({ url: parseResult.url, query })
}

export function pageSafetyGuard(
  result: UniNavigateToOptions,
  type: 'navigateTo' | 'redirectTo' | 'switchTab' | 'reLaunch'
) {
  if (!pages) {
    pages = usePageStore().pages
  }

  const parseResult = parseUrl(result.url as string)
  const url = parseResult.url
  const page = pages.find((p) => p.path === url.replace(/^\//, ''))

  if (!page) {
    guardModal(`【页面不存在】 ${result.url}`)
    return
  }

  if ((type === 'navigateTo' || type === 'redirectTo') && page.type === 'tabbar') {
    guardModal(`【tabBar只能使用switchTab】 (${type}) ${result.url}`)
    result.url = ''
    return
  }
}

function guardModal(errMsg: string) {
  uni.showModal({ title: 'Router Error', content: errMsg, confirmText: '关闭', showCancel: false })
}
