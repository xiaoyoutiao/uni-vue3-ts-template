import { resolve } from 'path'

import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import eslint from 'vite-plugin-eslint'

const dir = (path: string) => resolve(process.cwd(), './', path)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), eslint({})],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: dir('src'),
      },
      {
        find: '#types',
        replacement: dir('types'),
      },
    ],
  },
})
