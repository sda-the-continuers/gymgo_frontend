<template>
  <div class="invite-popup">
    <!--    <button-->
    <!--      class="close"-->
    <!--      @click="$bvModal.hide('invite-popup-modal')"-->
    <!--    />-->
    <div class="invite-popup-header">
      <h4>
        {{ innerContext.inviteFriendsWith }}
      </h4>
    </div>
    <div class="invite-popup-body">
      <button class="social-media">
        <img src="../static/message-rgb-icon.svg" alt="img">
        <h4> Message </h4>
      </button>
      <button class="social-media">
        <img src="../static/instagram-rgb-icon.svg" alt="img">
        <h4> Instagram </h4>
      </button>
      <button class="social-media">
        <img src="../static/telegram-rgb-icon.svg" alt="img">
        <h4> Telegram </h4>
      </button>
      <button class="social-media">
        <img src="../static/whatsapp-rgb-icon.svg" alt="img">
        <h4> Whatsapp </h4>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'

@Component
export default class RefPopup extends Vue {
  innerContext = {
    inviteFriendsWith: 'دعوت از دوستان از طریق'
  }
}
</script>

<style scoped>
.invite-popup {
  display: flex;
  flex-direction: column;
  direction: rtl;
  width: 100%;
  height: fit-content;
  /*height: 200px;*/
  /*border: 1px solid black;*/
  justify-content: space-around;
}

.invite-popup .invite-popup-header {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 15px 10px;
  align-self: center;
  justify-content: center;
  font-weight: bold;
  font-size: large;
  color: var(--secondary-color);
  background: var(--tertiary-color);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.27);
  border-radius: 25px 25px 0 0;
  z-index: 2;
}

.invite-popup-header h4 {
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: center;
}

.invite-popup .invite-popup-body {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  padding: 25px 0;
  background-color: var(--primary-color);
}

.invite-popup-body .social-media {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-width: 0;
  background-color: transparent;
  box-shadow: none;
  height: fit-content;
  color: var(--primary-text-color);
  gap: 5px;
}

.social-media > img {
  justify-content: center;
  align-self: center;
  width: 55px;
}

.social-media > h4 {
  margin-bottom: 0;
  align-self: center;
  font-weight: 400;
}
</style>
