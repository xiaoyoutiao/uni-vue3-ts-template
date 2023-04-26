import { PINIA_PERSIST_KEY_PREFIX } from '@/settings/store'

export function storageKey(name: string) {
  return PINIA_PERSIST_KEY_PREFIX + name
}
