import { Url } from '~/api/urls'
import { gymUrl } from '~/api/gym'
import { Media } from '~/api/gym/gymComplex'

export type Comment = {
  person_img: string;
  person_name: string;
  date: string;
  text: string;
  score?: number;
}

export type GymUsage = {
  'id': number,
  'sport_type': string,
  'sport_type_fa': string,
  'gymnasium': {
    'id': number,
    'gymnasium_type': string,
    'gymnasium_type_fa': string,
    'description': string,
    'rules': string,
    'comments': Comment[] // todo sad: niaze asan?,
    'thumbnail': string,
    'media': Media[] // todo sad
  },
  'comments': Comment[] // todo sad,
  'session_minimum_price': number,
  'athlete_reviews': {
    'average_score': number,
    'reviews_count': number
  }
}

export type gymUsageGetResponse = GymUsage

// gym-usage/:id
export const gymUsageUrl: Url = {
  app: 'gym-usage',
  methodName: ['$get'],
  parent: gymUrl
}
