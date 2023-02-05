import { Url } from '~/api/urls'
import { athleteUrl } from '~/api/account/athlete'
import { ACCOUNT_TYPE } from '~/api/gym'
import { FavoriteSport } from '~/api/gym/favoriteSport'

export enum GENDER {
  male = 'MALE',
  female = 'FEMALE',
}

export type Bookmark = {}

export type AccountPicture = {
  file: string
  account: number
}

export type Account = {
  'id': number,
  'full_name': string,
  phone_number?: string,
  birth_date: string,
  jalali_birth_date: string,
  gender: GENDER,
  user?: number,
  wallet?: number,
  crm_account?: number,
  account_type: ACCOUNT_TYPE,
  long: number;
  lat: number;
  address: string;
  favorite_sports: FavoriteSport[],
  bookmarks: Bookmark[],
  profile_picture: AccountPicture
}

export type ProfileResponse = Account

export type ProfileEditRequest = Partial<Account>

// 'profile/:id/
export const profileUrl: Url = {
  app: 'profile',
  methodName: ['$get', '$patch'],
  parent: athleteUrl
}
