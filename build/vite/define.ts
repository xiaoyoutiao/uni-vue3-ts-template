import pagesJson from '../../src/pages.json'

function camelCase(str: string): string {
  return str.replace(/\/(.)/g, (_, letter) => letter.toUpperCase())
}

export const pageEnum = pagesJson.pages.reduce(
  (acc, p) =>
    (acc[camelCase(p.path.replace(/^pages/, '').replace(/\/index$/, ''))] = `/${p.path}`) && acc,
  {}
)

export default {
  PageEnum: pageEnum
}
