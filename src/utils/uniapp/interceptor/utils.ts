// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function configMerge(origin: any, source: any) {
  Object.keys(source).forEach((key) => {
    if (!(key in origin)) {
      origin[key] = source[key]
    }
  })
}
