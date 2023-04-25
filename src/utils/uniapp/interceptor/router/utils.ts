import { parseUrl, stringifyUrl } from '@/utils/url'
import { middlewares } from '@/middleware/router'

import { pick } from '@/utils'

import { isObject, isString } from '@/utils/shared/lang'

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

export type UniNavigateType = 'navigateTo' | 'redirectTo' | 'switchTab' | 'reLaunch'

export function pageSafetyGuard(result: UniNavigateToOptions, type: UniNavigateType) {
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

const Apis = {
  navigateTo: uni.navigateTo,
  redirectTo: uni.redirectTo,
  switchTab: uni.switchTab,
  reLaunch: uni.reLaunch
}

let isRedirect = false

export function executeMiddleware(config: UniNavigateToOptions) {
  if (isRedirect) {
    isRedirect = false
    return
  }

  const page = getCurrentPages().slice(-1)[0]

  const to = config.url as string

  const from = '/' + page.route || ''

  for (let i = 0, l = middlewares.length; i < l; i++) {
    const fn = middlewares[i]
    const res = fn(to, from, Object.assign({}, pick(config, ['url', 'routerType'])))

    if (res === false) {
      config.url = ''
    } else if (isString(res)) {
      isRedirect = true
      config.url = res
    } else if (isObject(res)) {
      isRedirect = true
      const { type, url } = res
      isRedirect = true
      config.url = ''
      Apis[type]({ url })
    }
  }
}
