import Component from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import { Account, GENDER, ProfileResponse, profileUrl } from '~/api/account/athlete/profile'
import { ACCOUNT_TYPE } from '~/api/gym'
import AxiosRequest from '~/mixins/axiosRequest'

@Component
export default class BaseProfilePage extends Mixins(AxiosRequest) {
  athlete: Account = {
    id: 0,
    full_name: '',
    phone_number: '',
    birth_date: '',
    jalali_birth_date: '',
    gender: GENDER.male,
    account_type: ACCOUNT_TYPE.athlete,
    long: 100,
    lat: 90,
    address: '',
    favorite_sports: [],
    bookmarks: [],
    profile_picture: {
      account: 0,
      file: null
    }
  }

  async fetchProfile () {
    // console.log('sending profile request')
    const response: ProfileResponse = await this.axiosRequest({
      requestName: '$get',
      url: profileUrl,
      withAuth: true
    })
    // console.log(response)
    // console.log('getting profile request')
    this.athlete = response
  }

  genderFarsiName: Record<GENDER, string> = {
    MALE: 'مرد',
    FEMALE: 'زن'
  }
}
