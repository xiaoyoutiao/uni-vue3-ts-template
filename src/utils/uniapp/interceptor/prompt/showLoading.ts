import { isStringifyOptions, concatNumericProperties } from '../utils'

export function useShowLoadingInterceptor() {
  uni.addInterceptor('showLoading', {
    invoke(result: UniShowLoadingOptions) {
      let title = result.title || ''

      if (isStringifyOptions(result, 'title')) {
        title = concatNumericProperties(result)
      }

      result.title = title
    }
  })
}
