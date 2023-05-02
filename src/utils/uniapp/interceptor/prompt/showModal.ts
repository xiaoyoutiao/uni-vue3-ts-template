import { isFunction } from '@/utils'

export function useShowModalInterceptor() {
  uni.addInterceptor('showModal', {
    invoke(config: UniShowModalOptions) {
      if (config.success && isFunction(config.onConfirm)) {
        const success = config.success
        config.success = (result) => {
          if (result.confirm) {
            config.onConfirm && config.onConfirm(result.content || '')
          }
          success(result)
        }
      }
    }
  })
}
