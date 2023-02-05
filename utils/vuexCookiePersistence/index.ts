import VuexPersistence from 'vuex-persist'
// import { Cookies } from '../Cookies'
import { cookieStorage } from './CookieStorage'

export const vuexCookiePersistence = new VuexPersistence({
  storage: cookieStorage
  // restoreState: (key) => {
  //   console.log('restoring state')
  //   const jj = Cookies.get(key)
  //   console.log(jj)
  //   return jj
  // },
  // saveState (key, state) {
  //   console.log(`state is saving key ${key}`)
  //   console.log(JSON.stringify(state))
  //   Cookies.set(key, state)
  //   // console.log('access received:')
  //   console.log(Cookies.get())
  // }
})
