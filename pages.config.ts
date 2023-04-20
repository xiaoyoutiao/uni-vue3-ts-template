import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [],
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'ts',
    navigationBarBackgroundColor: '#F8F8F8',
    backgroundColor: '#F8F8F8'
  },
  easycom: {
    autoscan: true,
    custom: {
      '^(basic-.*)': '@/components/$1/$1.vue'
    }
  }
})
