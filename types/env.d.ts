/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_DOMAIN: string
  readonly VITE_MP_ENV: 'development' | 'testing' | 'production'
  readonly VITE_API_BASE_URL: string
  readonly VITE_PROXY_PATHS: string
  readonly VITE_BUILD_VER: string // 小构建版本号
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
