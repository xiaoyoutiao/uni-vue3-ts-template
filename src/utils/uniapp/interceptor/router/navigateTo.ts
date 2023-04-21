import { normalizePageUrl, pageSafetyGuard } from './utils'

export function useNavigateToInterceptor() {
  uni.addInterceptor('navigateTo', {
    invoke(result: UniNavigateToOptions) {
      normalizePageUrl(result)
      pageSafetyGuard(result, 'navigateTo')

      if (result.storedQuery) {
        const { setQuery } = usePageStore()
        setQuery(result.storedQuery)
      }
    }
  })
}
