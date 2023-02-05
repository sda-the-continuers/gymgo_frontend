<template>
  <div class="reservation">
    <div class="address">
      <p>
        <!--        {{ reservedGym.complexName }}-->
        >
        <!--        {{ reservedGym.gymnasiumName }}-->
        >
        <!--        {{ innerContext.submit }}-->
      </p>
    </div>
    <div class="calender">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(week, index) in weeks" :key="`week-${index}`" class="week">
          <div class="header">
            <h6>
              انتخاب تاریخ
            </h6>
            <div class="month-year">
              <h6>
                {{ week.month }}
              </h6>
              /
              <h6>
                {{ week.year }}
              </h6>
            </div>
          </div>
          <div class="timeline">
            <div v-for="(day, index2) in week.days" :key="`day-${index2}`" class="day">
              <h6>
                {{ day.sampleDate.jDay() }}
              </h6>
              <h6>
                {{ day.sampleDate.jDate() | toPersianDigits }}
              </h6>
            </div>
          </div>
        </swiper-slide>
        <div class="prev-next-button">
          <div slot="button-prev" class="swiper-button-prev nextPrevButton">
            هفته قبل
          </div>
          <div slot="button-next" class="swiper-button-next nextPrevButton">
            هفته بعد
          </div>
        </div>
      </swiper>
    </div>
    <div class="sans">
      <div class="sans-header">
        <h6>
          انتخاب سانس
        </h6>
        <h6>
          سه شنبه 19 اسفند
        </h6>
      </div>
      <div class="time-table">
        <div v-for="(session, index) in scheduledSessions" :key="`session-${index}`" class="session">
          {{ getInterval(session.startDate) }}
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="buttons-sans">
        مشاهده کامل سانس‌ها
      </button>
      <button class="buttons-reserve">
        رزرو
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import moment from 'jalali-moment'
import Vue from 'vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

// eslint-disable-next-line import/no-named-as-default-member
moment.locale('fa')
interface ScheduledSession {
  startDate: string;
  endDate : string;
  price : string;
}

interface Day {
  sampleDate: moment.Moment;
  scheduledSessions: ScheduledSession[];
}

class Week {
  private readonly date: moment.Moment
  days: Day[]

  get month (): number {
    return this.date.jMonth()
  }

  get year (): number {
    return this.date.jYear()
  }

  static isTheSameWeek (m1: moment.Moment, m2: moment.Moment): boolean {
    return m1.jWeek() === m2.jWeek() && m1.jYear() === m2.jYear()
  }

  constructor (sampleDate: moment.Moment) {
    this.date = sampleDate

    this.days = Array.from(Array(7).keys()).map((dayIndex) => {
      return {
        sampleDate: sampleDate.clone().subtract(sampleDate.weekday() - dayIndex, 'jDay'),
        scheduledSessions: []
      }
    })
  }

  belongsToWeek (sampleMoment: moment.Moment) {
    return Week.isTheSameWeek(sampleMoment, this.date)
  }

  addToWeek (scheduledSession: ScheduledSession, theMoment: moment.Moment) {
    this.days[theMoment.weekday()].scheduledSessions.push(scheduledSession)
  }
}
const slideSpeed = 1000

@Component(
  {
    // Specify `components` option.
    // See Vue.js docs for all available options:
    // https://vuejs.org/v2/api/#Options-Data
    components: {
      Swiper,
      SwiperSlide
    }
  }
)
export default class Reservation extends Vue {
  scheduledSessions: ScheduledSession[] = [
    {
      startDate: new Date().toUTCString(),
      endDate: new Date(2000, 0, 0).toUTCString(),
      price: ''
    }

  ]

  weeks: Week[] = []
  mounted () {
    const weeks: Week[] = []
    this.scheduledSessions.forEach((scheduledSession) => {
      const mm = moment(scheduledSession.startDate)
      let week:Week = weeks[weeks.length - 1]
      if (weeks.length === 0 || !week.belongsToWeek(mm)) {
        week = new Week(mm)
        weeks.push(week)
      }
      week.addToWeek(scheduledSession, mm)
    })
    this.weeks = weeks
  }

  swiperOption = {
    loop: false,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    speed: slideSpeed,
    // autoplay: {
    //   delay: paginationTime,
    //   disableOnInteraction: false,
    //   reverseDirection: true
    // },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }

  toDigits (digit: number): string {
    return digit.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  }

  getInterval (date: string) {
    const jj = new Date(date)
    return `${this.toDigits(jj.getHours())}:${this.toDigits(jj.getMinutes())}`
  }

  sessionTimeToString (out: string) {
    console.log(out)
  }
}
</script>

<style scoped>

h6 {
  font-weight: bold;
  margin-bottom: 0;
  align-self: center;
  display: flex;
  justify-content: center;
}

.reservation{
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 5%;
  overflow-y: auto;
}

.reservation .address {
  padding: 0 0 20px 0;
  display: flex;
  direction: rtl;
  text-align: justify;
}

.address > p {
  font-size: small;
  margin-bottom: 0;
  align-self: center;
}

.reservation > .calender {
  display: flex;
  min-height: fit-content;
  height: 200px;
  width: 100%;
  background: var(--tertiary-color);
  box-shadow: 0 4px 4px rgba(var(--secondary-text-color-rgb) , 0.3);
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
}

.calender >>> .swiper-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.calender .swiper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.swiper .week {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  gap: 10px;
}

.week .header {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  justify-content: space-between;
}

.header .month-year {
  display: flex;
  width: fit-content;
  flex-direction: row-reverse;
}

.week .timeline {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  justify-content: space-around;
}

.swiper .prev-next-button {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  justify-content: space-between;
}

.prev-next-button .swiper-button-prev {
  display: flex;
  position: unset;
  top: unset;
  width: fit-content;
  gap: 10px;
}
.prev-next-button .swiper-button-next {
  display: flex;
  flex-direction: row-reverse;
  position: unset;
  top: unset;
  width: fit-content;
  opacity: 1;
  gap: 10px;
}

.swiper-button-next::after {
  content: 'prev';
  font-size: 15px;
}

.swiper-button-prev::after {
  content: 'next';
  font-size: 15px;
}
/* Sans */
.sans {
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 100%;
  padding: 15px 15px;
  background: var(--tertiary-color);
  box-shadow: 0 4px 4px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 15px;
  margin-bottom: 20px;
  gap: 10px;
}

.sans .sans-header {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}

.sans .time-table {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  gap: 2px;
}

.time-table .session {
  border: 1px solid var(--primary-text-color);
  border-radius: 10px;
  height: 45px;
}
/* footer buttons */
.reservation .buttons {
  display: flex;
  flex-direction: column;
  position: sticky;
  background-color: var(--primary-color);
  bottom: 5px;
  left: 5%;
  right: 5%;
  margin-top: auto;
  margin-bottom: 0;
  gap: 15px;
}

.buttons .buttons-sans {
  background: var(--tertiary-color);
  box-shadow: 0 4px 4px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 15px;
  color: var(--secondary-color);
}

.buttons > .buttons-reserve {
  width: 100%;
  height: 48px;
  border-width: 0;
  margin-bottom: 10px;
}
</style>
