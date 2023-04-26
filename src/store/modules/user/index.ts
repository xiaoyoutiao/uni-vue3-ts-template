import { storageKey } from '@/store/utils'

/**【状态仓库】 - 用户相关 */
export const useUserStore = defineStore(
  'user',
  () => {
    // TODO 需要过期时间处理
    const accessToken = ref('')
    const openId = ref('')

    return {
      accessToken,
      openId
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ key: storageKey('user'), paths: ['accessToken'] }]
    }
  }
)
