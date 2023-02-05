import { AXIOS_REQUESTS } from '~/mixins/axiosRequest'

export type Url = {
  app: string;
  methodName?: AXIOS_REQUESTS[];
  parent?: Url;
}

export const rootUrl: Url = {
  app: 'api'
}
