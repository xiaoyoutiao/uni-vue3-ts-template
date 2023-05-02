import type { RouterMiddleware } from '../types'

export const logMiddleware: RouterMiddleware = (
  to: string,
  from: string,
  config: UniNavigateToOptions
) => {
  console.log('log config :>> ', config)
  console.log('log to :>> ', to)
  console.log('log from :>> ', from)
}
