import { Url } from '~/api/urls'
import { jwtUrl } from '~/api/account/jwt'

export type RefreshTokenPostRequest = {
  refresh: string,
}

export type RefreshTokenPostResponse = {
  refresh: string,
  access: string,
}

export const refreshTokenUrl: Url = {
  app: 'refresh',
  methodName: ['$post'],
  parent: jwtUrl
}
