import { Url } from '~/api/urls'
import { gymOwnerUrl } from '~/api/account/gymOwner'
import { ACCOUNT_TYPE } from '~/api/gym'

// todo
export type ProfileEditRequest = {
  shaba?: string,
  full_name?: string,
}

export type ProfileGetEditResponse = {
  'shaba': string,
  'id': number,
  'full_name': string,
  'user': number,
  'wallet': number,
  'crm_account': number,
  'account_type': ACCOUNT_TYPE,
}
// 'profile/:id/
export const profileUrl: Url = {
  app: 'profile',
  methodName: ['$get', '$patch'],
  parent: gymOwnerUrl
}
