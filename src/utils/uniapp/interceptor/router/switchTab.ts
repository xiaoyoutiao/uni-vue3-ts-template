import { normalizePageUrl, pageSafetyGuard } from './utils'

export function useSwitchTabInterceptor() {
  uni.addInterceptor('switchTab', {
    invoke(result: UniSwitchTabOptions) {
      normalizePageUrl(result)
      pageSafetyGuard(result, 'switchTab')

      if (result.storedQuery) {
        const { setQuery } = usePageStore()
        setQuery(result.storedQuery)
      }
    }
  })
}
