import { Url } from '~/api/urls'
import { gymUrl } from '~/api/gym'

export type GymScheduledSessionResponse = {
  'id': number,
  'gymnasium': number,
  'start_datetime': string,
  'jalali_start_datetime': string,
  'end_datetime': string,
  'jalali_end_datetime': string,
  'state': string,
  'state_fa': string,
  'price': number
}[]

// params: ?gymnasium=1&start_datetime__gte=2021-03-11T00:00:00&start_datetime__lte=2023-03-12T00:00:00
export const gymScheduledSessionUrl: Url = {
  app: 'scheduled-session',
  methodName: ['$get'],
  parent: gymUrl
}
