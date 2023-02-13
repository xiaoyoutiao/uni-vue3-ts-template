/** 服务端接口响应数据格式 */
declare interface BasicApiResponse {
  code: number
  data: null | Record<string, any> | any[]
  message: string
  ok: boolean
}

/** 自定义的axios请求配置 */
declare interface CustomAxiosRequestConfig {
  /** 是否忽略接口错误提示消息 */
  ignoreErrorMessage?: boolean
  /** 是否展示全局loading效果 */
  displayLoading?: boolean
}
