<template>
  <div class="payment-page">
    <div class="address">
      <p>
        {{ reservedGym.complexName }}
        >
        {{ reservedGym.gymnasiumName }}
        >
        {{ innerContext.submit }}
      </p>
    </div>
    <div class="info">
      <div class="complex-name">
        <h4 class="h4-700">
          {{ innerContext.complexName }}
        </h4>
        <h4 class="h4-400">
          {{ reservedGym.complexName }}
        </h4>
      </div>
      <div class="gymnasium-name">
        <h4 class="h4-700">
          {{ innerContext.serviceType }}
        </h4>
        <h4 class="h4-400">
          {{ reservedGym.gymnasiumName }}
        </h4>
      </div>
      <div class="date">
        <h4 class="h4-700">
          {{ innerContext.date | toPersianDigits }}
        </h4>
        <h4 class="h4-400 gym-date">
          {{ reservedGym.data | toPersianDigits }}
        </h4>
      </div>
    </div>
    <div class="reserve-ball">
      <div class="ball-info">
        <h4> {{ innerContext.ballReserve }} </h4>
        <div class="ball-count">
          <button class="ball-increase" @click="increaseBallNum">
            +
          </button>
          <h4> {{ count | toPersianDigits }} {{ innerContext.num }} </h4>
          <button class="ball-decrease" @click="decreaseBallNum">
            -
          </button>
        </div>
      </div>
      <div class="ball-cost">
        <h4> {{ innerContext.priceOfBalls }} {{ reservedGym.ballCost | toPersianDigits }} {{ innerContext.currency }} </h4>
      </div>
    </div>
    <div v-if="hasCode===false" class="discount-button">
      <button @click="hasCode=!hasCode">
        {{ innerContext.discountCode }}
      </button>
    </div>
    <div v-else class="discount-code">
      <input v-model="discountCode" :placeholder="innerContext.discountCode">
      <button @click="checkCode">
        {{ innerContext.checkCode }}
      </button>
    </div>
    <div class="total-price">
      <h2>
        {{ innerContext.paymentPrice }}
      </h2>
      <h2 class="total-price-colored">
        {{ reservedGym.totalCost | toPersianDigits }} {{ innerContext.currency }}
      </h2>
    </div>
    <div class="laws">
      <div class="check-box">
        <input v-model="lawCheckBox" type="checkbox">
      </div>
      <h6> {{ innerContext.rules }} </h6>
    </div>
    <div class="submit-buttons">
      <button :disabled="lawCheckBox===false">
        <h4> {{ innerContext.submit }} </h4>
      </button>
      <!--      <button>-->
      <!--        {{ innerContext.back }}-->
      <!--      </button>-->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { ReservedGym } from '~/api/reservedGym'

@Component
export default class PaymentPage extends Vue {
  innerContext = {
    complexName: 'نام مجموعه',
    serviceType: 'نوع سرویس',
    date: 'تاریخ و سانس',
    ballReserve: 'رزرو توپ: ',
    num: 'عدد',
    priceOfBalls: 'قیمت هر واحد توپ',
    currency: 'تومن',
    discountCode: 'کد تخفیف',
    checkCode: 'بررسی کد',
    paymentPrice: 'مبلغ قابل پرداخت: ',
    rules: 'قوانین را مطالعه کرده ام و می پذیرم.',
    submit: 'تایید و پرداخت',
    back: 'بازگشت'
  }

  lawCheckBox: boolean = false
  discountCode: string = ''
  hasCode: boolean = false
  count: number = 0
  reservedGym: ReservedGym = {
    complexName: 'مجموعه ورزشی آزادی',
    gymnasiumName: 'سالن چندمنظوره',
    data: new Date().toUTCString(),
    ballLimit: 5,
    ballCost: 20000,
    totalCost: 400000
  }

  checkCode () {
    // todo sad
  }

  get gymDate (): string {
    // todo sep get from reservedGym.data
    return 'سه شنبه 19 بهمن 20:00-18:30'
  }

  increaseBallNum () {
    this.count++
    if (this.count > this.reservedGym.ballLimit) {
      this.count = this.reservedGym.ballLimit
    } else {
      this.reservedGym.totalCost += this.reservedGym.ballCost
    }
  }

  decreaseBallNum () {
    this.count--
    if (this.count < 0) {
      this.count = 0
    } else {
      this.reservedGym.totalCost -= this.reservedGym.ballCost
    }
  }
}
</script>

<style scoped>

.h4-700 {
  font-weight: 700;
}
.h4-400 {
  font-weight: 400;
}

.payment-page {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 5%;
  width: 100%;
  height: fit-content;
  min-height: 100%;
}

.payment-page .address {
  padding: 20px 0;
  display: flex;
  direction: rtl;
  text-align: justify;
}

.address > p {
  font-size: small;
  margin-bottom: 0;
  align-self: center;
}

.payment-page .info {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: justify;
  padding: 10px;
  background: var(--tertiary-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
}

.info .complex-name {
  margin-bottom: 20px;
  gap: 10px;
  display: flex;
  flex-direction: column;
}

.info .gymnasium-name {
  margin-bottom: 20px;
  gap: 10px;
  display: flex;
  flex-direction: column;
}

.info .date {
  margin-bottom: 5px;
  /*color: var(--secondary-color);*/
  gap: 10px;
  display: flex;
  flex-direction: column;
}

.date .gym-date {
  color: var(--secondary-color);
}

.payment-page .reserve-ball {
  display: flex;
  flex-direction: column;
  direction: rtl;
  padding-right: 10px;
  margin-top: 20px;
  font-weight: bold;
  margin-bottom: 30px;
}

.reserve-ball .ball-info {
  display: flex;
  justify-content: space-between;
}

.ball-info > h4 {
  margin-bottom: 0;
  align-self: center;
  font-weight: 700;
  width: 100%;
  text-align: right;
}

.reserve-ball .ball-count {
  display: flex;
  min-width: fit-content;
  background: var(--tertiary-color);
  padding: 5px;
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
  gap: 10px;
}

.ball-count > h4 {
  text-align: center;
}

.ball-count > button {
  min-height: 30px;
  max-height: 30px;
}

.ball-count .ball-increase {
  height: 30px;
  width: 30px;
  background: var(--secondary-color);
  border: 1px solid var(--secondary-color);
  box-shadow: 0 3px 5px rgba(var(--secondary-color-rgb), 0.35);
  border-radius: 7px;
  color: var(--tertiary-color);
}

.ball-count .ball-decrease {
  max-height: 30px;
  width: 30px;
  background: var(--tertiary-color);
  border: 1px solid var(--secondary-color);
  box-shadow: 0 3px 5px rgba(var(--secondary-color-rgb), 0.35);
  border-radius: 7px;
  color: var(--secondary-color);
}

.reserve-ball .ball-cost > h4 {
  display: flex;
  direction: rtl;
  text-align: justify;
  margin-bottom: 0;
  align-self: center;
}

.payment-page .discount-button {
  display: flex;
  direction: rtl;
  margin-bottom: 30px;
  padding: 0 5px;
}

.discount-button > button {
  border: 1px solid var(--secondary-color);
  background-color: var(--tertiary-color);
  color: var(--secondary-color);
  box-shadow: 0 4px 4px rgba(var(--secondary-text-color-rgb), 0.3);
  min-height: unset;
  height: 40px;
  width: 100px;
}

.payment-page .discount-code {
  display: flex;
  padding: 0 5px;
  direction: rtl;
  width: 100%;
  margin-bottom: 30px;
  position: relative;
}

.discount-code > input {
  /*display: flex;*/
  width: calc(100% - 30px);
  right: 30px;
  min-height: 40px;
  height: 40px;
  border: none;
  text-align: center;
  background-color: var(--tertiary-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px 0 0 10px;
  position: absolute;
  outline: none;
}

.discount-code > button {
  min-height: unset;
  height: 40px;
  width: 100px;
  min-width: 100px;
  border-radius: 15px;
  z-index: 2;
}

.payment-page .total-price {
  display: flex;
  margin-bottom: 20px;
  padding-right: 10px;
  gap: 10px;
}

.total-price > h2 {
  text-align: right;
  font-weight: 700;
  width: fit-content;
}

.total-price .total-price-colored {
  color: var(--secondary-color);
}

.payment-page .laws {
  display: flex;
  direction: rtl;
  margin-bottom: 10px;
  padding-right: 10px;
  font-weight: bold;
}

.laws .check-box {
  padding-top: 2px;
  padding-left: 10px;
}

.laws > h6 {
  text-align: right;
}

.payment-page .submit-buttons {
  display: flex;
  direction: rtl;
  position: absolute;
  bottom: 0;
  justify-content: space-between;
  height: 48px;
  margin-bottom: 15px;
  left: 5%;
  right: 5%;
}

.submit-buttons > button {
  width: 100%;
  min-width: 100px;
  height: 48px;
  border-width: 0;
}

.submit-buttons > button[disabled] {
  width: 100%;
  background-color: var(--disable-button-color);
  box-shadow: none;
  min-width: 100px;
  height: 48px;
  border-width: 0;
  font-weight: normal;
}
</style>
