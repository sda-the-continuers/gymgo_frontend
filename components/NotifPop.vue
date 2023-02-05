<template>
  <div class="notif-pop">
    <div class="notif-header">
      <div class="optional-circle" />
      <div class="notif-title">
        <h4> {{ notif.title }} </h4>
      </div>
    </div>
    <div class="notif-body">
      <p style="text-align: right">
        {{ notif.text }}
      </p>
    </div>
    <div class="notif-footer">
      <h6 class="colored">
        {{ innerContext.seeAll }}
      </h6>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Notification } from '~/api/notification'

@Component
export default class NotifPop extends Vue {
  notif: Notification = {
    title: 'تبریک! شما برنده شده‌اید',
    text: 'شما برنده 25% تخفیف رزرو فوتسال در مجموعه ورزشی آزادی شدید.',
    discountCode: '34GR8B',
    expirationDate: '۳۰ مرداد ۱۴۰۱'
  }

  innerContext = {
    seeAll: 'مشاهده همه'
  }
}
</script>

<style scoped>
.notif-pop {
  display: flex;
  flex-direction: column;
  width: 90vw;
  margin: 0 auto;
  height: fit-content;
  min-height: 60px;
  background-color: #FFFFFF;
  box-shadow: 0 5px 15px rgba(var(--secondary-text-color-rgb), 0.8);
  border-radius: 10px;
}

.notif-pop .notif-header {
  display: flex;
  padding: 10px 5% 0 5%;
  width: 100%;
  gap: 10px;
  margin-bottom: 10px;
}

.notif-header .optional-circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  align-self: center;
}

.notif-pop .notif-body {
  display: flex;
  width: 100%;
  padding: 0 calc(5% + 18px) 10px 5%;
}

.notif-pop .notif-footer {
  display: flex;
  width: 100%;
  /*border-top: 1px solid var(--primary-text-color);*/
  padding: 5px 0;
}

.notif-footer > h6 {
  text-align: center;
}

</style>
