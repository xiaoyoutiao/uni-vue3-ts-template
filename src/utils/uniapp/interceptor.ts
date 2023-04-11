import { has, isFunction } from '@/utils'

const defaultShowToastOptions: ShowToastOptions = {
  icon: 'none',
  duration: 3000,
  mask: true,
  position: 'center'
}

uni.addInterceptor('showToast', {
  invoke(result: ShowToastOptions) {
    Object.assign(result, defaultShowToastOptions, result)

    let title = result.title || ''

    if (!has(result, 'title') && has(result, '0')) {
      let num = 0
      while (has(result, String(num))) {
        title += result[num]
        num++
      }
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
