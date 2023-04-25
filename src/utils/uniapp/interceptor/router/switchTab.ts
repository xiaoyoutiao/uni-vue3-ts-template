import { normalizePageUrl, pageSafetyGuard, executeMiddleware } from './utils'

export function useSwitchTabInterceptor() {
  uni.addInterceptor('switchTab', {
    invoke(result: UniSwitchTabOptions) {
      result.routerType = 'switchTab'
      normalizePageUrl(result)
      pageSafetyGuard(result, 'switchTab')

      if (result.storedQuery) {
        const { setQuery } = usePageStore()
        setQuery(result.storedQuery)
      }

      executeMiddleware(result)
    }
  })
}
