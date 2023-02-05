<template>
  <div class="support-page">
    <div class="support-page-header-body">
      <div class="advertisement">
        <img src="../../../static/icon.png" alt="advertisement">
      </div>
      <div class="our-text">
        <h4>
          {{ innerContext.weAreYourSupport }}
        </h4>
        <h5>
          {{ innerContext.pleaseChoose }}
        </h5>
      </div>
    </div>
    <div class="options">
      <div class="options-row">
        <button>
          <img src="../../../static/ticketing-icon.svg" alt="call">
          <h4> {{ innerContext.ticket }} </h4>
        </button>
        <button>
          <img src="../../../static/email-icon.svg" alt="call">
          <h4> {{ innerContext.email }} </h4>
        </button>
      </div>
      <div class="options-row">
        <button>
          <img src="../../../static/whatsapp-icon.svg" alt="call">
          <h4> {{ innerContext.whatsApp }} </h4>
        </button>
        <button>
          <img src="../../../static/telegram-icon.svg" alt="call">
          <h4> {{ innerContext.telegram }} </h4>
        </button>
      </div>
      <div class="options-last-row">
        <button>
          <img src="../../../static/call-icon.svg" alt="call">
          <h4> {{ innerContext.call }} </h4>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class SupportPage extends Vue {
  innerContext = {
    weAreYourSupport: 'ما پشتیبان شما هستیم',
    pleaseChoose: 'لطفا یکی از راه های زیر را برای برقرای ارتباط مشخص کنید.',
    ticket: 'پیام',
    email: 'ایمیل',
    telegram: 'تلگرام',
    whatsApp: 'واتساپ',
    call: 'تماس با پشتیبانی'
  }
}
</script>

<style scoped>
.support-page {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
  justify-content: space-between;
}

.support-page .support-page-header-body {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.support-page-header-body .advertisement {
  margin: 2% 0 2% 0;
  width: 100%;
  height: 32vh;
  align-self: center;
  align-items: center;
  display: flex;
  justify-content: center;
}

.advertisement > img {
  height: 100%;
}

.support-page-header-body .our-text {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: center;
  padding: 2vh 5%;
  gap: 10px;
}

.our-text > h4 {
  display: flex;
  direction: rtl;
  justify-content: center;
  font-weight: 700;
}

.our-text > h5 {
  margin: 10px 0 10px 0;
  font-weight: 400;
}

.support-page .options {
  display: flex;
  flex-direction: column;
  align-items: center;
  direction: rtl;
  width: 100%;
  background-color: transparent;
  padding: 0 5%;
  gap: 15px;
}

.options .options-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0;
  margin-top: auto;
}

.options-row > button {
  border-width: 0;
  padding: 0 min(30px,5%);
  height: 48px;
  width: 47.5%;
  max-width: 50%;
  min-width: 70px;
  background: var(--tertiary-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  color: var(--primary-text-color);
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 10px;
}

.options-row > button > img {
  height: 20px;
}

.options-row > button > h4 {
  width: fit-content;
}

.options .options-last-row {
  display: flex;
  justify-content: space-around;
  width: 100%
}

.options-last-row > button {
  border-width: 0;
  width: 100%;
  height: 48px;
  max-width: 100%;
  min-width: 70px;
  background: var(--tertiary-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  color: var(--primary-text-color);
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  padding: 0 5%;
  justify-content: center;
}

.options-last-row > button > h4 {
  width: fit-content;
}

.options-last-row > button > img {
  height: 20px;
  margin-left: 10px;
}
</style>
