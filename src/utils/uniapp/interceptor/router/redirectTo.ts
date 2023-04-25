import { normalizePageUrl, pageSafetyGuard, executeMiddleware } from './utils'

export function useRedirectToInterceptor() {
  uni.addInterceptor('redirectTo', {
    invoke(result: UniRedirectToOptions) {
      result.routerType = 'redirectTo'
      normalizePageUrl(result)
      pageSafetyGuard(result, 'redirectTo')

      if (result.storedQuery) {
        const { setQuery } = usePageStore()
        setQuery(result.storedQuery)
      }

      executeMiddleware(result)
    }
  })
}
