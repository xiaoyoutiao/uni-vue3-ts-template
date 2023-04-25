import { basicHttp } from '@/utils/request'

export function getCats() {
  return basicHttp.get('https://cat-fact.herokuapp.com/facts/random')
}
