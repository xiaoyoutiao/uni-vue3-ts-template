/** 接口响应数据格式 */
declare interface ApiRes<T = unknown> {
  code: number
  data: null | T
  message: string
  ok: boolean
}

/** 接口分页数据格式 */
declare interface ApiPagingRes<T = unknown> {
  records: T[]
  current: number
  total: number
  size: number
}

/** 接口分页数据格式 */
declare interface ApiPagingReq<T = Record<string, unknown>> {
  current: number
  size: number
  [key in T]: T[key]
}
