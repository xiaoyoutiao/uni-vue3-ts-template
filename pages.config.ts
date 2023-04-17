import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [],
  // tabBar: {
  //   list: [{ pagePath: 'pages/home' }, { pagePath: 'pages/profile' }]
  // },
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'ts',
    navigationBarBackgroundColor: '#F8F8F8',
    backgroundColor: '#F8F8F8'
  },
  // easycom: {
  //   autoscan: true,
  //   custom: {
  //     '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
  //       'z-paging/components/z-paging$1/z-paging$1.vue'
  //   }
  // }
})
