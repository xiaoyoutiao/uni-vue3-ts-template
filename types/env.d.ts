/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_DOMAIN: string
  readonly VITE_CONFIG_ENV: 'development' | 'testing' | 'production'
  readonly VITE_API_BASE_URL: string
  readonly VITE_PROXY_PATHS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
