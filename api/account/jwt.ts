import { Url } from '~/api/urls'
import { accountUrl } from '~/api/account'

export const jwtUrl: Url = {
  app: 'token',
  parent: accountUrl
}
