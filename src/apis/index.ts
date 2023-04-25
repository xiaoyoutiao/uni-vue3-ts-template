import { basicHttp } from '@/utils/request'

export function getCats(id: number) {
  return basicHttp.get('https://cat-fact.herokuapp.com/facts/random?id=' + id)
}
