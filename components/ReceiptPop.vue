<template>
  <div class="receipt-popup">
    <div class="receipt-popup-header">
      <button class="remember">
        <p> {{ innerContext.remember }} </p>
        <img :src="icons.notificationIcon" alt="">
      </button>
      <h3> {{ receipt.complexName }} </h3>
      <div class="gym-address-txt">
        <h6> {{ receipt.address }} </h6>
        <img :src="icons.locationIcon" alt="">
      </div>
    </div>
    <div class="receipt-popup-body">
      <div class="complex-info">
        <h4> {{ receipt.gymnasiumName }} </h4>
        <div class="complex-info-inline">
          <img :src="icons.ballIcon" alt="ball">
          <h6> {{ receipt.ball | toPersianDigits }} {{ innerContext.ballReserved }} </h6>
        </div>
        <h4> {{ receipt.date | toPersianDigits }} </h4>
        <div class="complex-info-inline">
          <img :src="icons.timeIcon" alt="time">
          <h6> {{ receipt.time | toPersianDigits }} </h6>
        </div>
      </div>
      <div class="payment-info">
        <h4> {{ receipt.bankName }} </h4>
        <div class="complex-info-inline">
          <img :src="icons.trackingIcon" alt="tracking">
          <h6> {{ innerContext.paymentTrackingCode }} {{ receipt.trackingCode | toPersianDigits }} </h6>
        </div>
        <div class="complex-info-inline">
          <h3> {{ innerContext.moneyPayed }} </h3>
          <h3 class="pay-cost">
            {{ receipt.totalCost | toPersianDigits }} {{ innerContext.currency }}
          </h3>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="buttons-go2GymComplexPage" @click="go2ComplexPage">
        <h4> {{ innerContext.complexProfile }} </h4>
      </button>
      <button class="buttons-close-popup" @click="closePopup">
        <h4> {{ innerContext.close }} </h4>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import locationIcon from 'static/location-icon.svg'
import notificationIcon from 'static/notification-icon.svg'
import ballIcon from 'static/ball-icon.svg'
import trackingIcon from 'static/tracking-icon.svg'
import timeIcon from 'static/clock-icon.svg'
import { Receipt } from '@/api/receipt'

@Component
export default class PopupPage extends Vue {
  icons = {
    locationIcon,
    notificationIcon,
    ballIcon,
    trackingIcon,
    timeIcon
  }

  innerContext = {
    remember: 'یادآوری کن',
    ballReserved: 'عدد توپ رزرو شده است.',
    paymentTrackingCode: 'کد پیگیری پرداخت: ',
    moneyPayed: 'مبلغ پرداخت شده: ',
    currency: 'تومن',
    complexProfile: 'پروفایل مجموعه',
    close: 'بستن'
  }

  // receipt: Receipt = {
  //   complexName: 'مجموعه ورزشی آزادی',
  //   gymnasiumName: 'زمین چندمنظوره (فوتسال)',
  //   address: 'تهران، چهارراه آزادی، تقاطع شهید همت',
  //   date: 'سه شنبه 19 بهمن',
  //   time: '18:30-20:00',
  //   ball: 1,
  //   totalCost: 400000,
  //   bankName: 'بانک سامان',
  //   trackingCode: 852456951753
  // }

  @Prop({
    type: Object as PropType<Receipt>,
    default: () => []
  }) public readonly receipt: Receipt

  go2ComplexPage () {
    this.$router.push({ name: 'index/panel/gymComplex/id' })
  }

  closePopup () {
    this.$bvModal.hide('receipt-popup-modal')
  }
}
</script>

<style scoped>
.receipt-popup {
  display: flex;
  flex-direction: column;
  direction: rtl;
  position: relative;
  /*margin-bottom: 0;*/
  /*align-self: center;*/
  width: 100%;
  /*min-width: 100%;*/
  height: fit-content;
  max-height: 85vh;
  /*border: 1px solid black;*/
}

.receipt-popup .receipt-popup-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: center;
  padding: 15px;
  background: var(--tertiary-color);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.27);
  border-radius: 25px 25px 0 0;
  z-index: 2;
  gap: 15px;
}

.receipt-popup-header > h3 {
  text-align: right;
  font-weight: 700;
  width: 100%;
}

.receipt-popup-header .gym-address-txt {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  gap: 10px;
  justify-content: right;
}

.gym-address-txt > h6 {
  text-align: right;
  font-weight: 400;
  width: 100%;
  margin-bottom: 0;
  align-self: center;
}

.gym-address-txt > img {
  width: 20px;
}

.receipt-popup-header .remember {
  display: flex;
  position: absolute;
  background-color: transparent;
  left: 15px;
  top: 5px;
  gap: 5px;
  border: none;
  font-size: small;
  box-shadow: none;
  color: var(--primary-text-color);
  font-weight: normal;
  align-items: center;
}

.remember > img {
  width: 20px;
  filter: brightness(0) saturate(100%) invert(48%) sepia(73%) saturate(991%) hue-rotate(339deg) brightness(104%) contrast(93%) drop-shadow(0px 3px 5px rgba(246, 117, 56, 0.35));
}

.remember > p {
  margin-bottom: 0;
  align-self: center;
}

.receipt-popup .receipt-popup-body {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: var(--primary-color);
}

.receipt-popup-body .complex-info {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: justify;
  padding: min(5%,40px) 5%;
  gap: 15px;
}

.complex-info > h4 {
  margin-bottom: 0;
  align-self: center;
  width: 100%;
  font-weight: 500;
}

.complex-info .complex-info-inline {
  display: flex;
  width: 100%;
  gap: 10px;
  margin-bottom: 10px;
}

.complex-info .complex-info-inline > h6 {
  font-weight: 500;
  margin-bottom: 0;
  align-self: center;
  width: 100%;
}

.complex-info .complex-info-inline > img {
  width: 20px;
  min-width: 20px;
}

.receipt-popup .payment-info {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: justify;
  padding: 0 5% min(5%,40px) 5%;
  gap: 10px;
}

.payment-info > h4 {
  font-weight: 700;
}

.payment-info .complex-info-inline {
  display: flex;
  width: 100%;
  gap: 10px;
  margin-bottom: 20px;
}

.payment-info .complex-info-inline > h6 {
  font-weight: 500;
}

.payment-info .complex-info-inline > img {
  width: 20px;
  min-width: 20px;
}

.payment-info .complex-info-inline > h3 {
  font-weight: 700;
  width: fit-content;
}

.complex-info-inline .pay-cost {
  color: var(--secondary-color);
}

.receipt-popup .buttons {
  display: flex;
  width: 100%;
  padding: min(5%,40px) 5%;
  justify-content: space-between;
  gap: 15px;
  background-color: var(--primary-color);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.27);
}

.buttons .buttons-go2GymComplexPage {
  height: 48px;
  width: 60%;
  border-width: 0;
  font-size: min(24px, calc(4.44vw + 2vh)/2);
  font-weight: 500;
}

.buttons .buttons-close-popup {
  height: 48px;
  width: 40%;
  border-width: 0;
  background: var(--tertiary-color);
  box-shadow: 0 4px 4px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 15px;
  color: var(--secondary-color);
}
</style>
