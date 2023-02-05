import { Url } from '~/api/urls'
import { athleteUrl } from '~/api/account/athlete'

export type SignUpRequest = {
  phone_number: string;
  sms_token: string;
  referral_code: string;
}

export type SignUpResponse = {
  'access_token': string,
  'refresh_token': string,
}

export const signUpUrl: Url = {
  app: 'signup',
  methodName: ['$post'],
  parent: athleteUrl
}
