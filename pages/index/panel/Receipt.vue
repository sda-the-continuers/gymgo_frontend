<template>
  <div class="reserve-page">
    <div class="tabs">
      <!-- tab #1 -->
      <input id="receipt-tab1" type="radio" class="tabs__radio" name="tabs-example" checked>
      <label for="receipt-tab1" class="tabs__label tab-right">
        <h4> {{ innerContext.openReserved }} </h4>
      </label>
      <div class="tabs__content">
        <div v-for="(option, index) in receipts" :key="`receipt-${index}`" class="receipt-for" @click="receiptPopup(option)">
          <div class="top-info">
            <h4> {{ option.complexName }} </h4>
            <p> {{ option.address }} </p>
          </div>
          <div class="bottom-info">
            <div class="bottom-info-right">
              <h5> {{ option.gymnasiumName }} </h5>
            </div>
            <div class="bottom-info-left">
              <div class="date">
                <p> {{ option.date | toPersianDigits }} </p>
                <img src="../../../static/calendar-icon.svg" alt="">
              </div>
              <div class="time">
                <p> {{ option.time | toPersianDigits }} </p>
                <img src="../../../static/clock-icon.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- tab #2 -->
      <input id="receipt-tab2" type="radio" class="tabs__radio" name="tabs-example">
      <label for="receipt-tab2" class="tabs__label tab-left">
        <h4> {{ innerContext.allReserved }} </h4>
      </label>
      <div class="tabs__content">
        <!--        <div class="radio-button">-->
        <!--          <label class="container">-->
        <!--            <input type="radio" checked="checked" name="radio">-->
        <!--            <span class="checkmark" />-->
        <!--            رزروهای انجام شده-->
        <!--          </label>-->
        <!--          <label class="container">-->
        <!--            <input type="radio" name="radio">-->
        <!--            <span class="checkmark" />-->
        <!--            رزروهای لغو شده-->
        <!--          </label>-->
        <!--        </div>-->
        <div v-for="(option, index) in receipts" :key="`receipt-${index}`" class="receipt-for" @click="receiptPopup(option)">
          <div class="top-info">
            <h4> {{ option.complexName }} </h4>
            <p> {{ option.address }} </p>
          </div>
          <div class="bottom-info">
            <div class="bottom-info-right">
              <h5> {{ option.gymnasiumName }} </h5>
            </div>
            <div class="bottom-info-left">
              <div class="date">
                <p> {{ option.date | toPersianDigits }} </p>
                <img src="../../../static/calendar-icon.svg" alt="">
              </div>
              <div class="time">
                <p> {{ option.time | toPersianDigits }} </p>
                <img src="../../../static/clock-icon.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="receipt-popup-modal" hide-footer hide-header centered>
      <ReceiptPop :receipt="tempReceipt" />
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Receipt } from '~/api/receipt'

@Component
export default class ReservePage extends Vue {
  innerContext = {
    openReserved: 'رزروهای باز',
    allReserved: 'همه رزروها'
  }

  reserves1: Receipt = {
    complexName: 'مجموعه ورزشی 9 دی',
    gymnasiumName: 'چمن مصنوعی',
    address: 'تهران، پاسداران',
    date: 'سه شنبه 19 بهمن',
    time: '18:30 - 20:00',
    ball: 1,
    totalCost: 495000,
    bankName: 'بانک سامان',
    trackingCode: 4589654893
  }

  reserves2: Receipt = {
    complexName: 'مجموعه ورزشی سلحشور',
    gymnasiumName: 'سالن فوتسال',
    address: 'تهران، اقدسیه',
    date: 'چهار شنبه 27 بهمن',
    time: '22:00 - 21:30',
    ball: 1,
    totalCost: 520000,
    bankName: 'بانک سامان',
    trackingCode: 5628656645
  }

  reserves3: Receipt = {
    complexName: 'مجموعه ورزشی 9 دی',
    gymnasiumName: 'چمن مصنوعی',
    address: 'تهران، پاسداران',
    date: 'سه شنبه 3 اسفند',
    time: '18:30 - 20:00',
    ball: 1,
    totalCost: 495000,
    bankName: 'بانک سامان',
    trackingCode: 5587652213
  }

  reserves4: Receipt = {
    complexName: 'مجموعه ورزشی 9 دی',
    gymnasiumName: 'چمن مصنوعی',
    address: 'تهران، پاسداران',
    date: 'پنج شنبه 5 اسفند',
    time: '18:30 - 20:00',
    ball: 1,
    totalCost: 495000,
    bankName: 'بانک سامان',
    trackingCode: 8945656791
  }

  receipts = [this.reserves1, this.reserves2, this.reserves3, this.reserves4]

  tempReceipt = this.reserves1
  receiptPopup (reserve: Receipt) {
    this.tempReceipt = reserve
    console.log(reserve.complexName)
    this.$bvModal.show('receipt-popup-modal')
  }
}
</script>

<style scoped>
.reserve-page {
  display: flex;
  flex-direction: column;
  direction: rtl;
  position: relative;
  padding: min(5%,30px) 5% 5% 5%;
  width: 100%;
  min-height: 100%;
  height: fit-content;
}

/* Start of tabs css */
.reserve-page .tabs {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}

.tabs__label {
  padding: 10px 15px;
  cursor: pointer;
  color: var(--secondary-text-color);
  width: 50%;
  text-align: center;
  background: var(--tertiary-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
}

.tab-right {
  border-radius: 0 10px 0 0;
  border-left: 2px solid var(--secondary-text-color);
}

.tab-left {
  border-radius: 10px 0 0 0;
}

.tabs__radio {
  display: none;
}

.tabs__content {
  order: 1;
  width: 100%;
  border-bottom: 3px transparent;
  line-height: 1.5;
  display: none;
  padding: 10px 0;
}

.tabs__radio:checked + .tabs__label {
  font-weight: bold;
  color: var(--primary-text-color);
  border-bottom: 2px solid var(--secondary-color);
}

.tabs__radio:checked + .tabs__label + .tabs__content {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: justify;
}
/* End of tabs css */

.tabs__content .receipt-for {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: justify;
  padding: 5px 10px;
  margin-bottom: 10px;
  justify-content: space-around;
  min-height: 80px;
  cursor: pointer;
  background: var(--tertiary-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
}

.receipt-for .top-info {
  display: flex;
  direction: rtl;
  text-align: justify;
  justify-content: space-between;
}

.top-info > p {
  padding-right: 5px;
  border-right: 1px solid black;
  height: 100%;
  margin-bottom: 0;
  align-self: center;
  font-weight: 400;
}

.top-info > h4 {
  margin-bottom: 0;
  align-self: center;
  font-weight: 500;
}

.receipt-for .bottom-info {
  display: flex;
  direction: rtl;
  text-align: justify;
  justify-content: space-between;
}

.bottom-info > p {
  margin-bottom: 0;
  align-self: center;
  font-weight: 400;
}

.bottom-info .bottom-info-right > h5 {
  font-weight: 500;
}

.bottom-info .bottom-info-left {
  display: flex;
  direction: rtl;
  text-align: justify;
  justify-content: space-between;
  font-weight: 400;
}

.bottom-info-left .date {
  display: flex;
  margin-left: 5px;
  gap: 5px;
}

.date > p {
  font-weight: 500;
  margin-bottom: 0;
  align-self: center;
}

.date > img {
  width: 20px;
}

.bottom-info-left .time {
  display: flex;
  margin-right: 5px;
  gap: 5px;
}

.time > p {
  font-weight: 500;
  margin-bottom: 0;
  align-self: center;
}

.time > img {
  width: 20px;
}

</style>
