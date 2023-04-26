import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist-uni'
import { App } from 'vue'

export function usePinia(app: App) {
  const pinia = createPinia()
  pinia.use(piniaPersist)
  app.use(pinia)
  return pinia
}
