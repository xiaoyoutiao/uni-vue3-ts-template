import type { ProxyOptions, HttpProxy } from 'vite'

type ProxyPathsOption = [string, string, Record<string, string> | undefined]

export const makeProxy = (
  envs: ImportMetaEnv
): Record<string, ProxyOptions> => {
  const { VITE_API_BASE_URL, VITE_API_DOMAIN, VITE_PROXY_PATHS } = envs
  const proxyPaths: ProxyPathsOption[] = JSON.parse(VITE_PROXY_PATHS)

  const configure: ProxyOptions['configure'] = (proxy) => {
    proxy.on('proxyReq', (proxyReq, req, res, options) => {
      const { path, method } = proxyReq
      console.log(`\n[请求代理  ${method}]:`)
      const domain = (options.target as { href: string }).href.replace(
        /.\/$/,
        ''
      )
      console.log(domain + path, '\n')
    })
  }

  const proxyOptions: Record<string, ProxyOptions> = {}

  proxyPaths.forEach(([path, target, rewriteObj]) => {
    proxyOptions[path] = {
      target,
      configure,
      secure: false,
      rewrite: (path) => {
        if (rewriteObj !== undefined) {
          for (const key in rewriteObj) {
            if (Object.prototype.hasOwnProperty.call(rewriteObj, key)) {
              path = path.replace(new RegExp(key), rewriteObj[key])
            }
          }
        }

        return path.replace(/^\/\//, '/')
      },
    }
  })

  proxyOptions[VITE_API_BASE_URL] = {
    target: VITE_API_DOMAIN,
    secure: false,
    configure,
    rewrite: (path) => path.replace(/^\/\//, '/'),
  }

  return proxyOptions
}
