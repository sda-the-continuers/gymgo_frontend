import { Url } from '~/api/urls'
import { gymOwnerUrl } from '~/api/account/gymOwner'

export type SignUpRequest = {
  phone_number: string;
  full_name: string;
  sms_token: string;
}

export type SignUpResponse = {
  access_token: string,
  refresh_token: string,
}

export const signUpUrl: Url = {
  app: 'signup',
  methodName: ['$post'],
  parent: gymOwnerUrl
}
