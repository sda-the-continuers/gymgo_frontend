import { Url } from '~/api/urls'
import { gymOwnerUrl } from '~/api/account/gymOwner'

export type ChangePasswordRequest = {
  old_password: string;
  new_password: string;
}

export const changePasswordUrl: Url = {
  app: 'change-password',
  methodName: ['$patch'],
  parent: gymOwnerUrl
}
