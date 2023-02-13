export const sleep = (delay: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, delay))

export const defineEnum = <
  T extends Readonly<Readonly<[string, string | number, string]>[]>
>(
  list: T
) => {
  const kv = {}
  const vd = {}

  const defineReadonlyProperty = <T>(
    o: T,
    p: string | number,
    v: unknown
  ): void => {
    Object.defineProperty(o, p, {
      writable: false,
      configurable: false,
      value: v,
    })
  }

  list.forEach((item) => {
    const [key, value, desc] = item
    defineReadonlyProperty(kv, key, value)
    defineReadonlyProperty(kv, value, desc)
  })

  return {
    ...(kv as {
      readonly [Entry in typeof list[number] as Entry[0]]: Entry[1]
    }),
    ...(vd as {
      readonly [Entry in typeof list[number] as Entry[1]]: Entry[2]
    }),
  }
}
