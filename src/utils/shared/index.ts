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

export function mapFields<
  T,
  R extends Record<keyof T, string | number | symbol>
>(rigin: T, relation: R): { [RV in R[keyof R]]: any }

export function mapFields<
  T,
  R extends Record<keyof T, string | number | symbol>
>(rigin: T[], relation: R): { [RV in R[keyof R]]: any }[]

export function mapFields<
  OT,
  T,
  R extends Record<keyof T, string | number | symbol>,
  O extends { [RV in R[keyof R]]: OT }

  // O extends Record<R[keyof R], any>
>(origin: T | T[], relation: R) {
  const isArr = Array.isArray(origin)

  const result = (isArr ? origin : [origin]).map((oCur) =>
    Object.keys(relation).reduce(
      (output, oField) => ((output[relation[oField]] = oCur[oField]), output),
      {} as O
    )
  )

  return isArr ? result : result[0]
}

export const safeJsonParse = <V extends string, T>(
  value: V,
  defaultValue: T
) => {
  try {
    return JSON.parse(value)
  } catch (error) {
    return defaultValue
  }
}
