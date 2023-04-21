export * from './miniapp'
export * from './page'

import { getDefinedEnvs } from '@/utils/config'
const definedEnvs = getDefinedEnvs()

/**【状态仓库】 - 应用相关 */
export const useAppStore = defineStore('app', () => {
  return {
    definedEnvs
  }
})
