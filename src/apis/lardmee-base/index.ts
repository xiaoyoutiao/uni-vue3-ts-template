import { basicHttp } from '@/utils/request'

const http = basicHttp.extends({
  baseURL: basicHttp.getBaseUrl() + '/lardmee-user',
})

export const findAllTree = () =>
  http.post(
    '/sys/businessSystem/query',
    {
      currentPage: 1,
      pageSize: 10,
    },
    {
      displayLoading: true,
      ignoreErrorMessage: true,
    }
  )
