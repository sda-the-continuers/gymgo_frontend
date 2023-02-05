import { Url } from '~/api/urls'
import { smsUrl } from '~/api/sms'

export enum ACCOUNT_TYPE {
  ATHLETE='ATHLETE',
  GYM_OWNER='GYM_OWNER'
}

export type SendTokenRequest = {
  phone_number: string;
  account_type: ACCOUNT_TYPE;
}

export const sendTokenUrl: Url = {
  app: 'send-token',
  methodName: ['$post'],
  parent: smsUrl
}
