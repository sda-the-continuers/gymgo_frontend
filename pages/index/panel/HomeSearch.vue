<template>
  <div class="home-search">
    <div class="search-box">
      <input v-model="searchInput" type="number" placeholder="جستوجوی کد چهاررقمی" :empty="searchInput == '' ? 1 : 0" @change="() => onChange()">
    </div>
    <div id="home-search-no-search-result" class="no-search-result" style="display: none">
      <h3> {{ innerContext.noResultFound }} </h3>
      <img :src="statics.noSearchResult" alt="no search result">
      <h6> {{ innerContext.pleaseCheckYourCode }} </h6>
    </div>
    <div v-for="(gym,index) in searchResult" :key="`index-${index}`" class="search-result" @click="goToGymComplex(gym.code)">
      <!--      <img :src="gym.thumbnail.file" alt="gym-pic">-->
      <div class="description">
        <h4> {{ gym.name }} </h4>
        <div class="address">
          <img src="../../../static/location-icon.svg" alt="star">
          <h6> {{ gym.address | toPersianDigits }} </h6>
        </div>
        <div class="score">
          <img src="../../../static/star-icon.svg" alt="star">
          <h6> {{ gym.athlete_reviews.average_score | toPersianDigits }} </h6>
        </div>
      </div>
      <div class="profile-img">
        <img src="../../../static/gymComplex-img.png" alt="gym-pic">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Mixins } from 'vue-property-decorator'
import Component from 'vue-class-component'
import AxiosRequest from '~/mixins/axiosRequest'
import JwtDecoder from '~/mixins/jwtDecoder'
import searchIcon from '~/static/search-icon.svg'
import noSearchResult from '~/static/no-search-result.svg'
import { GymComplex, GymComplexGetResponse, gymComplexUrl } from '~/api/gym/gymComplex'

@Component
export default class HomeSearch extends Mixins(AxiosRequest, JwtDecoder) {
  innerContext = {
    noResultFound: 'نتیجه‌ای یافت نشد!',
    pleaseCheckYourCode: 'لطفا از صحت کد وارد شده اطمینان حاصل فرمایید و سپس مجددا تلاش کنید.'
  }

  statics = {
    searchIcon,
    noSearchResult
  }

  tempGymComplex: GymComplex = {
    id: 1,
    club: 10,
    code: '110',
    phone_number: '09118778804',
    name: 'مجموعه ورزشی شهید حججی',
    owner: 10,
    address: 'چهارراه آزادی، جنب شرکت آزادالکترونیک',
    description: 'این یک توضیح دمو می باشد.',
    rules: 'اینجا قوانین مجموعه می آید.',
    instagram_username: 'آیدی اینستا',
    gymnasiums: [],
    athlete_reviews: {
      average_score: 3,
      reviews_count: 4
    },
    thumbnail: { file: '', id: '' },
    media: []
  }

  searchResult: GymComplex[] = []

  searchInput: string = ''

  onChange () {
    console.log('changed')
    if (this.searchInput.length === 4) {
      this.search()
    }
  }

  search () {
    this.axiosRequest({
      requestName: '$get',
      url: `${this.prepareUrl(gymComplexUrl)}${this.searchInput}/`,
      withAuth: true,
      thenFunc: (response) => {
        document.getElementById('home-search-no-search-result').style.display = 'none'
        const data: GymComplexGetResponse = response
        this.searchResult = [data]
      },
      catchFunc: () => {
        this.searchResult = []
        document.getElementById('home-search-no-search-result').style.display = 'flex'
      }
    })
  }

  goToGymComplex (gymCode: string) {
    this.$router.push({ name: 'index/panel/gymComplex/id', params: { id: gymCode } })
  }
}
</script>

<style scoped>
.home-search {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  min-height: 100%;
  padding: min(5%,30px) 5% 5% 5%;
}
.home-search > .search-box {
  width: auto;
  margin: 20px 0;
}
.search-box > input {
  border: 1px solid var(--secondary-color);
  /*box-shadow: 0 7px 15px rgba(246, 117, 56, 0.35);*/
  border-radius: 15px;
  width: 100%;
  height: 45px;
  padding: 5px 20px;
  color: var(--secondary-color);
  font-size: min(27px, calc((5vw + 2vh)/2));
  font-weight: bold;
  outline: none;
  background-image: url("~/static/search-icon.svg");
  background-repeat: no-repeat;
  background-position: right;
  background-origin: content-box;
}

.search-box > input::placeholder {
  padding-right: 30px;
  font-weight: 500;
  color: rgba(var(--primary-text-color-rgb), 0.3);
  font-size: min(21px, calc((5vw + 2vh)/2));
}

.search-box > input[empty="0"] {
  box-shadow: 0 7px 15px rgba(var(--secondary-color-rgb), 0.35);
  background-image: none;

}

.search-box > input:hover {
  box-shadow: 0 7px 15px rgba(var(--secondary-color-rgb), 0.35);
}

.home-search .no-search-result {
  padding-top: 5vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5vh;
}

.no-search-result > img {
  height: 36vh;
}

.no-search-result > h3,h6 {
  text-align: center;
}

.home-search > .search-result {
  margin: 2% 0;
  display: flex;
  flex-direction: row-reverse;
  direction: rtl;
  text-align: right;
  cursor: pointer;
  background: white;
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
  justify-content: flex-end;
  height: 12vh;
  min-height: 60px;
}

.search-result .profile-img {
  padding: 5px;
  height: 100%;
  width: 100%;
  min-height: max(60px,12vh);
  max-width: max(60px,12vh);
}

.search-result .profile-img > img {
  width: 100%;
  max-width: 100%;
  height: 100%;
  border-radius: 15px;
  object-fit: cover;
}

.search-result .description {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px 2%;
  justify-content: space-around;
  gap: 4%;
}

.description h4 {
  font-weight: 500;
}

.description > h6 {
  margin-bottom: 0;
  align-self: center;
  font-weight: 300;
  width: 100%;
  text-align: right;
}

.description .address {
  display: flex;
  flex-direction: row;
  direction: rtl;
  gap: 5px;
}

.address > img {
  min-width: 20px;
  width: 20px;
}

.address > h6 {
  text-align: right;
  margin-bottom: 0;
  font-weight: 300;
}

.description .score {
  display: flex;
  flex-direction: row;
  direction: rtl;
  gap: 5px;
}

.score > img {
  /*width: 20px;*/
  height: 20px;
}

.score > h6 {
  text-align: right;
  margin-bottom: 0;
  align-self: center;
}

</style>
