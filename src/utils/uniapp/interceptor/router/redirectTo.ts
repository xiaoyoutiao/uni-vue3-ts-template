import { normalizePageUrl, pageSafetyGuard } from './utils'

export function useRedirectToInterceptor() {
  uni.addInterceptor('redirectTo', {
    invoke(result: UniRedirectToOptions) {
      normalizePageUrl(result)
      pageSafetyGuard(result, 'redirectTo')

      if (result.storedQuery) {
        const { setQuery } = usePageStore()
        setQuery(result.storedQuery)
      }
    }
  })
}
