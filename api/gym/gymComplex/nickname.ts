import { Url } from '~/api/urls'
import { gymComplexUrl } from '~/api/gym/gymComplex'

export const nicknameUrl: Url = {
  app: 'nickname',
  methodName: ['$delete'],
  parent: gymComplexUrl
}
