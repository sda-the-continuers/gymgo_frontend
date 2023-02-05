import { Url } from '~/api/urls'
import { accountUrl } from '~/api/account'

export type ProfilePicturePostRequest = {
  account: number
  file: File
  is_active: true
}

export const profilePictureUrl: Url = {
  app: 'profile-picture',
  methodName: ['$post'],
  parent: accountUrl
}
