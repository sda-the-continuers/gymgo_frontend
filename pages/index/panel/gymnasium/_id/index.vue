<template>
  <div class="gymnasium">
    <div class="gymnasium-head">
      <div class="slide-show">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="(medium, index) in usage.gymnasium.media" :key="`intro-${index}`" class="slide">
            <div class="gymnasium-pic">
              <img :src="medium.file" alt="">
            </div>
          </swiper-slide>
          <div slot="pagination" class="swiper-pagination swiper-pagination-black" />
          <div slot="button-prev" class="swiper-button-prev nextPrevButton" />
          <div slot="button-next" class="swiper-button-next nextPrevButton" />
        </swiper>
        <div class="initial-info">
          <div class="top-info-description">
            <h2> {{ usageName }} </h2>
            <div class="shortcut-icons">
              <div class="gym-score">
                <h5>
                  {{ usage.athlete_reviews.average_score | toPersianDigits }}
                </h5>
                <img :src="statics.starIcon" alt="">
              </div>
            </div>
          </div>
          <div class="info-description">
            <h5 class="colored">
              {{ innerContext.priceFrom }} {{ usage.session_minimum_price | toPersianDigits }} {{ innerContext.currency }}
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="gymnasium-body">
      <div class="tabs">
        <!-- tab #1 -->
        <input id="gymnasium-tab1" type="radio" class="tabs__radio" name="tabs-example" checked>
        <label for="gymnasium-tab1" class="tabs__label"> {{ innerContext.tabTitles[0] }} </label>
        <div class="tabs__content tab1-context">
          <!--          <p>{{ usage.gymnasium.description }}</p>-->
          <h5> {{ innerContext.gymDimensions }} {{ 20*40 | toPersianDigits }} مترمربع </h5>
          <h5> {{ innerContext.players_num }} {{ 12 | toPersianDigits }} {{ innerContext.person }} </h5>
          <h5> {{ innerContext.explanation }}: </h5>
          <h4> زمین چمن به ابعاد ۲۰ متر در ۴۰ متر مناسب برای ۲ تیم ۶ نفره </h4>
          <!--          <h4> {{ innerContext.options }} </h4>-->
          <!--          <div class="grid-container">-->
          <!--            <div v-for="(option, index) in usage.gymnasium.options" :key="`service-${index}`" class="grid-item">-->
          <!--              <img src="~/static/cup-icon.svg" alt="img">-->
          <!--              <p> {{ option | toPersianDigits }} </p>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
        <!-- tab #2 -->
        <input id="gymnasium-tab2" type="radio" class="tabs__radio" name="tabs-example">
        <label for="gymnasium-tab2" class="tabs__label"> {{ innerContext.tabTitles[1] }} </label>
        <div class="tabs__content">
          <h5>{{ usage.gymnasium.rules }}</h5>
          <!--          <p v-for="(rule, index) in gym.rules" :key="`rule-${index}`">-->
          <!--            {{ rule | toPersianDigits }}-->
          <!--          </p>-->
        </div>
        <!-- tab #3 -->
        <input id="gymnasium-tab3" type="radio" class="tabs__radio" name="tabs-example">
        <label for="gymnasium-tab3" class="tabs__label"> {{ innerContext.tabTitles[2] }} </label>
        <div class="tabs__content">
          <div v-for="(comment, index) in usage.comments" :key="`comment-${index}`" class="comments-for">
            <div class="comment-info">
              <div class="user-info">
                <img :src="comment.person_img" alt="ax">
                <h6> {{ comment.person_name }} </h6>
                <p> {{ leftDate(comment.date) }} </p>
              </div>
            </div>
            <h5> {{ comment.text | toPersianDigits }} </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="reserve-button" @click="doReserve">
      <button>
        <h4> {{ innerContext.reserveBtnTxt }} </h4>
      </button>
    </div>
  </div>
</template>

<script lang="ts">

import Component from 'vue-class-component'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { Mixins } from 'vue-property-decorator'
import defaultIcon from '~/static/icon.png'
import archiveIcon from '~/static/archive-icon.svg'
import starIcon from '~/static/star-icon.svg'
import avatarIcon from '~/static/avatar-icon.svg'
import { GymUsage, Comment, gymUsageUrl } from '~/api/gym/gymUsage'
import AxiosRequest from '~/mixins/axiosRequest'
import gymnasiumImg from '~/static/gymnasium-img.png'
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
    SwiperSlide
  }
})
export default class GymnasiumPage extends Mixins(AxiosRequest) {
  innerContext = {
    priceFrom: 'قیمت سانس: از ',
    currency: ' تومان',
    tabTitles: ['مشخصات', 'قوانین', 'نظرات'],
    gymDimensions: 'ابعاد سالن: ',
    players_num: 'تعدا نفرات: ',
    person: 'نفر',
    explanation: 'توضیحات',
    options: 'امکانات',
    reserveBtnTxt: 'رزرو',
    gym1,
    gym2
  }

  testTxt = 'مجموعه ورزشی 9 دی شماره 2 از جمله چمن‌های مصنوعی شمال تهران است.\n' +
    '\n' +
    'حداقل جلسه برای رزرو این مجموعه ۱۶ جلسه می باشد لطفا دقت بفرمایید.\n' +
    '\n' +
    'سالن دانشگاه شهید بهشتی شماره 2 ازنظر کف‌پوش، نور و تهویه از کیفیت مناسبی برقرار است. می‌توانید با توجه به ابعاد سالن دانشگاه شهید بهشتی شماره 2 برای فوتسال 5 به 5 ،والیبال و بسکتبال اقدام به رزرو این سالن ورزشی نمایید.\n' +
    '\n' +
    'سالن ورزشی دانشگاه شهید بهشتی شماره 2 آماده عقده قرارداد با همکاران، تیم‌های ورزشی و مربیان ورزشی جهت انجام تمرینات می‌باشد.'

  comment1: Comment = {
    person_img: avatarIcon,
    person_name: 'علی نوریان',
    date: new Date().toUTCString(),
    text: 'کیفیت چمن بسیار خوب👌'
  }

  comment2: Comment = {
    person_img: avatarIcon,
    person_name: 'اشکان خادمیان',
    date: new Date().toUTCString(),
    text: 'عالی'
  }

  usage: GymUsage = {
    id: 1,
    sport_type: 'Volleyball',
    sport_type_fa: 'چمن مصنوعی',
    gymnasium: {
      id: 1,
      gymnasium_type: 'Saloooon',
      gymnasium_type_fa: 'فوتسال',
      description: 'دارای اتاق‌های متعدد',
      rules: this.testTxt + '\n\n\n\n' + this.testTxt,
      comments: [],
      thumbnail: gymnasiumImg,
      media: [{ file: gym1, id: '1' }, { file: gym2, id: '2' }]
    },
    comments: [this.comment1, this.comment2],
    session_minimum_price: 350000,
    athlete_reviews: {
      average_score: 4.3,
      reviews_count: 10
    }
  }

  get usageName (): string {
    return `${this.usage.sport_type_fa} (${this.usage.gymnasium.gymnasium_type_fa})`
  }

  leftDate (dateString: string): string {
    // todo
    console.log(dateString)
    return '۲ هفته پیش'
  }

  get gymUsageId (): string {
    return this.$route.params.id
  }

  async fetchUsageData () {
    const data: GymUsage = await this.axiosRequest({
      requestName: '$get',
      url: `${this.prepareUrl(gymUsageUrl)}${this.gymUsageId}/`,
      withAuth: true
    })
    this.usage = data
  }

  doReserve () {
    // todo sad
    // this.$router.push({ name: 'index/panel/gymnasium/id/Reservation', params: { ...this.$route.params } })
  }

  // created () {
  //   this.fetchUsageData()
  // }

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

  statics = {
    defaultIcon,
    starIcon,
    archiveIcon
  }
}
</script>

<style scoped>

@media (orientation: landscape) {
  .gymnasium .initial-info {
    box-shadow: none !important;
    background-color: var(--primary-color) !important;
  }

  .gymnasium .gymnasium-head .slide-show {
    padding: 0 5px 0 5px;
    margin-top: 5px;
    border-radius: 15px 15px 0 0;
    align-self: center;
  }

  .gymnasium .gymnasium-head .slide-show .slide .gymnasium-pic > img {
    border-radius: 15px 15px 0 0;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.27);
  }
}

.gymnasium {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 100%;
  height: fit-content;
}
.gymnasium .gymnasium-head {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.gymnasium-head .slide-show {
  width: 100%;
  min-height: 209px;
  text-align: center;
}

.slide-show .swiper{
  height: 100%;
  width: 100%;
}
.slide-show .slide{
  display: flex;
  width: 100%;
  height: 100%;
}

.gymnasium-pic {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}

.gymnasium-pic > img {
  width: 100%;
  object-fit: cover;
  max-height: 30vh;
  height: 100%;
}

.initial-info {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: justify;
  margin: 0;
  padding: 5% 5% 5% 5%;
  background: var(--tertiary-color);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.27);
  border-radius: 25px 25px 0 0;
  font-weight: bold;
  position: relative;
  top: -25px;
  z-index: 2;
  gap: 15px;
}

.initial-info .top-info-description {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.top-info-description .shortcut-icons {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.shortcut-icons .gym-score {
  display: flex;
  flex-direction: row-reverse;
  gap: 5px;
}

.gym-score > h5 {
  font-weight: 600;
  margin-bottom: 0;
  align-self: center;
}

.gym-score > img {
  width: 20px;
}

.top-info-description > h2 {
  font-weight: 700;
}

.initial-info .info-description {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.info-description > h5 {
  font-weight: 400;
  margin-bottom: 0;
  align-self: center;
}

.gymnasium .gymnasium-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 5%;
  margin-top: -20px;
  margin-bottom: 20px;
}

/* Start of tabs css */
.gymnasium-body .tabs {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}

.tabs__label {
  padding: 10px 15px;
  cursor: pointer;
  color: var(--secondary-text-color);
  width: 30%;
  text-align: center;
}

.tabs__radio {
  display: none;
}

.tabs__content {
  order: 1;
  width: 100%;
  border-bottom: 3px transparent;
  line-height: 1.5;
  display: none;
}

.tabs__radio:checked + .tabs__label {
  font-weight: bold;
  color: var(--primary-text-color);
  border-bottom: 2px solid var(--secondary-color);
}

.tabs__radio:checked + .tabs__label + .tabs__content {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: justify;
}
/* End of tabs css */

.tabs__content .comments-for {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: justify;
  padding: 2% 2%;
  margin-bottom: 10px;
  background: var(--tertiary-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
  font-weight: bold;
  gap: 10px;
}

.tabs__content > h5 {
  font-weight: 400;
  line-height: 22px;
}

.comments-for .comment-info {
  display: flex;
  direction: rtl;
  justify-content: space-between;
}

.comment-info .user-info {
  display: flex;
  gap: 5px;
  width: 100%;
}

.user-info > img {
  vertical-align: middle;
  width: 40px;
  background-color: var(--secondary-text-color);
  /*height: 50px;*/
  border-radius: 50%;
}

.user-info > h6 {
  margin-bottom: 0;
  align-self: center;
  font-weight: bold;
  min-width: fit-content;
}

.user-info > p {
  margin-left: 2%;
  width: fit-content;
  min-width: fit-content;
}

.comments-for > h5 {
  padding: 0 5% 2.5% 5%;
}

.grid-container {
  display: grid;
  direction: rtl;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  /*padding: 5%;*/
  padding-bottom: 5%;
  width: 100%;
  gap: 5px;
}

.grid-container .grid-item {
  display: flex;
  /*border: 1px solid black;*/
  font-size: 12px;
  text-align: center;
  height: auto;
  padding-bottom: 5px;
}

.grid-item > p {
  width: 100%;
  margin-bottom: 0;
  align-self: center;
  text-align: right;
}

.grid-item > img {
  width: 30px;
}

.gymnasium .reserve-button {
  display: flex;
  justify-content: center;
  position: sticky;
  bottom: 0;
  margin-top: auto;
  margin-bottom: 0;
  padding: 0 5%;
  background-color: var(--primary-color);
}

.reserve-button > button {
  margin: auto 0 min(40px,5%) 0;
  width: 100%;
}

.tab1-context > h5 {
  font-weight: 600;
  padding: 2% 0;
}

</style>
