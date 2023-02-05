<template>
  <div class="home-page">
    <div class="home-page-body">
      <h3 class="welcome-title">
        {{ innerContext.welcome }}
      </h3>
      <div class="home-banner">
        <img src="../../../static/panel-img.png" alt="">
      </div>
      <h4 class="home-text">
        {{ innerContext.text }}
      </h4>
    </div>
    <div class="search">
      <button @click="goToHomeSearch">
        <h4> {{ innerContext.searchButtonText }} </h4>
      </button>
    </div>
  </div>
</template>

<script>
import Component from 'vue-class-component'
import Vue from 'vue'

@Component
export default class HomePage extends Vue {
  innerContext = {
    welcome: 'به جیم‌تایم خوش آمدید.',
    text: 'سانس خود را با جیم‌تایم تو خونه رزرو کن!',
    searchButtonText: 'جستجو کد ۴ رقمی مجموعه'
  }

  goToHomeSearch () {
    this.$router.push({ name: 'index/panel/HomeSearch' })
  }
}
</script>

<style scoped>
.home-page {
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}

.home-page .home-page-body {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.home-page-body > .welcome-title{
  direction: rtl;
  font-weight: 700;
  margin-top: 8.125vh;
  width: 100%;
  padding: 0 5%;
}
.home-page-body > .home-banner{
  margin: 20px auto;
  width: 100%;
  padding: 0 5%;
  height: 35vh;
  /*background-color: deepskyblue;*/
}

.home-banner > img {
  max-width: 100%;
  max-height: 100%;
  justify-content: center;
}

.home-page-body > .home-text{
  width: 100%;
  padding: 0 5%;
  margin: 0 auto;
  direction: rtl;
  text-align: center;
  justify-content: center;
  font-weight: 600;
}

.home-page > .search {
  padding: 20px 5% max(min(5%,40px),20px) 5%;
  width: 100%;
  display: flex;
}

.search > button {
  width: 100%;
  height: 48px;
}

::placeholder {
  text-align: center;
}

</style>
