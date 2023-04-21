import { pages } from 'virtual:uni-pages'

import { isObject } from '@/utils'

/**【状态仓库】 - 页面相关 */
export const usePageStore = defineStore('page', () => {
  const query = ref({})
  const onceQuery = ref({})

  function setQuery(data: AnyObject) {
    data = isObject(data) ? data : {}
    query.value = data
    onceQuery.value = data
  }

  function getQuery<Q extends AnyObject>() {
    return query.value as Q
  }

  function getQueryOnce<Q extends AnyObject>() {
    const r = onceQuery.value as Q
    onceQuery.value = {}
    return r
  }

  return {
    pages,
    setQuery,
    getQuery,
    getQueryOnce
  }
})
