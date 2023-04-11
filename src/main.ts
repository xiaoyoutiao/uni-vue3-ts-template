import { createSSRApp } from 'vue'
import '@/utils/uniapp/interceptor'

import App from './App.vue'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
