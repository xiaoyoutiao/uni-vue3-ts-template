import ajax, {
  AjaxInstance,
  AjaxInterceptorManager,
  AjaxRequestConfig,
  Fetcher,
  FetcherInstance
} from 'uni-ajax'

import { getDefinedEnvs } from '@/utils/config'

const { VITE_API_BASE_URL, VITE_API_DOMAIN } = getDefinedEnvs()

type AxiosInterceptorUse = Parameters<AjaxInterceptorManager<AnyObject>['use']>

interface Interceptors {
  requests: AxiosInterceptorUse[]
  responses: AxiosInterceptorUse[]
}

export interface HttpRequestConfig extends AjaxRequestConfig {
  /** 是否忽略接口错误提示消息 */
  ignoreErrMsg?: boolean
  loading?: boolean
  loadingText?: string
  /** 取消请求对象实例 */
  controller?: FetcherInstance
}

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
  private requestInstance: AjaxInstance<HttpRequestConfig>

  private pendingRequests: Map<FetcherInstance, FetcherInstance> = new Map()

  private axioConfig: HttpRequestConfig

  private interceptors: Interceptors = {
    requests: [],
    responses: []
  }

  constructor(config: HttpRequestConfig) {
    this.axioConfig = config
    this.requestInstance = ajax.create(config)
    const requestInterceptor = this.requestInstance.interceptors
      .request as AjaxInterceptorManager<HttpRequestConfig>

    requestInterceptor.use((config) => {
      if (config.controller) {
        config.fetcher = config.controller
        this.pendingRequests.set(config.controller, config.controller)
      }
      return config
    })

    this.requestInstance.interceptors.response.use(
      (response) => {
        if (response.config.fetcher) {
          this.pendingRequests.delete(response.config.fetcher)
        }
        return response
      },
      (error) => {
        if (error.config.fetcher) {
          this.pendingRequests.delete(error.config.fetcher)
        }
        return Promise.reject(error)
      }
    )
  }

  public get<R>(url: string, data?: AnyObject | null, config?: HttpRequestConfig) {
    return this.requestInstance.get<R>(url, data || {}, config)
  }

  public post<R>(url: string, data?: AnyObject | null, config?: HttpRequestConfig) {
    return this.requestInstance.post<R>(url, data || {}, config)
  }

  public put<R>(
    url: string,
    data?: AnyObject | null,
    config?: HttpRequestConfig
  ): Promise<AnyObject> {
    return this.requestInstance.put<R>(url, data || {}, config)
  }

  public delete(url: string, config?: HttpRequestConfig): Promise<AnyObject> {
    return this.requestInstance.delete(url, {}, config)
  }

  public cancelRequest(controller: FetcherInstance): void {
    const targetController = this.pendingRequests.get(controller)
    if (targetController) {
      targetController.abort()
      this.pendingRequests.delete(controller)
    }
  }

  public CancelController() {
    const controller = new Fetcher()
    return controller
  }

  public cancelAllRequests(): void {
    this.pendingRequests.forEach((controller) => {
      controller.abort()
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
    this.requestInstance.interceptors.response.use(...handlers)
  }
  registerRequestInterceptor(...handlers: AxiosInterceptorUse) {
    this.interceptors.requests.push(handlers)
    this.requestInstance.interceptors.request.use(...handlers)
  }
}

/** 基础的请求实例 */
export const basicHttp = new HttpClient({
  baseURL: VITE_API_DOMAIN + VITE_API_BASE_URL,
  timeout: 60 * 1000
})

/** 请求拦截 */
basicHttp.registerRequestInterceptor(
  (config: HttpRequestConfig) => {
    if (config.loading) {
      uni.showLoading({ mask: true, title: config.loadingText })
    }

    return config
  },
  (requestErr) => {
    throw requestErr
  }
)

/** 响应拦截 */
basicHttp.registerResponseInterceptor(
  (response) => {
    const { data: resData } = response
    const config: HttpRequestConfig = response.config

    if (config.loading) {
      uni.hideLoading()
    }

    if (resData.code === 200) {
      return resData.data
    }

    if (config.ignoreErrMsg !== true) {
      uni.showToast({ title: resData.message, icon: 'none', duration: 3000 })
    }

    const error = new ReponseError(resData.code, resData.message)
    throw error
  },
  (responseErr) => {
    // console.log('responseErr :>> ', responseErr);
    // const { code, message } = responseErr

    // if (code === 'ECONNABORTED' && message.includes('timeout')) {
    //   uni.showToast('请求超时')
    // }

    // if (code === 'ERR_BAD_REQUEST' && message.includes('404')) {
    //   uni.showToast('请求接口不存在')
    // }

    // if (code === 'ERR_BAD_RESPONSE' && message.includes('500')) {
    //   uni.showToast('请求失败')
    // }

    throw responseErr
  }
)
