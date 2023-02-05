import { FavoriteSport } from './favoriteSport'
import { Url } from '~/api/urls'
import { gymUrl } from '~/api/gym'

export type GymnasiumGymUsage = {
  id: number,
  type: FavoriteSport
}

export type Gymnasium = {
  id: number,
  gymnasium_type: string,
  gymnasium_type_fa: string,
  gym_usages: GymnasiumGymUsage[]
}

export type Media = {
  id: string;
  file: string;
}

export type GymComplex = {
  id: number,
  club: number,
  code: string,
  phone_number: string,
  name: string,
  owner: number,
  address: string,
  description: string,
  rules: string,
  instagram_username: string,
  gymnasiums: Gymnasium[],
  athlete_reviews: {
    average_score: number,
    reviews_count: number
  },
  thumbnail: Media,
  media: Media[]
}

export type GymComplexGetResponse = GymComplex

// :id
export const gymComplexUrl: Url = {
  app: 'gym-complex',
  methodName: ['$get', '$post', '$patch'],
  parent: gymUrl
}
