import { Url } from '~/api/urls'
import { gymOwnerUrl } from '~/api/account/gymOwner'

export type SmsLoginRequest = {
  phone_number: string;
  sms_token: string;
}
export type SmsLoginResponse = {
  access_token: string,
  refresh_token: string,
}
export const smsLoginUrl: Url = {
  app: 'sms-login',
  parent: gymOwnerUrl,
  methodName: ['$post']
}
