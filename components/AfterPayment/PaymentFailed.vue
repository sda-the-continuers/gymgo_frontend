<template>
  <div class="after-payment-page">
    <div class="message">
      <h3> {{ staticData.reservedFailed }} </h3>
    </div>
    <div class="advertisement">
      <img src="~/static/icon.png" alt="advertisement">
    </div>
    <div class="buttons">
      <button class="buttons-btn">
        {{ staticData.backButton }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class PaymentFailedPage extends Vue {
  staticData = {
    reservedFailed: 'رزرو شما ناموفق بود',
    backButton: 'بازگشت'
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

.buttons > .buttons-btn {
  width: 100%;
  height: 48px;
  border-width: 0;
  margin-bottom: 10px;
}
</style>
