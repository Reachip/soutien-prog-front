
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',
  router: {
    base: '/'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SoutienProg - Proposition de soutien par les étudiants pour les étudiants',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Single page app permettant de proposer des cours de soutiens organisées par des étudiants pour des étudiants à l\'IUT d\'Annecy.' },
      { hid: 'og:image', property: 'og:image', content: '/logo.png' },
      { hid: 'og:url', property: 'og:url', content: 'https://soutienprog-acy.netlify.app' },
      { hid: 'og:title', property: 'og:title', content: 'SoutienProg' },
      { hid: 'og:description', property: 'og:description', content: 'Single page app permettant de proposer des cours de soutiens organisées par des étudiants pour des étudiants à l\'IUT d\'Annecy.' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/logo.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style/animation.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vuelidate.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "nuxt-material-design-icons"
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost/api',
    proxyHeaders: false,
    credentials: true
  }
}
