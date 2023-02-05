<template>
  <div class="FAQ">
    <!--    <button class="close" @click="closePopup" />-->
    <div class="top">
      <h4>
        {{ innerContext.FAQ }}
      </h4>
    </div>
    <div class="middle">
      <h5>
        {{ innerContext.text }}
      </h5>
      <div v-for="(question,index) in FAQList" :key="`FAQ-${index}`" class="accordion" @click="showQText(question)">
        <b-button v-b-toggle="`collapse-${index}`" class="collapsible">
          {{ question.title | toPersianDigits }}
          <img src="../static/arrow-down-icon.svg" alt="">
        </b-button>
        <b-collapse :id="`collapse-${index}`">
          <h5>{{ question.text | toPersianDigits }}</h5>
        </b-collapse>
      </div>
    </div>
    <div class="bottom">
      <button class="button1" @click="go2SupportPage">
        <h4> {{ innerContext.ask }} </h4>
      </button>
      <button class="button2" @click="$bvModal.hide('FAQ-popup-modal')">
        <h4> {{ innerContext.close }} </h4>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { FQ } from '@/api/FQ'

@Component
export default class FAGPage extends Vue {
  innerContext = {
    FAQ: 'سوالات متداول',
    text: 'متن ساختگی کصشر برای پر کردن فضای خالی که متعاقبا متن نهایی باید ابلاغ شود.',
    ask: 'سوال خود را بپرسید',
    close: 'بستن'
  }

  FAQList: FQ[] = [
    { title: 'نمونه سوال 1', text: 'متن1', show: false },
    { title: 'نمونه سوال 2', text: 'متن2', show: false },
    { title: 'نمونه سوال 3', text: 'متن3', show: false },
    { title: 'نمونه سوال 4', text: 'متن4', show: false },
    { title: 'نمونه سوال 5', text: 'متن5', show: false },
    { title: 'نمونه سوال 4', text: 'متن4', show: false },
    { title: 'نمونه سوال 5', text: 'متن5', show: false },
    { title: 'نمونه سوال 4', text: 'متن4', show: false },
    { title: 'نمونه سوال 5', text: 'متن5', show: false },
    { title: 'نمونه سوال 4', text: 'متن4', show: false },
    { title: 'نمونه سوال 5', text: 'متن5', show: false },
    { title: 'نمونه سوال 4', text: 'متن4', show: false },
    { title: 'نمونه سوال 5', text: 'متن5', show: false },
    { title: 'نمونه سوال 6', text: 'متن6', show: false }
  ]

  closePopup () {
    this.$bvModal.hide('FAQ-popup-modal')
  }

  showQText (question: FQ) {
    question.show = !question.show
  }

  go2SupportPage () {
    this.closePopup()
    this.$router.push({ name: 'index/panel/Support' })
  }
}
</script>

<style scoped>
.FAQ {
  display: flex;
  flex-direction: column;
  direction: rtl;
  position: relative;
  width: 100%;
  /*min-height: 500px;*/
  height: fit-content;
  max-height: 85vh;
  /*height: 100%;*/
  /*max-height: 100%;*/
  /*border: 1px solid black;*/
}

.FAQ .top {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: center;
  justify-content: center;
  margin: 0;
  padding: 12px;
  background: var(--tertiary-color);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.27);
  border-radius: 25px 25px 0 0;
  z-index: 1;
}

.top > h4 {
  color: var(--secondary-color);
  margin-bottom: 5px;
  align-self: center;
  font-weight: 500;
}

.FAQ .middle {
  display: flex;
  flex-direction: column;
  direction: rtl;
  padding: 20px 5%;
  overflow-y: auto;
  /*height: 50%;*/
  /*max-height: 600px;*/
  background-color: var(--primary-color);
  gap: 15px;
}

.FAQ .middle > h5 {
  text-align: center;
  font-weight: 300;
}

.middle .accordion {
  display: flex;
  flex-direction: column;
}

.collapsible {
  /*width: 100%;*/
  height: 40px;
  background: var(--tertiary-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
  color: var(--primary-text-color);
  text-align: right;
  display: flex;
  justify-content: space-between;
  z-index: 2;
  font-size: min(21px, calc(3.89vw + 1.75vh)/2);
  font-weight: 600;
  align-items: center;
}

.collapsible > img {
  margin: auto 0;
}

.accordion .collapse.show {
  position: relative;
  background-color: white;
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 0 0 10px 10px;
  margin-bottom: 5px;
  padding: 25px 20px 15px 20px;
  top: -10px;
  display: flex;
  direction: rtl;
}

.accordion .collapse.show > h5 {
  margin-bottom: 0;
  align-self: center;
  direction: rtl;
  font-weight: 400;
  text-align: right;
}

.FAQ .bottom {
  display: flex;
  padding: min(5%,40px) 5%;
  /*border-top: 1px solid var(--primary-text-color);*/
  direction: rtl;
  text-align: center;
  background-color: var(--primary-color);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.27);
  gap: 10px;
}

/*.bottom > h5 {*/
/*  margin-bottom: 0;*/
/*  align-self: center;*/
/*  font-weight: 300;*/
/*}*/

.bottom > button {
  margin-top: 10px;
  height: 48px;
  border-width: 0;
}

.bottom > .button1 {
  width: 70%;
}

.bottom > .button2 {
  width: 30%;
  background: var(--tertiary-color);
  box-shadow: 0 4px 4px rgba(var(--secondary-text-color-rgb), 0.3);
  color: var(--secondary-color);
}
</style>
