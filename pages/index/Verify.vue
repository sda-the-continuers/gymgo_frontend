<template>
  <div class="verify">
    <div class="verify-header-body">
      <h2> {{ innerContext.enter }} </h2>
      <h4 class="guide-text">
        {{ body }}
      </h4>
      <input
        v-model="verifyCode"
        type="number"
        maxlength="5"
        min="0"
        max="99999"
        @keyup.enter="login"
      >
      <div class="all-options">
        <div class="options-right-side">
          <h6 class="countdown">
            {{ countdown|toPersianDigits }}
          </h6>
          <h6 @click="resend">
            {{ innerContext.sendAgain }}
          </h6>
        </div>
        <div class="change-phone-number" @click="changePhoneNumber">
          <h6>{{ innerContext.changePhoneNumber }}</h6>
        </div>
      </div>
      <h5 style="display: none; flex-direction: column; text-align: center; color: red; margin-top: 10px">
        {{ innerContext.pleaseCheckYourCode }}
      </h5>
    </div>
    <div class="buttons">
      <button :disabled="disabled" @click="login">
        <h2> {{ innerContext.enter }} </h2>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import { Cookies } from '~/utils/Cookies'
import AxiosRequest from '~/mixins/axiosRequest'
import JwtDecoder from '~/mixins/jwtDecoder'
import { LoginRequest, LoginResponse, loginUrl } from '~/api/account/athlete/entry/login'
import { ACCOUNT_TYPE, SendTokenRequest, sendTokenUrl } from '~/api/sms/sendToken'

@Component
export default class Verify extends Mixins(AxiosRequest, JwtDecoder) {
  innerContext = {
    enter: 'ورود',
    sendAgain: 'ارسال مجدد',
    changePhoneNumber: 'تغییر شماره',
    pleaseCheckYourCode: 'کد وارد شده نادرست است!'
  }

  get body () {
    return `لطفا کد چهار رقمی ارسال شده به شماره ${this.$options.filters.toPersianDigits(this.phoneNumber)} را وارد نمایید`
  }

  count = 0
  get countdown (): string {
    const formattedCount = this.count.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })

    return `00:${formattedCount}`
  }

  get disabled (): boolean {
    return this.count === 0
  }

  verifyCode = ''

  phoneNumber = ''

  changePhoneNumber () {
    // todo just go to loginRegister path
    this.$router.push({ name: 'index/LoginRegister' })
  }

  resend () {
    const data: SendTokenRequest = { phone_number: this.phoneNumber, account_type: ACCOUNT_TYPE.ATHLETE }
    this.axiosRequest({
      requestName: '$post',
      url: sendTokenUrl,
      data,
      thenFunc: (response) => {
        console.log('the response', response)
        // todo if it was successful, refresh the page
        this.$router.go(0)
      }
    })
  }

  login () {
    // const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDY1MDAyMzM1NzJ9.3VhZUU4MzM_gsSdeB8xvjqv3LMJwTQaWK0A1uq_j5FE'
    // this.$store.commit('setRefreshToken', refreshToken)
    // this.$router.push({ name: 'index/favoriteSports' })
    const data: LoginRequest = { phone_number: this.phoneNumber, sms_token: this.verifyCode }
    this.axiosRequest({
      requestName: '$post',
      url: loginUrl,
      data,
      thenFunc: (response) => {
        console.log('then')
        const data: LoginResponse = response
        console.log(data)
        this.$store.commit('setAccessToken', data.access_token)
        this.$store.commit('setRefreshToken', data.refresh_token)
        console.log('state')
        console.log(this.$store.state)
        Cookies.remove('verify_phone_number')
        this.$router.push({ name: 'index/FavoriteSports' })
      },
      catchFunc: () => {
        document.getElementsByTagName('input').item(0).style.borderColor = 'red'
        document.getElementsByTagName('h6').item(0).style.color = 'red'
        document.getElementsByTagName('h6').item(1).style.color = 'red'
        document.getElementsByTagName('h6').item(2).style.color = 'red'
        document.getElementsByTagName('h5').item(0).style.display = 'flex'
      }
    })
  }

  isRefreshTokenAvailable (): boolean {
    // todo if refresh token wasn't expired, go to panel
    const refreshToken = this.$store.state.refreshToken
    if (refreshToken) {
      const payload = this.parseJwt(refreshToken)
      if (payload.exp > Date.now()) {
        this.$router.push({ name: 'index/panel' })
        return true
      }
    }
    return false
  }

  created () {
    if (this.isRefreshTokenAvailable()) {
      return
    }

    this.phoneNumber = Cookies.get('verify_phone_number')
    console.log('phone_number', this.phoneNumber)
    if (!this.phoneNumber) {
      // this.$router.push({ name: 'index/LoginRegister' })
    }
  }

  mounted () {
    this.count = 60
    const interval = setInterval(() => {
      this.count--
      if (this.count === 0) {
        console.log('yes')
        clearInterval(interval)
      }
    }, 1000)
  }
}
</script>

<style scoped>
.verify{
  direction: rtl;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}

.verify .verify-header-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  /*height: 100%;*/
  padding: 0 10%;
  align-items: center;
}

.verify-header-body > h2 {
  text-align: center;
  margin-top: 70px;
  margin-bottom: 50px;
  font-weight: 700;
}

.verify-header-body .guide-text{
  text-align: center;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  font-weight: 500;
}

.verify-header-body > input{
  width: 100%;
  margin-bottom: 16px;
  border: none;
  outline: none;
  border-bottom: 1px solid ;
  text-align: center;
  background-color: transparent;
}

.verify-header-body .all-options {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.all-options .options-right-side {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
}

.all-options .change-phone-number {
  display: flex;
}

.change-phone-number h6 {
  margin-bottom: 0;
  margin-top: auto;
  font-weight: 600;
  cursor: pointer;
}

.options-right-side h6 {
  margin: 0;
  text-align: center;
  font-weight: 600;
}

.verify > .buttons{
  width: 100%;
  display: flex;
  /*position: absolute;*/
  /*bottom: 0;*/
  padding: min(10%,40px) 10% min(10%,40px) 10%;
}

.buttons > button {
  width: 100%;
}

.buttons > button > h6 {
  font-weight: 600;
}

</style>
