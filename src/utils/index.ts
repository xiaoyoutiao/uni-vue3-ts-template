const rawTypeTag = (value: unknown) =>
  Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase()

export const isString = (value: unknown) => rawTypeTag(value) === 'string'

export const isNumber = (value: unknown) => rawTypeTag(value) === 'number'
