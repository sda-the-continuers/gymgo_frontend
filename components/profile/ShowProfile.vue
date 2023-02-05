<template>
  <div class="profile">
    <div class="profile-header-body">
      <div class="top-options">
        <div class="message">
          <h5 v-if="progress!==100">
            {{ innerContext.discountTxt }}
          </h5>
        </div>
        <div class="primary-info">
          <div class="avatar">
            <div class="avatar-edit">
              <img src="~/static/camera-icon.svg" alt="">
              <input id="imageUpload" type="file" accept=".png, .jpg, .jpeg" @change="uploadPicture($event.target.files[0])">
              <label for="imageUpload" />
            </div>
            <div class="avatar-preview">
              <img id="imagePreview" :src="athlete.profile_picture.file || statics.avatarIcon" alt="">
            </div>
          </div>
          <div class="num-progress">
            <h2> {{ athlete.phone_number | toPersianDigits }} </h2>
            <div class="profile-progress">
              <b-progress max="100" :value="progress" />
              <h5> {{ progress | toPersianDigits }}% </h5>
            </div>
            <h5> {{ innerContext.progressStatus }} </h5>
          </div>
        </div>
      </div>
      <div class="bottom-options">
        <div class="more-info">
          <h5> {{ innerContext.name }} </h5>
          <input v-model="athlete.full_name" :placeholder="innerContext.empty" disabled>
          <h5> {{ innerContext.birth }} </h5>
          <input v-model="athlete.jalali_birth_date" :placeholder="innerContext.empty" disabled>
          <h5> {{ innerContext.gender }} </h5>
          <input :value="genderFarsiName[athlete.gender]" :placeholder="innerContext.empty" disabled>
          <h5> {{ innerContext.address }} </h5>
          <input v-model="athlete.address" :placeholder="innerContext.empty" disabled>
          <h5> {{ innerContext.favoriteSports }} </h5>
          <div class="favorite-sports-slide-bar">
            <div class="favorite-sports-for">
              <div v-for="(service, index) in athlete.favorite_sports" :key="`service-${index}`" class="fave">
                <!--              <img :src="service.icon" alt="">-->
                <img src="~/static/cup-icon.svg" alt="">
                <h6> {{ service.title_fa }} </h6>
              </div>
            </div>
            <!--            <button>-->
            <!--              +/- -->
            <!--            </button>-->
          </div>
        </div>
      </div>
    </div>
    <div class="submit-buttons">
      <button @click="doChange">
        <h4> {{ innerContext.changeData }} </h4>
      </button>
      <button class="exit-account" @click="logOut">
        <h4> {{ innerContext.exit }} </h4>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import { Account } from '~/api/account/athlete/profile'
import BaseProfilePage from '~/components/profile/BaseProfilePage'
import avatarIcon from '~/static/avatar-icon.svg'
import { ProfilePicturePostRequest, profilePictureUrl } from '~/api/account/profilePicture'
import FileAPIHandler from '~/mixins/fileAPIHandler'
import AccessTokenHandler from '~/mixins/accessTokenHandler'

@Component
export default class ShowProfile extends Mixins(BaseProfilePage, AccessTokenHandler, FileAPIHandler) {
  statics = {
    avatarIcon
  }

  innerContext = {
    discountTxt: 'با تکمیل پروفایل خود از تخفیف های ویژه برخوردار شوید.',
    progressStatus: 'میزان تکمیل فعالیت',
    name: 'نام و نام خانوادگی',
    birth: 'تاریخ تولد',
    gender: 'جنسیت',
    male: 'مرد',
    female: 'زن',
    address: 'آدرس',
    favoriteSports: 'ورزش های مورد علاقه',
    empty: 'وارد نشده',
    changeData: 'تغییر اطلاعات',
    exit: 'خروج از حساب',
    save: 'ذخیره اطلاعات'
  }

  created () {
    this.fetchProfile()
  }

  get progress (): number {
    return ShowProfile.determineProgress(this.athlete)
  }

  static progressPoint: Partial<Record<keyof Account, number>> = {
    full_name: 15,
    birth_date: 20,
    gender: 20,
    address: 15,
    favorite_sports: 20
  }

  static isValid = (param: any): boolean => {
    if (typeof param === 'string') {
      return param !== ''
    } else {
      return !!param
    }
  }

  static determineProgress (account: Account): number {
    let prog = 0
    Object.entries(this.progressPoint).forEach(([prop, score]) => {
      prog += this.isValid(account[prop as keyof Account]) ? score : 0
    })
    return prog
  }

  doChange () {
    this.$router.push({ query: { edit: 'true' } })
  }

  uploadPicture (pictureFile: File) {
    console.log('picture uploaded', pictureFile)
    // todo upload picture
    const data: ProfilePicturePostRequest = {
      account: this.athlete.id,
      file: pictureFile,
      is_active: true
    }
    return this.axiosRequest({
      requestName: '$post',
      url: profilePictureUrl,
      data: this.toFormData(data),
      thenFunc: () => {
        this.$router.go(0)
      },
      withAuth: true,
      retrieveAuth: true
    })
  }
}
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 100%;
  height: 100%;
}

.profile .profile-header-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  margin-bottom: 60px;
}

/* hide scrollbar but allow scrolling */
.profile-header-body {
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
}

.profile-header-body::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}

.profile-header-body .top-options {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: justify;
  width: 100%;
}

.top-options .message {
  display: flex;
  direction: rtl;
  text-align: center;
  padding: 10px 5%;
  color: var(--secondary-color);
}

.message > h5 {
  width: 100%;
  justify-content: center;
  margin-bottom: 0;
  align-self: center;
}

.top-options .primary-info {
  display: flex;
  direction: rtl;
  padding: min(5%,30px) 5%;
  margin: 0 5%;
  align-items: center;
  background: white;
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
}

.primary-info .avatar {
  display: flex;
  position: relative;
  height: 80px;
  width: 80px;
  min-height: 80px;
  min-width: 80px;
}

/*.avatar .edit-img {*/
/*  border-radius: 50%;*/
/*  background-color: black;*/
/*  height: 20px;*/
/*  position: absolute;*/
/*  top: 2px;*/
/*  right: 2px;*/
/*  cursor: pointer;*/
/*}*/

/*.avatar .profile-img {*/
/*  border-radius: 50%;*/
/*  background-color: cornflowerblue;*/
/*  height: 100%;*/
/*}*/

.avatar .avatar-edit {
  position: absolute;
  top: 0;
  right: 0;
  /*cursor: pointer;*/
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  border: 2px solid white;
}

.avatar-edit input {
  display: none;
}

.avatar-edit > img {
  margin: auto;
  width: 12px;
  position: absolute;
  top: 2px;
  left: 1px;
  right: 1px;
  bottom: 2px;
}

.avatar-edit input + label {
  display: inline-block;
  position: absolute;
  width: 100%;
  height: 100%;
  margin-bottom: 0;
  border-radius: 100%;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
}

.avatar .avatar-preview {
  border-radius: 50%;
  height: 100%;
  width: 100%;
  background-color: var(--secondary-text-color);
  display: flex;
  justify-content: center;
  align-self: center;
}

.avatar-preview > img {
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.primary-info .num-progress {
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  width: 100%;
  align-items: center;
}

.num-progress > h2 {
  padding: 10px 0 10px 0;
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  font-weight: 700;
  letter-spacing: 0.2em;
}

.num-progress > h5 {
  margin-top: 5px;
}

.num-progress .profile-progress {
  width: 100%;
  display: flex;
  gap: 5px;
}

.profile-progress .progress {
  /*height: 100%;*/
  margin: auto 0;
  width: 100%;
  background-color: var(--secondary-text-color);
  height: 5px;
  /*color: var(--secondary-color);*/
  /*border-radius: 6px;*/
  /*filter: brightness(0) saturate(100%) invert(48%) sepia(73%) saturate(991%) hue-rotate(339deg) brightness(104%) contrast(93%);*/
}

.profile-progress .progress >>> .progress-bar {
  background-color: var(--secondary-color);
}

.profile-progress > h5 {
  width: fit-content;
  margin-bottom: 0;
  align-self: center;
  color: var(--secondary-color);
}

.profile-header-body .bottom-options {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: justify;
  width: 100%;
  padding: min(5%,30px) 5% 0 5%;
  margin-bottom: 30px;
}

.bottom-options .more-info {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: justify;
  padding: 0 0 20px 0;
  font-weight: bold;
}

.more-info > h5 {
  padding: min(max(15px,2vh),45px) 5px 2px 0;
  margin-bottom: 5px;
}

.more-info > input {
  height: 40px;
  background: var(--tertiary-color);
  box-shadow: 0 7px 15px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
  border: none;
  padding: 0 10px;
}

.more-info > select {
  height: 40px;
  background: var(--tertiary-color);
  box-shadow: 0 7px 15px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
  border: none;
}

.profile .submit-buttons {
  display: flex;
  direction: rtl;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  bottom: 0;
  background: var(--primary-color);
  padding: 0 5% min(40px,5%) 5%;
}

.submit-buttons > button {
  border-width: 0;
  height: 48px;
  width: 47.5%;
  min-width: 100px;
}

.submit-buttons .exit-account {
  background: var(--tertiary-color);
  box-shadow: 0 4px 4px rgba(var(--secondary-text-color-rgb), 0.3);
  color: var(--secondary-color);
}

.favorite-sports-slide-bar {
  display: flex;
  position: relative;
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
  position: absolute;
  display: flex;
  left: 0;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
}

/*.scroll-hidden::-webkit-scrollbar {*/
/*  display: none;*/
/*}*/

/*!* Hide scrollbar for IE, Edge and Firefox *!*/
/*.scroll-hidden {*/
/*  -ms-overflow-style: none;  !* IE and Edge *!*/
/*  scrollbar-width: none;  !* Firefox *!*/
/*}*/

.favorite-sports-slide-bar > p {
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

.fave > h6 {
  margin-bottom: 0;
  align-self: center;
}
</style>
