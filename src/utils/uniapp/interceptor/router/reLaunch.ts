import { normalizePageUrl, pageSafetyGuard } from './utils'

export function useReLaunchInterceptor() {
  uni.addInterceptor('reLaunch', {
    invoke(result: UniReLaunchOptions) {
      normalizePageUrl(result)
      pageSafetyGuard(result, 'reLaunch')

      if (result.storedQuery) {
        const { setQuery } = usePageStore()
        setQuery(result.storedQuery)
      }
    }
  })
}
