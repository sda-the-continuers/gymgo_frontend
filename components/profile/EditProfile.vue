<template>
  <div class="edit-profile">
    <div class="edit-profile-header-body">
      <h5> {{ innerContext.name }} </h5>
      <input v-model="athlete.full_name" :placeholder="innerContext.empty">
      <h5> {{ innerContext.birth }} </h5>
      <custom-date-picker v-model="athlete.birth_date" class="calender" type="date" />
      <!-- birth -->
      <h5> {{ innerContext.gender }} </h5>
      <div class="gender-box">
        <div v-for="(gender, index) in genders" :key="`gender-${index}`" class="container">
          <input :id="`edit-profile-gender-${gender}`" type="radio" name="edit-profile-gender" :checked="athlete.gender === statics.GENDER[gender]" @change="athlete.gender = statics.GENDER[gender]">
          <label :for="`edit-profile-gender-${gender}`"> {{ innerContext[gender] }} </label>
        </div>
      </div>
      <h5> {{ innerContext.address }} </h5>
      <input v-model="athlete.address" :placeholder="innerContext.empty">
      <h5> {{ innerContext.favoriteSports }} </h5>
      <div class="favorite-sports-slide-bar">
        <div class="favorite-sports-for">
          <div v-for="(service, index) in athlete.favorite_sports" :key="`service-${index}`" class="fave">
            <!--              <img :src="service.icon" alt="">-->
            <img src="~/static/cup-icon.svg" alt="">
            <h6> {{ service.title_fa }} </h6>
          </div>
        </div>
        <button @click="$router.push('FavoriteSportsProfile')">
          تغییر
        </button>
      </div>
    </div>
    <div class="buttons">
      <button @click="editProfile">
        <h4> {{ innerContext.submitInfo }} </h4>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import BaseProfilePage from '~/components/profile/BaseProfilePage'
import { Account, GENDER, profileUrl } from '~/api/account/athlete/profile'
import MainUtils from '~/mixins/mainUtils'

@Component({
  components: {
    datePicker: VuePersianDatetimePicker
  }
})
export default class EditProfile extends Mixins(MainUtils, BaseProfilePage) {
  statics = {
    GENDER
  }

  innerContext = {
    name: 'نام و نام خانوادگی',
    birth: 'تاریخ تولد',
    gender: 'جنسیت',
    male: 'مرد',
    female: 'زن',
    address: 'آدرس',
    favoriteSports: 'ورزش های مورد علاقه',
    submitInfo: 'ذخیره اطلاعات',
    empty: 'وارد نشده'
  }

  genders = ['male', 'female']

  tempAthlete: Account

  async created () {
    await this.fetchProfile()
    this.tempAthlete = this.cloneObject(this.athlete)
  }

  editProfile () {
    this.axiosRequest({
      requestName: '$patch',
      url: profileUrl,
      withAuth: true,
      data: {
        ...this.athlete,
        favorite_sports: undefined,
        bookmarks: undefined,
        profile_picture: undefined
      },
      thenFunc: () => {
        this.$router.push({ query: { edit: undefined } })
      }
    })
  }
}
</script>

<style scoped>
.edit-profile {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  justify-content: space-between;
  overflow-y: auto;
}

.edit-profile .edit-profile-header-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 5% 30px 5%;
  direction: rtl;
  text-align: right;
}

.edit-profile-header-body > h5 {
  padding-right: 5px;
  margin-bottom: 8px;
  margin-top: 25px;
}

.edit-profile-header-body input {
  height: 40px;
  background: var(--tertiary-color);
  box-shadow: 0 7px 15px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
  border: none;
  padding: 0 10px;
}

.edit-profile-header-body .gender-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.vpd-main >>> .form-control.my-custom-class-name{
  border: none;
  border-radius: 10px 0 0 10px;
  box-shadow: 0 7px 15px rgba(var(--secondary-text-color-rgb) 0.3);
}

.vpd-main >>> button {
  box-shadow: none;
}

.vpd-main >>> label {
  background-color: var(--secondary-color) !important;
  margin-bottom: 0;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 7px 15px rgba(var(--secondary-text-color-rgb), 0.3);
}

.vpd-main >>> .vpd-container .vpd-content .vpd-header {
  display: flex;
  flex-direction: column;
  background-color: var(--secondary-color) !important;
}

.vpd-main >>> .vpd-container .vpd-content .vpd-body .vpd-month .vpd-day .vpd-day-effect {
  background-color: var(--secondary-color) !important;
}

.gender-box .container {
  background: var(--tertiary-color);
  box-shadow: 0 7px 15px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
  border: none;
  padding: 0 10px;
  display: flex;
  height: 40px;
  justify-content: right;
  gap: 10px;
  align-items: center;
}

.container input {
  background-color: transparent;
  border-radius: 50%;
  box-shadow: none;
  accent-color: chocolate;
  width: 20px;
  height: 20px;
}

.container label {
  margin-bottom: 0;
  align-self: center;
}

.favorite-sports-slide-bar {
  display: flex;
  position: relative;
  gap: 10px;
}

.favorite-sports-slide-bar .favorite-sports-for {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  direction: rtl;
  padding-bottom: 15px;
  position: relative;
}

/* hide scrollbar but allow scrolling */
.favorite-sports-for {
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
}

.favorite-sports-for::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}

.favorite-sports-slide-bar button {
  display: flex;
  left: 0;
  width: 50px;
  min-width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
}

.favorite-sports-slide-bar > h6 {
  text-align: right;
}
.favorite-sports-for > img {
  height: 30px;
}
.favorite-sports-for .fave {
  display: flex;
  flex-direction: row;
  width: fit-content;
  min-width: fit-content;
  height: 50px;
  margin: 0 0 0 15px;
  background: var(--tertiary-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
  padding: 5px 10px;
}

.fave > img {
  width: 20px;
  margin-left: 5px;
}

.fave > p {
  margin-bottom: 0;
  align-self: center;
}

.edit-profile .buttons {
  display: flex;
  direction: rtl;
  justify-content: center;
  /*position: absolute;*/
  /*bottom: 0;*/
  width: 100%;
  background: var(--primary-color);
  padding: 0 5% min(40px,5%) 5%;
}

.buttons > button {
  border-width: 0;
  height: 48px;
  width: 100%;
  max-width: 100%;
}

input {
  min-height: 40px;
}
</style>
