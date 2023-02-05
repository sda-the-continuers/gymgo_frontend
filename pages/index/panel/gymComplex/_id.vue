<template>
  <div class="gym-complex">
    <div class="gym-complex-head">
      <div class="slide-show">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="(medium, index) in gym.media" :key="`intro-${index}`" class="slide">
            <div class="gym-complex-pic">
              <img :src="medium.file" alt="">
            </div>
          </swiper-slide>
          <div slot="pagination" class="swiper-pagination swiper-pagination-black" />
          <div slot="button-prev" class="swiper-button-prev nextPrevButton" />
          <div slot="button-next" class="swiper-button-next nextPrevButton" />
        </swiper>
        <div class="header-info">
          <div class="gym-complex-name">
            <h2> {{ gym.name | toPersianDigits }} </h2>
            <div class="shortcut-icons">
              <div class="gym-score">
                <h5> {{ gym.athlete_reviews.average_score | toPersianDigits }} </h5>
                <img :src="icons.starIcon" alt="">
              </div>
              <div class="gym-rules-bookmark">
                <div class="gym-rules-bookmark-icon">
                  <img :src="icons.rulesIcon" alt="" @click="$bvModal.show('gym-complex-rules-popup-modal')">
                </div>
                <div class="gym-rules-bookmark-icon">
                  <img :src="icons.archiveIcon" alt="" class="bookmark-icon" @click="doBookmark">
                </div>
              </div>
            </div>
          </div>
          <div class="gym-code">
            <h5>
              {{ staticData.complexCode }}
              {{ gym.code | toPersianDigits }}#
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="gym-complex-body">
      <div class="info">
        <div class="info-details">
          <img :src="icons.locationIcon" alt="address">
          <h5> {{ gym.address }} </h5>
        </div>
        <div class="info-details">
          <img :src="icons.callIcon" alt="phone">
          <h5> {{ gym.phone_number | toPersianDigits }} </h5>
        </div>
        <div class="info-details">
          <img :src="icons.instagramIcon" alt="web">
          <h5 class="english">
            {{ gym.instagram_username }}
          </h5>
        </div>
      </div>
      <div class="services">
        <h4> {{ staticData.complexServices }} </h4>
        <div class="services-for scroll-hidden">
          <template v-for="(gymnasium) in gym.gymnasiums">
            <div v-for="(gymUsage, index2) in gymnasium.gym_usages" :key="`gymUsage-${index2}`" class="service" @click="() => gotoRoute(gymUsage.id)">
              <h5> {{ gymUsage.type.title_fa }} </h5>
              <img :src="gymUsage.type.icon.file" alt="">
            </div>
          </template>
        </div>
      </div>
      <div class="explanation">
        <h4> {{ staticData.complexInfo }} </h4>
        <h6>
          {{ gym.description }}
        </h6>
      </div>
    </div>
    <div class="select-service ">
      <button @click="$bvModal.show('gym-services-popup-modal')">
        <h4> {{ staticData.selectAService }} </h4>
      </button>
    </div>
    <b-modal id="gym-services-popup-modal" hide-header hide-footer centered>
      <gym-services-page :gymnasiums="gym.gymnasiums" />
    </b-modal>
    <b-modal id="gym-complex-rules-popup-modal" hide-header hide-footer centered>
      <GymComplexRules :gym-complex="gym" />
    </b-modal>
  </div>
</template>

<script lang="ts">

import Component from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import defaultIcon from '~/static/icon.png'
import gymComplexImg from '~/static/gymComplex-img.png'
import cupIcon from '~/static/cup-icon.svg'
import rulesIcon from '~/static/rules-icon.svg'
import archiveIcon from '~/static/archive-icon.svg'
import starIcon from '~/static/star-icon.svg'
import locationIcon from '~/static/location-icon.svg'
import callIcon from '~/static/call-icon.svg'
import instagramIcon from '~/static/instagram-icon.svg'
import bookmarkMarkedIcon from '~/static/bookmark-marked-icon.svg'

import { GymComplex, GymComplexGetResponse, gymComplexUrl, Gymnasium, GymnasiumGymUsage } from '~/api/gym/gymComplex'
import 'swiper/css/swiper.css'
import AxiosRequest from '~/mixins/axiosRequest'
import GymServicesPage from '~/components/GymServices.vue'
import gym1 from '~/static/images/gymComplex2.png'
import gym2 from '~/static/images/gymComplex4.png'

const paginationTime = 5000
const slideSpeed = 1000

@Component({
  // Specify `components` option.
  // See Vue.js docs for all available options:
  // https://vuejs.org/v2/api/#Options-Data
  components: {
    Swiper,
    SwiperSlide,
    GymServicesPage
  }
})
export default class GymComplexPage extends Mixins(AxiosRequest) {
  staticData = {
    complexServices: 'سرویس های مجموعه',
    complexInfo: 'توضیحات مجموعه',
    selectAService: 'انتخاب سرویس',
    complexCode: 'کد مجموعه: ',
    gym1,
    gym2
  }

  selectedService: string = ''

  gymnasiumGymUsage: GymnasiumGymUsage = {
    id: 1,
    type: {
      id: 1,
      title: 'Basketball',
      title_fa: 'فوتسال',
      icon: {
        id: 1,
        file: cupIcon,
        sport_type: 1
      }
    }
  }

  gymnasium: Gymnasium = {
    id: 10,
    gymnasium_type: 'multi-task gym',
    gymnasium_type_fa: 'چمن مصنوعی',
    gym_usages: [this.gymnasiumGymUsage]
  }

  gym: GymComplex = {
    id: 3,
    club: 3,
    code: '1211',
    phone_number: '0921424873',
    name: 'مجموعه ورزشی 9 دی',
    owner: 3,
    address: 'تهران، پاسداران',
    description: 'زمین چمن مصنوعی',
    rules: '',
    instagram_username: '@_9dey_complex',
    gymnasiums: [this.gymnasium],
    athlete_reviews: {
      average_score: 4.2,
      reviews_count: 3
    },
    thumbnail: { file: gymComplexImg, id: '0' },
    media: [{ file: gym2, id: '1' }, { file: gym1, id: '2' }]
  }

  icons = {
    defaultIcon,
    cupIcon,
    rulesIcon,
    archiveIcon,
    starIcon,
    locationIcon,
    callIcon,
    instagramIcon
  }

  swiperOption = {
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    speed: slideSpeed,
    autoplay: {
      delay: paginationTime,
      disableOnInteraction: false,
      reverseDirection: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }

  get gymComplexId (): string {
    return this.$route.params.id || '4568'
  }

  gotoRoute (gymUsageId: number): void {
    this.$router.push({ name: 'index/panel/gymnasium/id', params: { id: gymUsageId.toString() } })
  }

  created () {
    this.fetchData()
  }

  fetchData () {
    this.axiosRequest({
      requestName: '$get',
      url: `${this.prepareUrl(gymComplexUrl)}${this.gymComplexId}/`,
      withAuth: true,
      thenFunc: (response) => {
        const data: GymComplexGetResponse = response
        this.gym = data
      },
      catchFunc: () => {
        // todo error handling
      }
    })
  }

  doBookmark () {
    if (this.icons.archiveIcon === archiveIcon) {
      this.icons.archiveIcon = bookmarkMarkedIcon
    } else {
      this.icons.archiveIcon = archiveIcon
    }
    // todo
  }
}
</script>

<style scoped>

@media (orientation: landscape) {
  .gym-complex .gym-complex-head .slide-show {
    padding: 0 15px;
    margin-top: 5px;
    border-radius: 15px 15px 0 0;
    align-self: center;
  }

  .gym-complex .gym-complex-head .slide-show .header-info {
    box-shadow: none !important;
    background-color: var(--primary-color) !important;
    /*border: 1px solid black;*/
    padding-top: 0 !important;
    top: 0;
  }

  .gym-complex .gym-complex-head .slide-show .slide .gym-complex-pic > img {
    border-radius: 15px 15px 0 0;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.27);
  }

  .slide-show >>> .swiper-pagination-bullet {
    margin-bottom: 0 !important;
  }
}

.gym-complex {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 100%;
  height: fit-content;
}

.gym-complex .gym-complex-head {
  display: flex;
  flex-direction: column;
}

.gym-complex .gym-complex-body {
  display: flex;
  flex-direction: column;
  padding: 0 5%;
}

.gym-complex-head .slide-show {
  width: 100%;
  /*min-height: 200px;*/
  text-align: center;
}

.slide-show .swiper{
  height: 100%;
  width: 100%;
  /*max-height: 250px;*/
  max-height: 33vh;
}
.slide-show .slide{
  display: flex;
  width: 100%;
  height: 100%;
}

.slide-show >>> .swiper-pagination-bullet {
  background-color: var(--tertiary-color);
  opacity: 1;
  margin-bottom: 20px;
  border-radius: 50%;
}

.slide-show >>> .swiper-pagination-bullet-active {
  background-color: var(--secondary-color);
  width: 18px;
  border-radius: 10px;
}

.slide .gym-complex-pic > img {
  width: 100%;
  /*max-height: 250px;*/
  object-fit: cover;
  max-height: 30vh;
  height: 100%;
}

.header-info {
  display: flex;
  flex-direction: column;
  background: var(--tertiary-color);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.27);
  border-radius: 25px 25px 0 0;
  padding: 2.5% 5% 0 5%;
  position: relative;
  top: -25px;
  z-index: 2;
}

.header-info .gym-code {
  padding: 0 0 10px 0;
  width: 100%;
  display: flex;
}

.gym-code > h5 {
  margin-bottom: 0;
  align-self: center;
  text-align: right;
}

.header-info .gym-complex-name {
  display: flex;
  margin: 10px 0;
}

.header-info .gym-complex-name > h2 {
  margin: 0;
  font-weight: bold;
  width: 100%;
  text-align: right;
}

.gym-complex-name .shortcut-icons {
  display: flex;
  justify-content: space-between;
  padding: 2% 0;
  gap: 15px;
}

.shortcut-icons .gym-score {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
}

.shortcut-icons .gym-score > img {
  width: 30px;
  max-width: 30px;
  min-width: 30px;
  padding: 4px;
}

.shortcut-icons .gym-score > h5 {
  font-weight: 600;
  margin-bottom: 0;
  align-self: center;
}

.shortcut-icons .gym-rules-bookmark {
  display: flex;
  gap: 5px;
}

.gym-rules-bookmark .gym-rules-bookmark-icon {
  display: flex;
  width: fit-content;
  height: fit-content;
}

.shortcut-icons .gym-rules-bookmark .gym-rules-bookmark-icon > img {
  width: 30px;
  height: 30px;
  max-width: 30px;
  cursor: pointer;
  padding: 4px;
}

.gym-complex-pic {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}

.gym-complex .gym-complex-body .info {
  text-align: right;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info .info-details {
  display: flex;
  flex-direction: row;
  direction: rtl;
  gap: 5px;
  margin: 10px 0;
}
.info-details > img {
  width: 20px;
}

.info-details > h5 {
  margin-bottom: 0;
  align-self: center;
  font-weight: 500;
}

.gym-complex .services {
  text-align: right;
  margin-bottom: 10px;
}

.services > h4 {
  font-weight: 600;
  padding-right: 10px;
  margin-bottom: 10px;
}

.services .services-for {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  direction: rtl;
  margin-bottom: 15px;
}

.services > h4, p {
  margin-bottom: 15px;
}

/*.scroll-hidden::-webkit-scrollbar {*/
/*  display: none;*/
/*}*/

/*!* Hide scrollbar for IE, Edge and Firefox *!*/
/*.scroll-hidden {*/
/*  -ms-overflow-style: none;  !* IE and Edge *!*/
/*  scrollbar-width: none;  !* Firefox *!*/
/*}*/

.services > p {
  text-align: right;
}
.services-for > img {
  height: 30px;
}
.services-for .service {
  background: var(--tertiary-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
  width: fit-content;
  min-width: fit-content;
  height: 50px;
  margin: 0 0 10px 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  gap: 5px;
  padding: 0 10px;
}

.service > h5 {
  margin-bottom: 0;
  font-weight: 500;
  align-self: center;
}

.service > img {
  width: 25px;
  height: 25px;
}

.gym-complex .explanation {
  text-align: right;
  margin-bottom: 20px;
  padding-right: 10px;
}
.explanation > h6, h4 {
  direction: rtl;
  text-align: justify;
  margin-bottom: 10px;
}

.explanation > h4 {
  font-weight: 600;
}

.select-service {
  padding: 0 5%;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: auto;
  margin-bottom: 0;
  position: sticky;
  bottom: 0;
  background-color: var(--primary-color);
}

.select-service > button {
  width: 100%;
  margin-bottom: min(5%,40px);
}

.select-service > button > h4 {
  width: 100%;
  margin-bottom: 0;
  align-self: center;
  display: flex;
  justify-content: center;
}

.select-service > select {
  direction: rtl;
  width: 100%;
  height: 50px;
  margin: 0 0 5% 0;
}

.english {
  direction: ltr;
  text-align: right;
}
</style>
