import { AxiosRequestConfig } from 'axios'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Url } from '~/api/urls'

export type AXIOS_REQUESTS = '$get' | '$post' | '$delete' | '$put' | '$patch'

export interface RequestParams {
  url: string | Url,
  data?: any | undefined,
  thenFunc?: (response: any) => void,
  catchFunc?: (error: any) => void,
  withAuth?: boolean,
  retrieveAuth?: boolean,
  config?: AxiosRequestConfig
}

export interface AxiosRequestParams extends RequestParams {
  requestName: AXIOS_REQUESTS
}

@Component
export default class AxiosRequest extends Vue {
  prepareUrl (urlObject: Url): string {
    let currObj: Url = urlObject
    const url: string[] = [currObj.app]
    while (currObj.parent) {
      currObj = currObj.parent
      url.push(currObj.app)
    }
    const urlString = url.reverse().join('/')
    return `${urlString}/`
  }

  defaultCatchFunction (error: any): void {
    if (error?.response?.data) {
      // this.$showError(error.response.data[Object.keys(error.response.data)[0]])
      console.error('error on Axios request.')
      console.error(error.response.data)
    }
  }

  getConfig (config: AxiosRequestConfig = {}, withAuth = false): AxiosRequestConfig {
    if (withAuth) {
      // todo sad,
      // put access token into config
      // const accessToken = this.$store.state
      config.headers = config.headers || {}
      config.headers.Authorization = `JWT ${this.$store.state.accessToken}`
    }
    // todo use jwt-token here
    // const auth = this.$cookie.getCookie('auth')
    // if (withAuth && auth) {
    //   const authHeader = `Token ${auth}`
    //   const authHeaderName = 'Authorization'
    //   config.headers = config.headers || {}
    //   config.headers[authHeaderName] = authHeader
    // }
    return config
  }

  axiosRequest (params: AxiosRequestParams): Promise<any> {
    const url: string = typeof params.url === 'string' ? params.url : this.prepareUrl(params.url)
    const config = this.getConfig(params.config, params.withAuth)
    const otherArgs = ('data' in params) ? [params.data, config] : [config]
    return this.$axios[params.requestName](url, ...otherArgs)
      .then((response: any) => {
        params.thenFunc?.(response)
        if (params.retrieveAuth && response.data && response.data.token) {
          // todo retrieve jwt-token
          // this.$cookie.setCookie('auth', response.data.token)
        }
        return response
      })
      .catch((error) => {
        const catchFunc = params.catchFunc || this.defaultCatchFunction
        catchFunc(error)
        return error
      })
  }
}
