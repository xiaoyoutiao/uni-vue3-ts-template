export const sleep = (delay: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, delay))

/**
 * @todo 类型定义不够完善
 */
export const defineEnum = <
  K extends string,
  V extends string | number,
  D extends string
>(
  list: Readonly<Array<[K, V, D]>>
): Readonly<{ [prop in K]: V } & { [prop in V]: D }> => {
  const kv = {} as { [prop in K]: V }
  const vd = {} as { [prop in V]: D }

  list.forEach(([key, value, desc]) => {
    kv[key] = value
    vd[value] = desc
  })

  return {
    ...kv,
    ...vd,
  }
}
