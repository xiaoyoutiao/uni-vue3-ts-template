import { resolve } from 'path'

import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import eslint from 'vite-plugin-eslint'

const dir = (path: string) => resolve(process.cwd(), './', path)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), Unocss({}), eslint({})],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: dir('src'),
      },
      {
        find: '@ui',
        replacement: dir('node_modules/@dcloudio/uni-ui/lib'),
      },
      {
        find: '#types',
        replacement: dir('types'),
      },
    ],
  },
})
