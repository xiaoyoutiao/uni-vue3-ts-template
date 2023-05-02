import type { RouterMiddleware } from '../types'

let isLogin = false

export const authMiddleware: RouterMiddleware = (
  to: string,
  from: string,
  config: UniNavigateToOptions
) => {
  console.log('auth config :>> ', config)
  console.log('auth to :>> ', to)
  console.log('auth from :>> ', from)

  if (!isLogin) {
    isLogin = true
    return { type: 'reLaunch', url: PageEnum.Profile }
  }
}
