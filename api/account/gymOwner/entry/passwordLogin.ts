import { Url } from '~/api/urls'
import { gymOwnerUrl } from '~/api/account/gymOwner'

export type PasswordLoginRequest = {
  phone_number: string;
  password: string;
}

export type PasswordLoginResponse = {
  access_token: string,
  refresh_token: string,
}

export const passwordLoginUrl: Url = {
  app: 'password-login',
  methodName: ['$post'],
  parent: gymOwnerUrl
}
