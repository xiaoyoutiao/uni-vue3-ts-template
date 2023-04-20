import { omit } from '@/utils'
import { promisify } from '@/utils/uniapp'

const { miniProgram } = uni.getAccountInfoSync()

interface LocationCache {
  location: UniApp.GetLocationSuccess | null
  expires: number | null
}

interface GetLocationAsyncOptions extends UniApp.GetLocationOptions {
  /** 【自定义参数】是否忽略缓存强制调用获取位置信息 */
  force?: boolean
  /** 【自定义参数】是否静默获取位置信息, 不做任何提示和引导 */
  silent?: boolean
}

async function guideOpenLocationSetting() {
  const modal = await promisify(uni.showModal)({
    title: '小程序位置消息未开启',
    content: '需要获取您的位置信息，请开启位置消息设置',
    confirmText: '去开启'
  })

  if (!modal.confirm) return Promise.reject('用户拒绝获取位置消息')

  const setting = await promisify(uni.openSetting)({})
  const openedLocation = setting.authSetting['scope.userLocation']
  return openedLocation ? true : false
}

async function ensureLocationSettingsOpened() {
  const setting = await promisify(uni.getSetting)({})
  const openedLocation = setting.authSetting['scope.userLocation']

  if (openedLocation === false) {
    return (await guideOpenLocationSetting()) ? true : Promise.reject('用户位置消息设置未打开')
  }
}

async function resolveLocationError(error: { errMsg: string }) {
  // 没开启系统定位 / 未给微信位置授权
  if (
    error.errMsg === 'getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF' ||
    error.errMsg.indexOf('system permission denied') > -1
  ) {
    return uni.showModal({
      title: '手机定位未开启或应用未授权',
      content: '需要获取您的位置信息，请在系统设置中开启定位服务再重试~',
      confirmText: '确定',
      showCancel: false
    })
  }
  // 用户在小程序中未授权 （新老版本、平台返回不同）
  if (
    error.errMsg == 'getLocation:fail auth deny' ||
    error.errMsg == 'getLocation:fail:auth denied' ||
    error.errMsg == 'getLocation:fail authorize no response'
  ) {
    uni.showToast('获取位置信息失败')
  }
}

/**【状态仓库】 - 小程序相关*/
export const useMiniappStore = defineStore('miniapp', () => {
  const version = ref(miniProgram.version)
  const envVersion = ref(miniProgram.envVersion)
  const appid = ref(miniProgram.appId)

  /** 👇 定位信息 👇 */
  const locationCache = reactive<LocationCache>({
    location: null,
    expires: null
  })
  const isLocationCacheValid = () => {
    if (!locationCache.location) return false
    const now = new Date().getTime()
    return locationCache.expires && locationCache.expires > now
  }
  const cacheLocation = (location: UniApp.GetLocationSuccess) => {
    if (!location) return
    locationCache.location = location
    locationCache.expires = new Date().getTime() + 300 * 1000
  }
  const getLocationAsync = async (options?: GetLocationAsyncOptions) => {
    options = options || {}

    if (!options.silent) {
      await ensureLocationSettingsOpened()
    }

    if (isLocationCacheValid() && options.force !== true) return locationCache.location
    const usedOptions = omit(options, 'success', 'fail', 'force')
    console.info('调用"uni.getLocation"能力')
    const location = await promisify(uni.getLocation)({
      ...usedOptions,
      fail(error) {
        resolveLocationError(error)
        if (options?.fail) options.fail(error)
      }
    })
    cacheLocation(location)

    return location
  }

  return {
    version,
    envVersion,
    appid,
    getLocationAsync
  }
})
