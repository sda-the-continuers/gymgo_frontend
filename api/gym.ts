import { rootUrl, Url } from '~/api/urls'

export interface Gym {
  name: string;
  address: string;
  star: number;
  pic: string;
  numberOfVoters: number;
}

export enum ACCOUNT_TYPE{
  athlete= 'ATHLETE',
  gym_owner= 'GYM_OWNER',
}

export const gymUrl: Url = {
  app: 'gym',
  parent: rootUrl
}
