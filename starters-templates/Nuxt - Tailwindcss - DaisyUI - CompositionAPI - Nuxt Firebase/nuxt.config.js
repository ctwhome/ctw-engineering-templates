export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
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
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase'
  ],
  firebase: {
    config: {
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY || 'AIzaSyCdGNpm9WHTALTW0eV7Yr9PLwE1eyLKNqs',
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN || 'valorlistcom.firebaseapp.com',
      // databaseURL: process.env.VUE_APP_FIREBASE_DB_URL ,
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID || 'valorlistcom',
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET || 'valorlistcom.appspot.com',
      messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_FIREBASE_APP_ID || '1:306078714150:web:1a7ee1a43384abc88399e7',
      measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID || '306078714150'
    },
    services: {
      auth: {
        persistence: 'local', // default
        initialize: {
          // onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
          onAuthStateChangedAction: 'user/onAuthStateChanged'
          // subscribeManually: false,
        },
        ssr: false // default
        // emulatorPort: 9099,
        // emulatorHost: 'http://localhost',
      },
      firestore: {
        //   memoryOnly: false, // default
        // chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '1OrKdGHFijWxaKA7HlYKfc5n5yJ2', // default
        // enablePersistence: true,
        emulatorPort: 5005,
        emulatorHost: 'localhost',
        settings: {
          // Firestore Settings - currently only works in SPA mode
        }
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
