export * from './miniapp'
export * from './page'

import { useStorage } from '@/composables/useStorage'
import { getDefinedEnvs } from '@/utils/config'
const definedEnvs = getDefinedEnvs()

/**【状态仓库】 - 应用相关 */
export const useAppStore = defineStore(
  'app',
  () => {
    const developValue = ref('')
    const developObj = reactive({
      name: '',
      age: 0
    })
    return {
      definedEnvs,
      developValue,
      developObj
    }
  },
  {
    persist: {
      enabled: true,
      enforceCustomStorage: true,
      strategies: [
        {
          key: 'develop-value',
          paths: ['developValue'],
          storage: useStorage({ maxAge: 1000 * 30, autoClear: true }) as Storage
        },
        {
          key: 'develop-obj',
          paths: ['developObj'],
          storage: useStorage({ maxAge: 1000 * 30, autoClear: true }) as Storage
        }
      ]
    }
  }
)
