import { resolve } from 'path'

import { writeFile } from 'fs/promises'

import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import eslint from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import { type PageContext } from '@uni-helper/vite-plugin-uni-pages'

import pagesJson from './src/pages.json'

import { makeProxy } from './build/vite'

const dir = (path: string) => resolve(process.cwd(), './', path)

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const envs = loadEnv(mode, process.cwd()) as ImportMetaEnv

  function camelCase(str: string): string {
    return str.replace(/\/(.)/g, (_, letter) => letter.toUpperCase())
  }

  const paths = pagesJson.pages.reduce(
    (acc, p) => (acc[camelCase(p.path).replace(/^pages/, '')] = `/${p.path}`) && acc,
    {}
  )

  return defineConfig({
    define: {
      PageEnum: paths
    },
    plugins: [
      UniPages({
        onAfterWriteFile() {
          const template = `declare const PageEnum = ${JSON.stringify(paths, null, 2)} as const`
          writeFile(dir('./src/pages.d.ts'), template)
        }
      }),
      uni(),
      Unocss({}),
      eslint({}),
      AutoImport({
        imports: ['vue', 'uni-app'],
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
          // drop_console: true
        }
      }
    }
  })
}
