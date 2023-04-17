import { createSSRApp } from 'vue'

import '@/utils/uniapp/interceptor'

import 'uno.css'

import ZPagingEmptyView from '@/components/packages/z-paging/components/z-paging-empty-view/z-paging-empty-view.vue'
import ZPaging from '@/components/packages/z-paging/components/z-paging/z-paging.vue'

import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)

  app.component('ZPagingEmptyView', ZPagingEmptyView)
  app.component('BasicPaging', ZPaging)

  return {
    app
  }
}
