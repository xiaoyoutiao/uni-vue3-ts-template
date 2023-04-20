import 'vue'
declare module 'vue' {
  export interface GlobalComponents {
    BasicPaging: typeof import('@/components/packages/z-paging/components/z-paging/z-paging.vue')['default']
    BasicImg: typeof import('@/components/basic-img/basic-img.vue')['default']
    BasicSafearea: typeof import('@/components/basic-safearea/basic-safearea.vue')['default']
  }
}
