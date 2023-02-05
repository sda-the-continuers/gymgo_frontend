<template>
  <div class="page-not-found">
    <div class="page-not-found-header-body">
      <img :src="statics.errorImg" alt="">
    </div>
    <h4> {{ innerContext.text }} </h4>
    <div class="buttons">
      <button>
        {{ innerContext.tryAgain }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import errorImg from '~/static/404.svg'

@Component
export default class PageNotFoundPage extends Vue {
  statics = {
    errorImg
  }

  innerContext = {
    text: 'صفحه مورد نظر یافت نشد!',
    tryAgain: 'تلاش مجدد'
  }
}
</script>

<style scoped>
.page-not-found {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--secondary-color);
  color: #FFFFFF;
  padding: 5% 5% min(5%,40px) 5%;
  justify-content: space-between;
}

.page-not-found .page-not-found-header-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10vh;
  padding-top: 10vh;
}

.page-not-found-header-body > img {
  height: 40vh;
  align-self: center;
}

.page-not-found > h4 {
  font-weight: 500;
  text-align: center;
}

.page-not-found .buttons {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: min(40px,5%);
}

.buttons > button {
  width: 100%;
  border: 1px solid white;
  color: white;
}
</style>
