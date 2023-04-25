import { normalizePageUrl, pageSafetyGuard, executeMiddleware } from './utils'

export function useReLaunchInterceptor() {
  uni.addInterceptor('reLaunch', {
    invoke(result: UniReLaunchOptions) {
      result.routerType = 'reLaunch'
      normalizePageUrl(result)
      pageSafetyGuard(result, 'reLaunch')

      if (result.storedQuery) {
        const { setQuery } = usePageStore()
        setQuery(result.storedQuery)
      }

      executeMiddleware(result)
    }
  })
}
