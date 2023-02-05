<template>
  <div class="time-table">
    <div class="time-table-header-body">
      <div class="time-table-header">
        <h5> {{ innerContext.title }} </h5>
        <div class="header-help">
          <div>
            <div class="help-close-reserve-colored-icon" />
            <p> {{ innerContext.closeReserve }} </p>
          </div>
          <div>
            <div class="help-open-reserve-colored-icon" />
            <p> {{ innerContext.openReserve }} </p>
          </div>
        </div>
      </div>
      <div class="time-table-body">
        <div class="time-table-grid">
          <div v-for="(session, index) in timeSessions" :key="`session-${index}`" class="time-table-grid-session" :firstCol="index%8===0" :reserved="index%3===0&&index%8!==0">
            <p> {{ session }} </p>
          </div>
        </div>
      </div>
    </div>
    <div class="time-table-footer">
      <div slot="button-next" class="swiper-button-next nextPrevButton">
        <p> {{ innerContext.nextWeek }} </p>
      </div>
      <button class="back-button">
        {{ innerContext.back }}
      </button>
      <div slot="button-prev" class="swiper-button-prev nextPrevButton">
        <p> {{ innerContext.prevWeek }} </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'

@Component
export default class TimeTablePage extends Vue {
  innerContext = {
    title: 'جدول کامل سانس‌ها',
    openReserve: 'قابل رزرو',
    closeReserve: 'رزرو شده',
    back: 'بازگشت',
    nextWeek: 'هفته بعد',
    prevWeek: 'هفته قبل'
  }

  timeSessions: string[] = ['1', '0', '1', '1', '0', '1', '0', '1',
    '1', '0', '1', '1', '0', '1', '0', '1',
    '1', '0', '1', '1', '0', '1', '0', '1',
    '1', '0', '1', '1', '0', '1', '0', '1',
    '1', '0', '1', '1', '0', '1', '0', '1',
    '1', '0', '1', '1', '0', '1', '0', '1',
    '1', '0', '1', '1', '0', '1', '0', '1',
    '1', '0', '1', '1', '0', '1', '0', '1',
    '1', '0', '1', '1', '0', '1', '0', '1',
    '1', '0', '1', '1', '0', '1', '0', '1',
    '1', '0', '1', '1', '0', '1', '0', '1',
    '1', '0', '1', '1', '0', '1', '0', '1']
}
</script>

<style scoped>

h5 {
  display: flex;
  font-weight: bold;
  margin-bottom: 0;
  align-self: center;
  justify-content: center;
}

p {
  font-weight: bold;
  margin-bottom: 0;
  align-self: center;
}

.time-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.time-table-header-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.time-table-header-body .time-table-header {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  padding-top: 15px;
}

.time-table-header .header-help {
  display: flex;
  width: 100%;
  padding: 0 15px;
  direction: rtl;
  gap: 30px;
}

.header-help > div {
  display: flex;
  min-width: fit-content;
  gap: 5px;
  align-items: center;
}

.header-help .help-close-reserve-colored-icon {
  width: 10px;
  height: 10px;
  background: var(--secondary-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-color-rgb), 0.35);
  border-radius: 3px;
}

.header-help .help-open-reserve-colored-icon {
  width: 10px;
  height: 10px;
  background: var(--secondary-text-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 3px;
}

.time-table-header-body .time-table-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  margin-bottom: 30px;
}

.time-table-body .time-table-grid {
  display: grid;
  direction: rtl;
  grid-template-columns: 20% 10% 10% 10% 10% 10% 10% 10%;
  width: 100%;
  gap: 10px 5px;
  justify-content: space-evenly;
  padding: 0 2px;
}

.time-table-grid .time-table-grid-session {
  width: 100%;
  height: 40px;
  max-height: 45px;
  align-items: center;
  display: flex;
  justify-content: center;
  background: var(--secondary-text-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
}

.time-table-grid-session > p {
  display: none;
}

.time-table-grid-session[firstCol] > p {
  display: flex;
  justify-content: center;
}

.time-table-grid-session[firstCol] {
  background: var(--tertiary-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
}

.time-table-grid-session[reserved] {
  background: var(--secondary-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.35);
}
/* footer */
.time-table .time-table-footer {
  display: flex;
  position: sticky;
  bottom: 10px;
  width: 100%;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-color);
}

.time-table-footer .back-button {
  width: 100px;
}

.time-table-footer .swiper-button-prev {
  display: flex;
  position: unset;
  top: unset;
  width: fit-content;
  gap: 10px;
}
.time-table-footer .swiper-button-next {
  display: flex;
  flex-direction: row-reverse;
  position: unset;
  top: unset;
  width: fit-content;
  opacity: 1;
  gap: 10px;
}
</style>
