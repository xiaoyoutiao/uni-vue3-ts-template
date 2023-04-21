/**【状态仓库】 - 页面相关 */
export const useAppStore = defineStore('page', () => {
  const query: AnyObject = ref({})

  return {
    query
  }
})
