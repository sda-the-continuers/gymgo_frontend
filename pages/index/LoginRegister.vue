<template>
  <div class="signup-signin">
    <div class="signup-signin-header-body">
      <h2>
        {{ innerContext.loginRegister }}
      </h2>
      <h4>
        {{ innerContext.welcomeText }}
      </h4>
      <h4>
        {{ innerContext.infoText }}
      </h4>
      <h4 class="enter-phone-number">
        {{ innerContext.pleaseEnterUrPhone }}
      </h4>
      <input
        v-model="phoneNumber"
        type="number"
        :placeholder="innerContext.phoneSample"
        min="0"
        maxlength="11"
        @keyup.enter="loginRegister"
      >
      <h5 style="display: none; flex-direction: column; text-align: center; color: red;">
        {{ innerContext.pleaseCheckYourNumber }}
      </h5>
    </div>
    <div class="buttons">
      <button @click="loginRegister">
        <h2> {{ innerContext.receiveCode }} </h2>
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
import { ACCOUNT_TYPE, SendTokenRequest, sendTokenUrl } from '~/api/sms/sendToken'

@Component
export default class LoginRegister extends Mixins(AxiosRequest, JwtDecoder) {
  innerContext = {
    loginRegister: 'ورود / ثبت نام',
    welcomeText: 'به جیم‌تایم خوش آمدید.',
    infoText: 'برای استفاده از برنامه شما نیاز دارید ابتدا وارد حساب کاربری خود شوید و یا در آن ثبت‌نام کنید!',
    pleaseEnterUrPhone: 'لطفا شماره خود را وارد نمایید',
    phoneSample: 'برای مثال 09123456789',
    receiveCode: 'دریافت کد و ورود',
    pleaseCheckYourNumber: 'لطفا شماره تلفن خود را به صورت صحیح وارد نمایید'
  }

  phoneNumber = ''

  loginRegister () {
    const data: SendTokenRequest = { phone_number: this.phoneNumber, account_type: ACCOUNT_TYPE.ATHLETE }
    this.axiosRequest({
      requestName: '$post',
      url: sendTokenUrl,
      data,
      thenFunc: (response) => {
        console.log('the response', response)
        console.log(this.phoneNumber)
        Cookies.set('verify_phone_number', this.phoneNumber)
        console.log('phone_number', Cookies.get('verify_phone_number'))
        this.$router.push({ name: 'index/Verify' })
      },
      catchFunc: () => {
        document.getElementsByTagName('input').item(0).style.borderColor = 'red'
        document.getElementsByTagName('h5').item(0).style.display = 'flex'
      }
    })
  }

  // inputReStyle () {
  //   document.getElementsByTagName('input').item(0).style.color = 'blue'
  // }

  isRefreshTokenAvailable (): boolean {
    // todo if refresh token wasn't expired, go to panel
    const refreshToken = this.$store.state.refreshToken
    console.log(`refreshToken: ${refreshToken}`)
    if (refreshToken) {
      const payload = this.parseJwt(refreshToken)
      if (payload.exp > Date.now() / 1000) {
        this.$router.push({ name: 'index/panel' })
        return true
      }
    }
    return false
  }

  created () {
    this.isRefreshTokenAvailable()
  }
}
</script>

<style scoped>
.signup-signin{
  direction: rtl;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: space-between;
  overflow-y: auto;
}

.signup-signin .signup-signin-header-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  /*height: 100%;*/
  padding: 0 10%;
  align-items: center;
}

.signup-signin-header-body h2 {
  text-align: center;
  margin-top: 70px;
  margin-bottom: 50px;
  font-weight: 700;
}

.signup-signin-header-body h4 {
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  font-weight: 500;
}
.signup-signin-header-body .enter-phone-number {
  text-align:  center;
  margin-bottom: 40px;
}
.signup-signin-header-body input{
  background-color: transparent;
  width: 100%;
  margin-bottom: 15px;
  border: none;
  border-bottom: 1px solid ;
  text-align: center;
  direction: ltr;
  padding-bottom: 5px;
  outline: none;
  font-size: min(24px, calc(4.44vw + 2.25vh)/2);
}

.buttons {
  width: 100%;
  display: flex;
  /*position: absolute;*/
  /*bottom: 0;*/
  padding: 0 10% max(20px,min(10%,40px)) 10%;
}

.buttons > button{
  width: 100%;
}

.buttons > button > h6 {
  font-weight: 600;
}
</style>
