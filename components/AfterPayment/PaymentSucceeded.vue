<template>
  <div class="after-payment-page">
    <div class="message">
      <h3> {{ staticData.reservedSuccessfully }} </h3>
    </div>
    <div class="advertisement">
      <img src="~/static/icon.png" alt="advertisement">
    </div>
    <div class="buttons">
      <button class="buttons-btn1" @click="go2ReceiptPage">
        {{ staticData.detailsBtn }}
      </button>
      <button class="buttons-btn2">
        {{ staticData.rememberBtn }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class PaymentSucceededPage extends Vue {
  staticData = {
    reservedSuccessfully: 'سانس مورد نظر شما با موفقیت رزرو شد',
    reservedFailed: '',
    extraInfoText: 'این یک متن ساختگی برای کص گیر آوردن شما است' +
      ' خواهشمندم در صورت خواندن این متن با حفظ خونسردی خود سه بار نفس عمیق بکشید،' +
      ' خشم را از خود دور کنید و برای شادی روح اموات جمع یک فاتحه بخوانید.',
    detailsBtn: 'مشاهده جزئیات رزرو',
    rememberBtn: 'بهم یادآوری کن'
  }

  go2ReceiptPage () {
    this.$router.push({ name: 'index/panel/Receipt' })
  }
}
</script>

<style scoped>
.after-payment-page {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10% 5% 0 5%;
  width: 100%;
  height: 100%;
}

.after-payment-page .message {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: center;
  padding: 5vh 0 5vh 0;
}

.message > h3 {
  font-weight: 700;
}

.after-payment-page .advertisement {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
}

.advertisement > img {
  height: 40vh;
}

.after-payment-page .buttons {
  display: flex;
  flex-direction: column;
  position: sticky;
  background-color: var(--primary-color);
  bottom: 5px;
  left: 5%;
  right: 5%;
  margin-top: auto;
  margin-bottom: 0;
  gap: 15px;
}

.buttons .buttons-btn1 {
  background: var(--tertiary-color);
  box-shadow: 0 4px 4px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 15px;
  color: var(--secondary-color);
}

.buttons > .buttons-btn2 {
  width: 100%;
  height: 48px;
  border-width: 0;
  margin-bottom: 10px;
}
</style>
