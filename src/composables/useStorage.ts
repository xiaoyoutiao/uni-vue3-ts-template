interface UseStorageInstance extends Storage {
  getItem: <D>(key: string) => D | null
  setItem: <V>(key: string, value: V, options?: UseStorageOptions) => void
}

interface UseStorageOptions {
  /** 缓存时效 (ms) */
  maxAge?: number
  /** 是否在失效后自动清除缓存 */
  autoClear?: boolean
}

interface StorageItem {
  _val_: string
  _exp_: number
}

function storageSetter(key: string, value: unknown, setterOptions?: UseStorageOptions) {
  const expires = setterOptions?.maxAge ?? -1
  const _val_ = JSON.stringify(value)
  const _exp_ = expires === -1 ? -1 : new Date().getTime() + expires

  const state: StorageItem = {
    _val_,
    _exp_
  }

  uni.setStorageSync(key, state)
}

function storageGetter<D>(key: string, getterOptions?: UseStorageOptions) {
  const item: StorageItem = uni.getStorageSync(key)
  if (!item) return null

  if (item._exp_ !== -1 && new Date().getTime() >= item._exp_) {
    if (getterOptions?.autoClear) {
      uni.removeStorageSync(key)
    }
    return null
  }

  return JSON.parse(item._val_) as D
}

export function useStorage(options?: UseStorageOptions): UseStorageInstance {
  let keys: string[] = []
  let length = 0
  const optMaxAge = options?.maxAge

  function updateInfo() {
    const { keys: infoKeys } = uni.getStorageInfoSync()
    length = infoKeys.length
    keys = infoKeys
  }

  function getItem<D>(key: string) {
    const result = storageGetter<D>(key, options)
    options?.autoClear && updateInfo()
    return result
  }

  function setItem<V>(key: string, value: V, options?: UseStorageOptions) {
    const rawValue = unref(value)
    storageSetter(key, rawValue, { ...options, maxAge: options?.maxAge ?? optMaxAge })
    updateInfo()
  }

  function clear() {
    uni.clearStorageSync()
    updateInfo()
  }

  function removeItem(key: string) {
    uni.removeStorageSync(key)
    updateInfo()
  }

  function key(index: number) {
    return keys[index]
  }

  return {
    length,
    getItem,
    setItem,
    clear,
    key,
    removeItem
  }
}
