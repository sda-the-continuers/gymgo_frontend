import { Url } from '~/api/urls'
import { gymUrl } from '~/api/gym'

export type FavoriteSportEditRequest = {
  favorite_sports: number[]
}

export type FavoriteSportEditResponse = {
  id: number
  favorite_sports: number[]
}

export type FavoriteSportIcon = {
  id: number
  file: string
  sport_type: number
}

export type FavoriteSport = {
  id: number
  title_fa: string
  title: string
  icon: FavoriteSportIcon
}

export type FavoriteSportGetResponse = FavoriteSport[]

export const favoriteSportUrl: Url = {
  app: 'favorite-sports',
  methodName: ['$patch', '$get'],
  parent: gymUrl
}
