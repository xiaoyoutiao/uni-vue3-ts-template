export type RouterMiddleware = (
  to: string,
  from: string,
  config: UniNavigateToOptions
) => void | boolean | string | { url: string; type: UniRouterType }
