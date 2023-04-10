import { resolve } from 'path'

import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import eslint from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'

import { makeProxy } from './build/vite'

const dir = (path: string) => resolve(process.cwd(), './', path)

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const envs = loadEnv(mode, process.cwd()) as ImportMetaEnv

  return defineConfig({
    plugins: [
      uni(),
      Unocss({}),
      eslint({}),
      AutoImport({
        imports: ['vue'],
        eslintrc: {
          enabled: true
        }
      })
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: dir('src')
        },
        {
          find: '@ui',
          replacement: dir('node_modules/@dcloudio/uni-ui/lib')
        },
        {
          find: '#types',
          replacement: dir('types')
        }
      ]
    },
    server: {
      proxy: makeProxy(envs)
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  })
}
