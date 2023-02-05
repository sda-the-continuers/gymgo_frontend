import * as c from 'js-cookie'
import { CookieAttributes } from 'js-cookie'

const domain = () => window.location.hostname
console.log('domain')
console.log(domain())
const cookieAttributes: CookieAttributes = {
  sameSite: 'Strict',
  // secure: true,
  domain: domain()
}
export const Cookies = c.withAttributes(cookieAttributes)
