import { Url } from '~/api/urls'
import { gymOwnerUrl } from '~/api/account/gymOwner'

export type SetPasswordRequest = {
  new_password: string
}

export const setPasswordUrl: Url = {
  app: 'set-password',
  methodName: ['$patch'],
  parent: gymOwnerUrl
}
