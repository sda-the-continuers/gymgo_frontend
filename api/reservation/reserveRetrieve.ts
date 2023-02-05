import { Url } from '~/api/urls'
import { reservationUrl } from '~/api/reservation'

// reserve/:id
export const reserveUrl: Url = {
  app: 'reserve',
  methodName: ['$get'],
  parent: reservationUrl
}
