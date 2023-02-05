import { Url } from '~/api/urls'
import { athleteUrl } from '~/api/account/athlete'

export type LoginRequest = {
  phone_number: string;
  sms_token: string;
}
export type LoginResponse = {
  'access_token': string,
  'refresh_token': string,
}

export const loginUrl: Url = {
  app: 'sms-entry',
  methodName: ['$post'],
  parent: athleteUrl
}
