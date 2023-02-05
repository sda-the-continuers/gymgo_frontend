<template>
  <div class="no-internet">
    <div class="no-internet-header-body">
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
import errorImg from '~/static/no-internet.svg'

@Component
export default class NoInternetPage extends Vue {
  statics = {
    errorImg
  }

  innerContext = {
    text: 'لطفا وضعیت اینترنت خود را بررسی کنید و دوباره تلاش کنید',
    tryAgain: 'تلاش مجدد'
  }
}
</script>

<style scoped>
.no-internet {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--secondary-color);
  color: #FFFFFF;
  padding: 5% 5% min(5%,40px) 5%;
  justify-content: space-between;
}

.no-internet .no-internet-header-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10vh;
  padding-top: 10vh;
}

.no-internet-header-body > img {
  height: 40vh;
  align-self: center;
}

.no-internet > h4 {
  font-weight: 500;
  text-align: center;
}

.no-internet .buttons {
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
