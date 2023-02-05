<template>
  <div class="bookmarks">
    <div class="grid-container">
      <div v-for="(option, index) in athlete.bookmarks" :key="`bookmark-${index}`" class="grid-item">
        <button :id="option.code" class="close" @click="removeBookmark(option)">
          <img src="~/static/trash-icon.svg" alt="">
        </button>
        <div class="item-img" @click="go2gymComplex(option)">
          <img :src="option.img" alt="img">
        </div>
        <div class="item-info" @click="go2gymComplex(option)">
          <h5 class="item-info-name">
            {{ option.name }}
          </h5>
          <h6> {{ option.address }} </h6>
          <h5 class="item-info-code">
            {{ staticData.code }} {{ option.code | toPersianDigits }}
          </h5>
        </div>
      </div>
      <!--      <div v-for="(option, index) in athlete.bookmarks" :key="`bookmark-${index}`" class="grid-item">-->
      <!--        <button :id="option.code" class="close" @click="removeBookmark(option)">-->
      <!--          <img src="../../../static/trash-icon.svg" alt="">-->
      <!--        </button>-->
      <!--        <div class="item-img">-->
      <!--          <img src="../../../static/gymComplex-img.png" alt="img">-->
      <!--        </div>-->
      <!--        <div class="item-info" @click="go2gymComplex(option)">-->
      <!--          <h6> {{ option.name }} </h6>-->
      <!--          <p> {{ option.address }} </p>-->
      <!--          <h6>-->
      <!--            {{ staticData.code }} {{ option.code | toPersianDigits }}-->
      <!--          </h6>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="grid-item-end" @click="go2HomeSearchPage">
        <p class="add">
          +
        </p>
        <h6> {{ staticData.addNew }} </h6>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Athlete, Complex } from '~/api/Athlete'
import gym1 from '~/static/images/gym1.png'
import gym2 from '~/static/images/gym3.png'
import gym3 from '~/static/images/gym5.png'
import gym4 from '~/static/images/gymComplex1.png'
import gym5 from '~/static/images/gymComplex2.png'

@Component
export default class Bookmarks extends Vue {
  staticData = {
    code: 'کد: ',
    addNew: 'اضافه کردن'
  }

  images = {
    gym1,
    gym2,
    gym3,
    gym4,
    gym5
  }

  athlete: Athlete = {
    name: '',
    birth: '',
    gender: '',
    address: '',
    phone: '09123456789',
    favoriteSports: [],
    image: '',
    bookmarks: [
      { img: gym4, code: '3451', name: 'مجموعه ورزشی شهید عباس‌پور', address: 'تهران، حکیمیه' },
      { img: gym5, code: '1211', name: 'مجموعه ورزشی ۹ دی', address: 'تهران، پاسداران' },
      { img: gym2, code: '2644', name: 'مجموعه ورزشی تختی', address: 'تهران، چهاراه آزادی، تقاطع شهید همت' },
      { img: gym1, code: '7878', name: 'مجموعه ورزشی شهید سلحشور', address: 'تهران، اقدسیه' },
      { img: gym3, code: '6353', name: 'مجموعه ورزشی شهیدبهشتی', address: 'تهران، ولنجک' }
    ]
  }

  go2HomeSearchPage () {
    this.$router.push({ name: 'index/panel/HomeSearch' })
  }

  removeBookmark (complex: Complex) {
    const index = this.athlete.bookmarks.indexOf(complex, 0)
    if (index > -1) {
      this.athlete.bookmarks.splice(index, 1)
    }
  }

  go2gymComplex (complex: Complex) {
    // todo: add api
    console.log(complex.name)
    this.$router.push({ name: 'index/panel/gymComplex/id' })
  }
}
</script>

<style scoped>
.bookmarks {
  width: 100%;
  min-height: 100%;
  height: fit-content;
}

@media (max-width: 500px) {
  .bookmarks .grid-container {
    display: grid;
    direction: rtl;
    /*grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));*/
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    padding: min(5%,30px) 5% 5% 5%;
    width: 100%;
    gap: 25px;
  }
}

@media (min-width: 500px) {
  .bookmarks .grid-container {
    display: grid;
    direction: rtl;

    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    padding: min(5%,30px) 5% 5% 5%;
    width: 100%;
    gap: 15px;
  }
}

.grid-container .grid-item {
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 30px;
  text-align: center;
  height: auto;
  max-height: 300px;
  padding-bottom: 5px;
  background: white;
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
}

.grid-item .close {
  position: absolute;
  background-color: transparent;
  bottom: 10px;
  left: 8px;
  width: 20px;
  display: flex;
  font-size: 0;
  box-shadow: none;
}

.close > img {
  width: 20px;
  margin-bottom: 0;
  margin-top: auto;
}

.grid-item .item-img {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}

.item-img > img {
  width: 100%;
  max-width: 100%;
  /*max-height: 150px;*/
  height: 150px;
  border-radius: 10px 10px 0 0;
  object-fit: cover;
}

.grid-item .item-info {
  display: flex;
  flex-direction: column;
  direction: rtl;
  cursor: pointer;
  padding: 5% 5%;
  gap: 2%;
  height: 100%;
  align-items: center;
  justify-content: space-evenly;
}

.item-info > .item-info-name {
  font-weight: 700;
  margin-bottom: 0;
  align-self: flex-start;
}

.item-info .item-info-code {
  font-weight: 500;
  margin-bottom: 0;
  align-self: flex-start;
}

.item-info > h6 {
  font-weight: 300;
  margin-bottom: 0;
  align-self: flex-start;
  padding: 10px 0;
}

.grid-container .grid-item-end {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  font-size: 30px;
  text-align: center;
  height: auto;
  min-height: 200px;
  max-width: 400px;
  cursor: pointer;
  color: var(--secondary-color);
  background-color: white;
  border: 2px dashed var(--secondary-color);
  box-shadow: 0 4px 4px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 15px;
}

.grid-item-end .add {
  align-self: center;
  background: transparent;
  font-size: xxx-large;
  margin: 0;
  line-height: 100%;
}

.grid-item-end > h6 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 0;
  align-self: center;
}

</style>
