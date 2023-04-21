export function useNavigateBackInterceptor() {
  uni.addInterceptor('navigateBack', {
    invoke(result: UniNavigateToOptions) {
      if (result.storedQuery) {
        const { setQuery } = usePageStore()
        setQuery(result.storedQuery)
      }
    }
  })
}
