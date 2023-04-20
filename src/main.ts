import { createSSRApp } from 'vue'
import 'uno.css'
import * as Pinia from 'pinia'

import ZPagingEmptyView from '@/components/packages/z-paging/components/z-paging-empty-view/z-paging-empty-view.vue'
import ZPaging from '@/components/packages/z-paging/components/z-paging/z-paging.vue'

import { useUniappInterceptor } from '@/utils/uniapp/interceptor'

import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)

  app.use(Pinia.createPinia())

  app.component('ZPagingEmptyView', ZPagingEmptyView)
  app.component('BasicPaging', ZPaging)

  useUniappInterceptor()

  return {
    app,
    Pinia
  }
}
