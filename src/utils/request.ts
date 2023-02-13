import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  type AxiosInterceptorManager,
  isAxiosError,
  type AxiosResponse,
  AxiosHeaders,
} from 'axios'

import { getDefinedEnvs } from '@/utils/config'

const { VITE_API_BASE_URL } = getDefinedEnvs()

type AxiosInterceptorUse = Parameters<AxiosInterceptorManager<any>['use']>

interface Interceptors {
  requests: AxiosInterceptorUse[]
  responses: AxiosInterceptorUse[]
}

export type HttpRequestConfig = AxiosRequestConfig & CustomAxiosRequestConfig

class ReponseError extends Error {
  code: number

  constructor(code: number, message: string) {
    super()
    this.code = code
    this.message = message
  }
}

export const isResponseError = (value: unknown): value is ReponseError => {
  return value instanceof ReponseError
}

export class HttpClient {
  private axiosInstance: AxiosInstance

  private pendingRequests: Map<string, AbortController> = new Map()

  private axioConfig: HttpRequestConfig

  private interceptors: Interceptors = {
    requests: [],
    responses: [],
  }

  constructor(config: HttpRequestConfig = {}) {
    this.axioConfig = config
    this.axiosInstance = axios.create(config)

    this.axiosInstance.interceptors.request.use((config) => {
      const controller = new AbortController()
      config.signal = controller.signal
      const url = this.getUniqueRequestKey(config)
      this.pendingRequests.set(url, controller)
      return config
    })

    this.axiosInstance.interceptors.response.use(
      (response) => {
        const url = this.getUniqueRequestKey(response.config)
        this.pendingRequests.delete(url)
        return response
      },
      (error) => {
        if (!axios.isCancel(error)) {
          const url = this.getUniqueRequestKey(error.config)
          this.pendingRequests.delete(url)
        }
        return Promise.reject(error)
      }
    )
  }

  private getUniqueRequestKey(config: HttpRequestConfig): string {
    return `${config.method?.toUpperCase()}_${config.url}`
  }

  public get(url: string, config?: HttpRequestConfig): Promise<any> {
    return this.axiosInstance.get(url, config)
  }

  public post(
    url: string,
    data?: any,
    config?: HttpRequestConfig
  ): Promise<any> {
    return this.axiosInstance.post(url, data, config)
  }

  public put(
    url: string,
    data?: any,
    config?: HttpRequestConfig
  ): Promise<any> {
    return this.axiosInstance.put(url, data, config)
  }

  public delete(url: string, config?: HttpRequestConfig): Promise<any> {
    return this.axiosInstance.delete(url, config)
  }

  public cancelRequest(config: HttpRequestConfig): void {
    const url = this.getUniqueRequestKey(config)
    const cancelTokenSource = this.pendingRequests.get(url)
    if (cancelTokenSource) {
      cancelTokenSource.abort()
      this.pendingRequests.delete(url)
    }
  }

  public cancelAllRequests(): void {
    this.pendingRequests.forEach((cancelTokenSource) => {
      cancelTokenSource.abort()
    })
    this.pendingRequests.clear()
  }
  public extends(config?: HttpRequestConfig) {
    const extendHttp = new HttpClient({ ...this.axioConfig, ...config })
    this.interceptors.requests.forEach((hanslers: AxiosInterceptorUse) =>
      extendHttp.registerRequestInterceptor(...hanslers)
    )
    this.interceptors.responses.forEach((hanslers: AxiosInterceptorUse) =>
      extendHttp.registerResponseInterceptor(...hanslers)
    )

    return extendHttp
  }
  public getBaseUrl() {
    return this.axioConfig.baseURL
  }
  registerResponseInterceptor(...handlers: AxiosInterceptorUse) {
    this.interceptors.responses.push(handlers)
    this.axiosInstance.interceptors.response.use(...handlers)
  }
  registerRequestInterceptor(...handlers: AxiosInterceptorUse) {
    this.interceptors.requests.push(handlers)
    this.axiosInstance.interceptors.request.use(...handlers)
  }
}

/** 基础的请求实例 */
export const basicHttp = new HttpClient({
  baseURL: VITE_API_BASE_URL,
  timeout: 3 * 1000,
})

/** 请求拦截 */
basicHttp.registerRequestInterceptor(
  (config: HttpRequestConfig) => {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set('token', '')
    }

    if (config.displayLoading) {
      console.log('展示全局loading')
    }

    return config
  },
  (requestErr) => {
    throw requestErr
  }
)

/** 响应拦截 */
basicHttp.registerResponseInterceptor(
  (response: AxiosResponse<BasicApiResponse>) => {
    const { data: resData } = response
    const config: HttpRequestConfig = response.config
    if (resData.code === 200) {
      return resData.data
    }

    if (config.displayLoading) {
      console.log('取消全局loading')
    }

    if (config.ignoreErrorMessage !== true) {
      console.log('错误消息提示', resData.message)
    }

    const error = new ReponseError(resData.code, resData.message)
    throw error
  },
  (responseErr) => {
    if (isAxiosError(responseErr)) {
      const { code, message } = responseErr

      if (code === 'ECONNABORTED' && message.includes('timeout')) {
        console.log('请求超时')
      }

      if (code === 'ERR_BAD_REQUEST' && message.includes('404')) {
        console.log('请求接口不存在')
      }
    }

    console.log('responseErr :>> ', responseErr)
    throw responseErr
  }
)
