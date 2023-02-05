<template>
  <div class="main-menu">
    <!--    <button class="close" />-->
    <div class="item" @click="go2InvitePage">
      <img :src="staticIcon.inviteIcon" alt="">
      <h5> {{ innerContext.inviteFriends }} </h5>
    </div>
    <div class="item" @click="go2FAQPage">
      <img :src="staticIcon.faqIcon" alt="">
      <h5> {{ innerContext.FAQ }} </h5>
    </div>
    <div class="item" @click="go2SupportPage">
      <img :src="staticIcon.supportIcon" alt="">
      <h5> {{ innerContext.support }} </h5>
    </div>
    <div class="item" @click="go2RulesPage">
      <img :src="staticIcon.rulesIcon" alt="">
      <h5> {{ innerContext.rules }} </h5>
    </div>
    <div class="item" @click="go2AboutUsPage">
      <img :src="staticIcon.aboutUsIcon" alt="">
      <h5> {{ innerContext.aboutUs }} </h5>
    </div>
    <div class="item" @click="logOut">
      <img :src="staticIcon.exitIcon" alt="">
      <h5> {{ innerContext.exit }} </h5>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import inviteIcon from '~/static/invite-icon.svg'
import faqIcon from '~/static/faq-icon.svg'
import supportIcon from '~/static/support-icon.svg'
import rulesIcon from '~/static/rules-icon-colored.svg'
import aboutUsIcon from '~/static/aboutus-icon.svg'
import exitIcon from '~/static/exit-icon.svg'
import AccessTokenHandler from '~/mixins/accessTokenHandler'

@Component
export default class MenuPage extends Mixins(AccessTokenHandler) {
  innerContext = {
    inviteFriends: 'دعوت از دوستان',
    FAQ: 'سوالات متداول',
    support: 'پشتیبانی',
    rules: 'قوانین و مقررات',
    aboutUs: 'درباره جیم‌تایم',
    exit: 'خروج'
  }

  staticIcon = {
    inviteIcon,
    faqIcon,
    supportIcon,
    rulesIcon,
    aboutUsIcon,
    exitIcon
  }

  go2InvitePage () {
    this.$bvModal.hide('menu-popup-modal')
    this.$router.push({ name: 'index/panel/Invite' })
  }

  go2FAQPage () {
    this.$bvModal.hide('menu-popup-modal')
    this.$bvModal.show('FAQ-popup-modal')
  }

  go2SupportPage () {
    this.$bvModal.hide('menu-popup-modal')
    this.$router.push({ name: 'index/panel/Support' })
  }

  go2RulesPage () {
    this.$bvModal.hide('menu-popup-modal')
    this.$router.push({ name: 'index/panel/GymTimeRules' })
  }

  go2AboutUsPage () {
    this.$bvModal.hide('menu-popup-modal')
    this.$router.push({ name: 'index/panel/GymTimeRules' })
  }
}
</script>

<style scoped>
.main-menu {
  display: grid;
  flex-direction: column;
  position: relative;
  direction: rtl;
  width: 100%;
  height: fit-content;
  /*min-height: 285px;*/
  /*border: 1px solid black;*/
  grid-template-columns: minmax(0, 1fr);
  padding: min(40px,5%) 2%;
  gap: 30px;
}

.main-menu .item {
  display: flex;
  cursor: pointer;
  gap: 15px;
  font-weight: bold;
}

.item > img {
  width: 25px;
}

.item >  h5 {
  margin-bottom: 0;
  align-self: center;
  text-align: right;
  font-weight: 500;
}

</style>
