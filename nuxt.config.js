const debugMode = false
if (debugMode) {
  console.log('process environment')
  console.log(process.env)
}

const API_BASE = 'localhost:8000'
const options = {
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  axios: {
    baseURL: API_BASE,
    browserBaseURL: API_BASE
  }
}

export default {
  // comment this part if you are not connecting to an ADSL
  server: {
    ...options.server
    // host: process.env.NUXT_HOST,
    // port: process.env.NUXT_PORT
  },

  router: {
    // skip prefetching
    // prefetchLinks: false,
    routeNameSplitter: '/'
    // extendRoutes (routes, resolve) {
    //   routes.push({
    //     name: 'custom',
    //     path: '*',
    //     component: resolve(__dirname, 'pages/404.vue')
    //   })
    // }
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-pwa-install.js',
    // { src: '~/plugins/vuex-persist', ssr: false },
    // filters
    '~/filters/filters.js',
    '~/plugins/vue-jalali-date.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/',
    // baseURL: process.env.AXIOS_BASE_URL,
    // must be set to true on production
    https: false,
    // for showing loading part
    progress: true,
    ...options.axios
  },

  publicRuntimeConfig: {
    axios: {
      // baseURL: process.env.AXIOS_BASE_URL,
      // browserBaseURL: process.env.AXIOS_BROWSER_BASE_URL
      ...options.axios
    }
  },

  privateRuntimeConfig: {
    axios: {
      // baseURL: process.env.AXIOS_BASE_URL,
      // browserBaseURL: process.env.AXIOS_BROWSER_BASE_URL
      ...options.axios
    }
  },

  loading: {
    color: 'blue'
    // background: 'blue'
  },

  // loadingIndicator: {
  //   name: 'nuxt',
  //   color: 'white',
  //   background: 'blue'
  // },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      name: 'GymTime',
      author: 'me'
      // nativeUI: true
    },
    manifest: {
      name: 'GymTime',
      short_name: 'جیم‌تایم',
      description: 'fantastic pwa',
      lang: 'en',
      display: 'fullscreen',
      background_color: 'blue',
      permissions: ['clipboardWrite']
      // useWebmanifestExtension: true
    },
    icon: {
      fileName: 'icon.png'
    },
    workbox: {
      enabled: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // typescript part
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  }
}
