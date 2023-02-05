import Component from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import JwtDecoder from '~/mixins/jwtDecoder'
import AxiosRequest from '~/mixins/axiosRequest'
import { RefreshTokenPostResponse, refreshTokenUrl } from '~/api/account/jwt/refreshToken'

@Component
export default class AccessTokenHandler extends Mixins(JwtDecoder, AxiosRequest) {
  created () {
    this.updateAccessToken()
    // this.$store.commit('setAccessToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU2Mzg5ODEyLCJpYXQiOjE2NTAzODk4MTIsImp0aSI6ImRkYjA3OWQ1YjQ1MjQ0MWE5OTdhMDU5ZjRjNDYxNmJhIiwidXNlcl9pZCI6Miwid2FsbGV0X2lkIjoxLCJhY2NvdW50X2lkIjoxLCJjcm1fYWNjb3VudF9pZCI6MSwiYWNjb3VudF90eXBlIjoiQVRITEVURSJ9.iP8Wx-0iIb9yKpWJvnwW3aN7c64FWnLVww_yonhfEbb4_AG_CVCMrRo_XLmEH2q9lFRFA3XWgk1y2JglBy40vQ')
    // this.$store.commit('setRefreshToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU2Mzg3NTM2LCJpYXQiOjE2NTAzODc1MzYsImp0aSI6IjQ1YzM1ZTI3ZmI0NzRkMmM4ODVkMmFmMDhkMTJkMTYxIiwidXNlcl9pZCI6Miwid2FsbGV0X2lkIjoxLCJhY2NvdW50X2lkIjoxLCJjcm1fYWNjb3VudF9pZCI6MSwiYWNjb3VudF90eXBlIjoiQVRITEVURSJ9.5EF-qkrPNW8eGn-3x4v8o5uawMSI8ABUaTP5ELU_Pr_XX3wk36840_tkTmVl_3lLoKRtXb6eXtb--GhfHMthsQ')
  }

  logOut () {
    this.$store.commit('setRefreshToken', null)
    this.$router.push({ name: 'index/LoginRegister' })
  }

  fetchAccessToken () {
    // todo async function to get Access token and a timeout to update it
    console.log('state')
    console.log(this.$store.state)
    const refreshToken = this.$store.state.refreshToken
    if (!refreshToken) {
      this.logOut()
    }
    this.axiosRequest({
      requestName: '$post',
      url: this.prepareUrl(refreshTokenUrl),
      data: { refresh: refreshToken },
      thenFunc: (response: any) => {
        const data: RefreshTokenPostResponse = response.data
        console.log('access token updated')
        // const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDY1MDAyMzQ2ODl9.m_uWz1cbx_wZhlp5_Kp_9kdnX35JX2MjSdiSbh8qFTU'
        const accessToken = data.access
        this.$store.commit('setAccessToken', accessToken)
        const accessPayload = this.parseJwt(accessToken)
        setTimeout(this.updateAccessToken, accessPayload.exp - Date.now())
      },
      catchFunc: (error: any) => {
        // todo sad -> check_error, sep -> implementation
        // if refresh token is invalid, logout
        console.log(error)
        this.logOut()
      }
    })
  }

  updateAccessToken () {
    const accessToken = this.$store.state.accessToken
    console.log(`accessToken: ${accessToken}`)
    if (accessToken) {
      const { exp } = this.parseJwt(accessToken)
      const expDist = exp - Date.now() / 1000
      console.log(`exp: ${expDist}`)
      if (expDist > 0) {
        setTimeout(this.updateAccessToken, expDist)
      } else {
        this.fetchAccessToken()
      }
    } else {
      this.fetchAccessToken()
    }
  }
}
