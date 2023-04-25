export function useNavigateBackInterceptor() {
  uni.addInterceptor('navigateBack', {
    invoke(result: UniNavigateToOptions) {
      result.routerType = 'navigateBack'
      if (result.storedQuery) {
        const { setQuery } = usePageStore()
        setQuery(result.storedQuery)
      }
    }
  })
}
