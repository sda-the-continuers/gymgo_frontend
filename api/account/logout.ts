import { Url } from '~/api/urls'
import { accountUrl } from '~/api/account'

export const logoutUrl: Url = {
  app: 'logout',
  methodName: ['$get'],
  parent: accountUrl
}
