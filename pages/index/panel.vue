<template>
  <div class="user-panel">
    <div class="header" :panelTitle="headerFunctionality">
      <div class="icons">
        <div class="icon" @click="go2GymTimeRulesPage">
          <img src="~/static/rules-icon-no-color.svg" alt="">
        </div>
        <div class="icon" @click="go2notificationPage">
          <img src="~/static/notification-icon.svg" alt="">
        </div>
      </div>
      <h4 class="title">
        {{ innerContext.headerText }}
      </h4>
      <div class="back">
        <button @click="buttonFunctionality">
          <img :src="backHamburgerIcon" alt="">
        </button>
      </div>
    </div>
    <div class="body scroll-hidden">
      <NuxtChild />
    </div>
    <div class="footer">
      <NuxtLink v-for="(route, index) in routes" :key="`icon-${index}`" :to="route">
        <img :src="menuIcons(route)" alt="" :thisPage="$route.name === route.name ? 1 : 0">
      </NuxtLink>
    </div>
    <b-modal id="menu-popup-modal" hide-footer hide-header centered style="padding: 0;">
      <Menu />
    </b-modal>
    <b-modal id="FAQ-popup-modal" hide-header hide-footer centered>
      <FAQ />
    </b-modal>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import { RawLocation } from 'vue-router/types/router'
import backIcon from '~/static/back-icon.svg'
import hamburgerIcon from '~/static/hamburger-icon.svg'
import profileIcon from '~/static/profile-icon.svg'
import bookmarkIcon from '~/static/bookmark-icon.svg'
import homeIcon from '~/static/home-icon.svg'
import searchIcon from '~/static/search-icon.svg'
import receiptIcon from '~/static/receipt-icon.svg'
import AccessTokenHandler from '~/mixins/accessTokenHandler'

@Component
export default class Panel extends Mixins(AccessTokenHandler) {
  routes: RawLocation[] = [
    { name: 'index/panel/Receipt' },
    { name: 'index/panel/HomeSearch' },
    { name: 'index/panel' },
    { name: 'index/panel/Bookmarks' },
    { name: 'index/panel/Profile' }]

  innerContext = {
    headerText: 'جیم تایم'
  }

  determine (determineObject, determiner) {
    return determineObject[determiner] || determineObject.default
  }

  backButtonFunctionality () {
    this.$router.back()
  }

  hamburgerButtonFunctionality () {
    this.$bvModal.show('menu-popup-modal')
  }

  buttonFunctionalityDeterminer = {
    'index/panel': this.hamburgerButtonFunctionality,
    default: this.backButtonFunctionality
  }

  get buttonFunctionality (): (() => void) {
    return this.determine(this.buttonFunctionalityDeterminer, this.$route.name)
  }

  backHamburgerIconDeterminer = {
    'index/panel': hamburgerIcon,
    default: backIcon
  }

  get backHamburgerIcon (): string {
    return this.determine(this.backHamburgerIconDeterminer, this.$route.name)
  }

  menuIconsDeterminer = {
    'index/panel/Receipt': receiptIcon,
    'index/panel/HomeSearch': searchIcon,
    'index/panel': homeIcon,
    'index/panel/Bookmarks': bookmarkIcon,
    'index/panel/Profile': profileIcon,
    default: homeIcon
  }

  menuIcons (route: RawLocation) {
    const routeName = typeof route === 'string' ? route : route.name
    return this.determine(this.menuIconsDeterminer, routeName)
  }

  headerFunctionalityDeterminer = {
    'index/panel/gymComplex/id': 1,
    'index/panel/gymnasium/id': 2,
    default: 0
  }

  get headerFunctionality (): string {
    const pageNameIndex = this.determine(this.headerFunctionalityDeterminer, this.$route.name)
    console.log(this.$route.name)
    console.log(pageNameIndex)
    const result = 'true'
    if (pageNameIndex === 0) {
      this.innerContext.headerText = 'جیم تایم'
    } else if (pageNameIndex === 1) {
      this.innerContext.headerText = 'پروفایل مجموعه'
      // result = 'false'
    } else if (pageNameIndex === 2) {
      this.innerContext.headerText = 'پروفایل سالن'
      // result = 'false'
    }
    console.log(result)
    return result
  }

  go2notificationPage () {
    this.$router.push({ name: 'index/panel/Notifications' })
  }

  go2GymTimeRulesPage () {
    this.$router.push({ name: 'index/panel/GymTimeRules' })
  }
}
</script>
<!--scoped? no!-->
<style>

@media (orientation: landscape) {
  .user-panel .header {
    border-radius: 10px;
    margin-top: 5px;
    max-width: 98%;
    align-self: center;
  }

  .user-panel .footer {
    border-radius: 10px;
    margin-bottom: 5px;
    max-width: 98%;
    align-self: center;
  }
}

.user-panel {
  /* position*/
  display: flex;
  flex-direction: column;
  /* dimensions */
  height: 100%;
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}

.user-panel > .header {
  background-color: white;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.27);
  width: 100%;
  height: 56px;
  min-height: 56px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  z-index: 1000;
}

.user-panel > .header[panelTitle="false"] {
  background-color: transparent;
  box-shadow: none;
  position: absolute;
  width: 100%;
  top: 0;
}

.user-panel > .header > .icons {
  width: 100px;
  align-self: center;
  /*margin: auto 0 0 20px;*/
  display: flex;
  flex-direction: row-reverse;
  padding-left: 5px;
}

.icons .icon {
  display: flex;
  width: fit-content;
}

/*.user-panel .header .icons .icon {*/
/*  width: 22px;*/
/*}*/

.user-panel > .header > .icons .icon img {
  width: 22px;
  height: 38px;
  margin-left: 12px;
  padding: 8px 0;
  cursor: pointer;
}

/*.header[panelTitle="false"] > .icons >>> img {*/
/*  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(234deg) brightness(103%) contrast(103%);*/
/*}*/

.user-panel > .header > .title{
  margin: auto auto;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  color: var(--secondary-color);
}

.header[panelTitle="false"] > .title {
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(234deg) brightness(103%) contrast(103%);
}

.user-panel > .header > .back{
  width: 100px;
  margin: auto 0;
  display: flex;
}

.header > .back > button {
  height: auto;
  background-color: transparent;
  box-shadow: none;
}

.user-panel > .header > .back img{
  width: 22px;
  height: 22px;
  margin-right: 5px;
}

.header[panelTitle="false"] > .back img {
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(234deg) brightness(103%) contrast(103%);
}

.user-panel > .body {
  /* dimensions */
  display: flex;
  height: 100%;
  width: 100%;
  align-self: center;
  /*max-width: 920px;*/
  overflow-y: scroll;
}

.scroll-hidden::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scroll-hidden {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.user-panel > .footer {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  /* dimensions */
  width: 100%;
  height: 58px;

  /* others */
  background-color: white;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.27);
  z-index: 1000;
}

.user-panel > .footer > a {
  width: fit-content;
  height: inherit;
  display: flex;
  align-items: center;
}

.user-panel > .footer > a > img {
  --dim: 25px;
  width: var(--dim);
  height: var(--dim);
  padding: 10%;
}

.user-panel > .footer > a > img[thisPage="1"] {
  filter: brightness(0) saturate(100%) invert(48%) sepia(73%) saturate(991%) hue-rotate(339deg) brightness(104%) contrast(93%) drop-shadow(0px 3px 5px rgba(246, 117, 56, 0.35));
}

.modal-open {
  /*display: contents;*/
  padding: 0 !important;
}

#menu-popup-modal___BV_modal_outer_ {
  width: 100%;
  /*height: calc(100% - 58px);*/
  height: 100%;
}

#menu-popup-modal {
  background-color: rgba(var(--primary-text-color-rgb), 0.75);
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 0 !important;
}

#FAQ-popup-modal___BV_modal_outer_ {
  width: 100%;
  height: 100%;
}

#FAQ-popup-modal {
  background-color: rgba(var(--primary-text-color-rgb), 0.75);
  /*position: absolute;*/
  height: 100%;
  width: 100%;
  padding: 0 !important;
}

/*#FAQ-popup-modal___BV_modal_content_ {*/
/*  !*height: fit-content;*!*/
/*  !*max-height: 85%;*!*/
/*}*/

#FAQ-popup-modal___BV_modal_body_ {
  padding: 0;
  height: fit-content;
}

#invite-popup-modal___BV_modal_outer_ {
  width: 100%;
  height: 100%;
}

#invite-popup-modal {
  background-color: rgba(var(--primary-text-color-rgb), 0.75);
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 0 !important;
}

#invite-popup-modal___BV_modal_body_ {
  padding: 0;
}

#gym-services-popup-modal___BV_modal_outer_ {
  width: 100%;
  height: 100%;
}

#gym-services-popup-modal {
  background-color: rgba(var(--primary-text-color-rgb), 0.75);
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 0 !important;
}

#gym-services-popup-modal___BV_modal_body_ {
  padding: 0;
}

#receipt-popup-modal___BV_modal_outer_ {
  width: 100%;
  height: 100%
}

#receipt-popup-modal {
  background-color: rgba(var(--primary-text-color-rgb), 0.75);
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 0 !important;
}

/*#receipt-popup-modal___BV_modal_content_ {*/
/*  height: fit-content;*/
/*  max-height: 85%;*/
/*}*/

#receipt-popup-modal___BV_modal_body_ {
  padding: 0;
  height: 100%;
}

#gym-complex-rules-popup-modal___BV_modal_outer_ {
  width: 100%;
  height: 100%;
}

#gym-complex-rules-popup-modal {
  background-color: rgba(var(--primary-text-color-rgb), 0.75);
  /*position: absolute;*/
  height: 100%;
  width: 100%;
  padding: 0 !important;
}

#gym-complex-rules-popup-modal___BV_modal_body_ {
  padding: 0;
  height: fit-content;
}

#notif-popup-modal___BV_modal_outer_ {
  width: 100%;
  height: 100%;
}

#notif-popup-modal___BV_modal_content_ {
  width: fit-content;
  height: fit-content;
  top: 45px;
  border-radius: 10px;
}

#notif-popup-modal {
  /*background-color: rgba(var(--primary-text-color-rgb), 0.75);*/
  height: 100%;
  width: 100%;
}

#notif-popup-modal___BV_modal_body_ {
  padding: 0;
  width: fit-content;
  border-radius: 10px;
}

.modal-dialog.modal-md.modal-dialog-centered {
  margin: 0;
  height: 100%;
  max-width: 100%;
  justify-content: center;
}

.modal-dialog.modal-md.modal-dialog-centered > .modal-content {
  position: absolute;
  bottom: 0;
  border-radius: 25px 25px 0 0;
  border: none;
}

.modal-backdrop {
  height: 0;
}
</style>
