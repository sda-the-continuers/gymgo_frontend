<template>
  <div class="favorite-sports">
    <div class="favorite-sports-head-body">
      <h2> {{ headerText }} </h2>
      <h4> {{ test2 | toPersianDigits }} </h4>
      <div class="sport-options">
        <div v-for="(sportsRow,index) in splitSports" :key="`sports_row-${index}`" class="rows">
          <div v-for="(sport,index2) in sportsRow" :key="`sport-${index2}`">
            <button :onTheList="favoriteSports.includes(sport.id) ? 1 : 0" @click="() => toggleFavoriteSport(sport.id)">
              {{ sport.title_fa }}
              <img :src="sport.icon.file" :alt="sport.id">
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="btn">
      <button :disabled="isDisabled" @click="() => confirmFunc()">
        <h2> {{ confirmTitle }} </h2>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import AxiosRequest from '~/mixins/axiosRequest'
import JwtDecoder from '~/mixins/jwtDecoder'
import {
  FavoriteSport,
  FavoriteSportEditRequest,
  FavoriteSportEditResponse, FavoriteSportGetResponse,
  favoriteSportUrl
} from '~/api/gym/favoriteSport'
import { ProfileResponse, profileUrl } from '~/api/account/athlete/profile'

const TEMP_FAVORITE_SPORTS: FavoriteSport[] = []

@Component({
  props: {
    page: String
  }
})
export default class FavoriteSports extends Mixins(AxiosRequest, JwtDecoder) {
  // sports: Sport[] = [{ id: '1', name: 'فووووووووووووتبال' }, { id: '2', name: 'jofejoiwes' }, { id: '3', name: 'بسکتبال' },
  //   { id: '4', name: 'شنا' }, { id: '5', name: 'ضایبرهادیبنذردینتدرنت' }, { id: '6', name: 'هندبال' },
  //   { id: '7', name: 'تنیس' }, { id: '8', name: 'بدمینتون' }, { id: '9', name: 'فوتسال' }]
  sports: FavoriteSport[] = TEMP_FAVORITE_SPORTS

  favoriteSports: number[] = []
  headerText: string = 'ورزش‌های مورد علاقه خود را انتخاب کنید.'
  test2: string = '(3 مورد یا بیشتر)'

  rowSize = 3

  get splitSports (): FavoriteSport[][] {
    const grid: FavoriteSport[][] = []
    let lastRow: FavoriteSport[] = []
    let rowSize = 0
    const maxRowCharacters = 20
    let RowCharaters = 0
    this.sports.forEach((sport) => {
      if (rowSize + 1 < this.rowSize && (RowCharaters + sport.title_fa.length) <= maxRowCharacters) {
        lastRow.push(sport)
        rowSize += 1
        RowCharaters += sport.title_fa.length
        // console.log('--1--' +
        //             'RowCharaters:' + sport.title_fa + RowCharaters)
      } else if (rowSize + 1 === this.rowSize && (RowCharaters + sport.title_fa.length) <= maxRowCharacters) {
        lastRow.push(sport)
        grid.push(lastRow)
        RowCharaters += sport.title_fa.length
        // console.log('--2--' + 'RowCharaters:' + sport.title_fa + RowCharaters)
        lastRow = []
        rowSize = 0
        RowCharaters = 0
      } else if (sport.title_fa.length >= maxRowCharacters) {
        grid.push(lastRow)
        RowCharaters = sport.title_fa.length
        lastRow = []
        lastRow.push(sport)
        grid.push(lastRow)
        // console.log('--3--' + 'RowCharaters:' + sport.title_fa + RowCharaters)
        lastRow = []
        rowSize = 0
        RowCharaters = 0
      } else {
        grid.push(lastRow)
        lastRow = [sport]
        rowSize = 1
        RowCharaters = 0
        // console.log('--4--' + 'RowCharaters:' + sport.title_fa + RowCharaters)
        // console.log(sport.title_fa.length)
      }
    })
    if (lastRow.length !== 0) {
      grid.push(lastRow)
    }
    // console.log(grid)
    return grid
  }

  toggleFavoriteSport (sportId: number): void {
    if (this.favoriteSports.includes(sportId)) {
      this.favoriteSports = this.favoriteSports.filter(value => (value !== sportId))
    } else {
      this.favoriteSports.push(sportId)
    }
  }

  async editFavoriteSports () {
    const data: FavoriteSportEditRequest = {
      favorite_sports: this.favoriteSports.map(Number)
    }
    const response: FavoriteSportEditResponse = await this.axiosRequest({
      requestName: '$patch',
      url: favoriteSportUrl,
      withAuth: true,
      catchFunc: (error) => {
        console.log(error)
      },
      data
    })
    console.log('mission accomplished')
    console.log(response)
  }

  determine (determineObject, determiner) {
    return determineObject[determiner] || determineObject.default
  }

  confirmFuncData = {
    'index/FavoriteSports': () => {
      this.$router.push({ name: 'index/panel' })
    },
    default: () => {
      this.$router.push('/panel/Profile')
    }
  }

  async confirmFunc () {
    await this.editFavoriteSports()
    this.determine(this.confirmFuncData, this.$route.name)()
  }

  confirmTitleData = {
    'index/FavoriteSports': 'ورود',
    default: 'تایید'
  }

  get confirmTitle (): string {
    return this.determine(this.confirmTitleData, this.$route.name)
  }

  enter (): void {
    const data: FavoriteSportEditRequest = {
      favorite_sports: this.favoriteSports.map(Number)
    }
    this.axiosRequest({
      requestName: '$patch',
      url: favoriteSportUrl,
      withAuth: true,
      thenFunc: (resp) => {
        const response: FavoriteSportEditResponse = resp
        console.log('mission accomplished')
        console.log(response)
        this.$router.push({ name: 'index/panel' })
      },
      catchFunc: (error) => {
        console.log(error)
      },
      data
    })
  }

  get isDisabled (): boolean {
    return this.favoriteSports.length < 3
  }

  created () {
    this.fetchSports()
    this.fetchFavoriteSports()
  }

  async fetchSports () {
    const data: FavoriteSportGetResponse = await this.axiosRequest({
      requestName: '$get',
      url: favoriteSportUrl,
      withAuth: true
    })
    this.sports = data
  }

  async fetchFavoriteSports () {
    const response: ProfileResponse = await this.axiosRequest({
      requestName: '$get',
      url: profileUrl,
      withAuth: true
    })
    this.favoriteSports = response.favorite_sports.map(favoriteSport => favoriteSport.id)
  }
}

</script>

<style scoped>
.favorite-sports {
  display: flex;
  flex-direction: column;
  direction: rtl;
  width: 100%;
  height: 100%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  justify-content: space-between;
  overflow-y: auto;
}

.favorite-sports .favorite-sports-head-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 15px;
  gap: 5px;
}

.favorite-sports-head-body > h2 {
  margin: 70px 5% 5px 5%;
  text-align: center;
  font-size: larger;
  font-weight: 700;
  width: 100%;
}

.favorite-sports-head-body > h4 {
  margin: 0 0 63px 0;
  text-align: center;
  font-weight: 500;
}

.sport-options {
  display: flex;
  flex-direction: column;
  margin: 0 5% 40px 5%;
}

.sport-options .rows {
  display: flex;
  flex-direction: row;
  margin: 0 auto 11px auto;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}

.sport-options .rows button {
  display: flex;
  flex-direction: row-reverse;
  height: 40px;
  background-color: var(--tertiary-color);
  color: black;
  border: 2px var(--secondary-color);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 5px 10px;
  box-shadow: 0 4px 4px rgba(var(--secondary-text-color-rgb), 0.7);
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  font-size: min(21px, calc(3.89vw + 1.75vh)/2);
  font-weight: 600;
}

.sport-options .rows button[onTheList="1"] {
  background-color: var(--secondary-color);
  color: var(--tertiary-color);
  border-color: black;
}

.sport-options img {
  height: 60%;
}

.favorite-sports .btn {
  /*position: absolute;*/
  /*bottom: 0;*/
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 10% min(10%,40px) 10%;
}

/*.favorite-sports .btn > button {*/
/*  border-width: 0;*/
/*  padding: 0;*/
/*  height: 48px;*/
/*  width: 100%;*/
/*  top: 100%;*/
/*  font-size: min(26px, calc((5.55vw + 2.5vh)/2));*/
/*  font-weight: 600;*/
/*}*/

.btn > button {
  width: 100%;
}

.btn > button > h6 {
  font-weight: 600;
}

.favorite-sports .btn > button:disabled {
  background-color: var(--disable-button-color);
  /*background-color: var(--secondary-text-color);*/
  box-shadow: none;
}

</style>
