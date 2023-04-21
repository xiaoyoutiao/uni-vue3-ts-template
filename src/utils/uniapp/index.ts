interface SimpleOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  success?: (result: any) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fail?: (error: any) => void
}

export function promisify<Options extends SimpleOptions = SimpleOptions>(
  callback: (options: Options) => void
) {
  return function (options: Options) {
    return new Promise<Parameters<NonNullable<Options['success']>>[0]>((resolve, reject) => {
      callback({
        ...options,
        success: (result) => {
          options?.success?.(result)
          resolve(result)
        },
        fail: (error) => {
          options?.fail?.(error)
          reject(error)
        }
      })
    })
  }
}
