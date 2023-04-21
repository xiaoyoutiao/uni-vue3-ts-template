import { isFunction } from '@/utils'

import { configMerge, isStringifyOptions, concatNumericProperties } from '../utils'

const defaultShowToastOptions: UniShowToastOptions = {
  icon: 'none',
  duration: 3000,
  mask: true,
  position: 'center'
}

export function useShowToastInterceptor() {
  uni.addInterceptor('showToast', {
    invoke(result: UniShowToastOptions) {
      configMerge(result, defaultShowToastOptions)

      let title = result.title || ''

      if (isStringifyOptions(result, 'title')) {
        title = concatNumericProperties(result)
      }

      result.title = title

      if (result.success) {
        const success = result.success
        result.success = (successResult) => {
          success(successResult)
          if (isFunction(result.onDelay) && Number(result.duration) > 0) {
            setTimeout(result.onDelay, result.duration)
          }
        }
      }
    }
  })
}
