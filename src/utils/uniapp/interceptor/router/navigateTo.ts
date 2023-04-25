import { normalizePageUrl, pageSafetyGuard, executeMiddleware } from './utils'

export function useNavigateToInterceptor() {
  uni.addInterceptor('navigateTo', {
    invoke(result: UniNavigateToOptions) {
      result.routerType = 'navigateTo'
      normalizePageUrl(result)
      pageSafetyGuard(result, 'navigateTo')

      if (result.storedQuery) {
        const { setQuery } = usePageStore()
        setQuery(result.storedQuery)
      }

      executeMiddleware(result)
    }
  })
}
