<template>
  <div class="notification-page">
    <div class="notifs-div">
      <div v-for="(notif,index) in notifications" :key="`index-${index}`" class="notif" @click="$bvModal.show('notif-popup-modal')">
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
          <div class="footer-right">
            <h6> {{ innerContext.discountCode }} {{ notif.discountCode }} </h6>
          </div>
          <div class="footer-left">
            <p> {{ innerContext.expirationDate }} {{ notif.expirationDate }} </p>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="notif-popup-modal" hide-footer hide-header centered>
      <NotifPop />
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Notification } from '~/api/notification'

@Component
export default class NotificationPage extends Vue {
  innerContext = {
    discountCode: 'کد تخفیف شما:',
    expirationDate: 'مهلت استفاده:'
  }

  notif: Notification = {
    title: 'تبریک! شما برنده شده‌اید',
    text: 'شما برنده 25% تخفیف رزرو فوتسال در مجموعه ورزشی آزادی شدید.',
    discountCode: '34GR8B',
    expirationDate: '۳۰ مرداد ۱۴۰۱'
  }

  notifications: Notification[] = [this.notif, this.notif, this.notif, this.notif, this.notif, this.notif, this.notif]
}
</script>

<style scoped>
.notification-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.notification-page .notifs-div {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: min(5%,40px) 5% 5% 5%;
  gap: 15px;
}

.notifs-div .notif {
  width: 100%;
  height: fit-content;
  min-height: 65px;
  background: #FFFFFF;
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
  padding: 10px 5%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notif .notif-header {
  display: flex;
  width: 100%;
  gap: 10px;
}

.notif-header .optional-circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  align-self: center;
}

.notif .notif-body {
  display: flex;
  width: 100%;
  padding-right: 18px;
}

.notif .notif-footer {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-right: 18px;
}

.notif-footer .footer-right {
  text-align: right;
  width: 50%;
}

.footer-right > h6 {
  font-weight: 600;
  color: var(--secondary-color);
}

.notif-footer .footer-left {
  text-align: right;
  width: 50%;
}

.footer-left > p {
  font-weight: 700;
}

</style>
