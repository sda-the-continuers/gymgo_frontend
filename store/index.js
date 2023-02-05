import { vuexCookiePersistence } from '~/utils/vuexCookiePersistence'

export const plugins = [vuexCookiePersistence.plugin]

export const state = () => ({
  refreshToken: null,
  accessToken: null
})

export const mutations = {
  setRefreshToken (state, refreshToken) {
    state.refreshToken = refreshToken
  },
  setAccessToken (state, accessToken) {
    state.accessToken = accessToken
  }
}
