import { isStringifyOptions, concatNumericProperties } from './utils'

export function useNavigateToInterceptor() {
  uni.addInterceptor('navigateTo', {
    invoke(result: NavigateToOptions) {
      if (isStringifyOptions(result, 'url')) {
        const url = concatNumericProperties(result)
        console.log('url :>> ', url)
        result.url = url
      }
      console.log('result :>> ', result)
    }
  })
}
