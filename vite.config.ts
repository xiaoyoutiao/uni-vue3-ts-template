import { resolve } from 'path'

import { writeFile } from 'fs/promises'

import { defineConfig /* loadEnv, */ /* , ConfigEnv  */ } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import eslint from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import UniPages, { PageContext } from '@uni-helper/vite-plugin-uni-pages'
import checker from 'vite-plugin-checker'

import ViteDefine, { pageEnum } from './build/vite/define'

const dir = (path: string) => resolve(process.cwd(), './', path)

// https://vitejs.dev/config/
export default (/* { command }: ConfigEnv */) => {
  // const envs = loadEnv(mode, process.cwd()) as ImportMetaEnv

  return defineConfig({
    define: ViteDefine,
    plugins: [
      UniPages({
        exclude: ['service'],
        onBeforeWriteFile(ctx: PageContext) {
          const { pageMetaData, pagesGlobConfig } = ctx
          const { tabBar } = pagesGlobConfig || {}
          const { list } = tabBar || {}
          list?.forEach((tb) => {
            const metaData = pageMetaData.find((page) => page.path === tb.pagePath)
            metaData && (metaData.type = 'tabbar')
          })
        },
        onAfterWriteFile() {
          const template = `declare const PageEnum = ${JSON.stringify(pageEnum, null, 2)} as const`
          writeFile(dir('./src/pages.d.ts'), template)
        }
      }),
      uni(),
      Unocss({}),
      AutoImport({
        imports: ['vue', 'uni-app', 'pinia'],
        dirs: ['./src/store'],
        eslintrc: {
          enabled: true
        }
      }),
      eslint({
        emitWarning: true,
        emitError: true
      }),
      checker({
        typescript: true
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
    server: {},
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
