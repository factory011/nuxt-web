
module.exports = {
  mode: 'universal',
  server: {
    port: 80, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  // other configs

  /*
  ** Headers of the page
  */
  head: {
    title: '前端那碗面' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '前端、blog、文章' || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/siteConf.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: 'skyblue',
    height: '2px'
    // 'components/loading.vue'
  },
  /*
  ** Global CSS
  */
  css: [
    { src: 'vuescroll/dist/vuescroll.css' },
    { src: 'assets/css/main.css' }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/axios',
    { src: '~plugins/axios.js', ssr: false },
    '~plugins/vuescroll',
    { src: '~plugins/vuescroll.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
  }
}
