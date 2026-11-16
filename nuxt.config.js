import colors from 'vuetify/es5/util/colors'

export default {
   server: {
     port: 3335, // default: 3000
     host: '0.0.0.0', // default: localhost serverIP: '172.28.17.102' 
   },
  ssr: false,
  // every page requires login, except pages that set `auth: 'guest'` / `auth: false`
  router: {
    middleware: ['auth'],
  },
  head: {
    titleTemplate: '%s Video',
    title: 'Admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Your app description here',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/Tpluslogo.png' }],
  },

  css: ['view-design/dist/styles/iview.css'],

  plugins: [
    '~/plugins/iview.js',
    '~/plugins/chartjs.js',
    { src: '~/plugins/vue-quill-editor.js', ssr: false },
  ],
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    '@nuxtjs/google-fonts',
    '@nuxtjs/auth-next',
  ],
  auth: {
    store: '~/store',
    redirect: {
      login: '/login',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'user.token',
          global: true,
          name: 'authorization',
          type: '',
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: {
            url: `${process.env.AUTH_API_URL}/loginAdminVideo`,
            method: 'post',
          },
          logout: {
            url: `${process.env.API_BASE_URL}/users/logout`,
            method: 'delete',
          },
          user: {
            url: `${process.env.AUTH_API_URL}/marketdetail`,
            method: 'get',
          },
        },
      },
    },
  },
  proxy: {
    '/users/': {
      target: process.env.API_BASE_URL,
      pathRewrite: { '^/users/': '/users/' },
      changeOrigin: true,
      secure: false,
    },
  },

  axios: {
    baseURL: process.env.API_BASE_URL,
  },
  publicRuntimeConfig: {
    apiMainServiceUrl: process.env.API_MAIN_SERVICE_URL,
    apiVideoUrl: process.env.API_VIDEO_URL,
    mediaUrl: process.env.MEDIA_URL,
  },
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  googleFonts: {
    families: {
      'Noto+Sans+Lao': true,
    },
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      options: { customProperties: true }, // exposes var(--v-primary-base) etc.
      themes: {
        // Tplus brand palette (used via color="primary", "error", ... and CSS vars)
        light: {
          primary: '#FFC400',
          'primary-dark': '#B38A00',
          'primary-light': '#FFF8E1',
          secondary: '#111827',
          accent: '#B38A00',
          info: '#2563EB',
          success: '#16A34A',
          warning: '#F59E0B',
          error: '#DC2626',
          background: '#F5F6F8',
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {},
}
