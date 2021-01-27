yarn add vuex-easy-firestore firebase

Protect route with (Inside a page)
```
export default {
  middleware: 'auth'
}
```

nuxt.config.js
```js
 plugins: [
    { src: '~/plugins/easy-firestore.js' },
  ],
  
  
// Modules (https://go.nuxtjs.dev/config-modules)
modules: ['@nuxtjs/firebase', '@nuxtjs/pwa'],

firebase: {
    // options
    config: {
      apiKey: 'AIzaSyCoL81_pTgGPdfhYN4Uk2m629Qyi45ZDbU',
      authDomain: 'focus-diamond.firebaseapp.com',
      databaseURL:
        'https://***.firebasedatabase.app',
      projectId: '***',
      storageBucket: '****.appspot.com',
      messagingSenderId: '***',
      appId: '****',
      measurementId: '***',
    },
    services: {
      firestore: true,
      auth: {
        persistence: 'local', // default
        initialize: {
          // onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
          onAuthStateChangedAction: 'user/onAuthStateChanged',
          // subscribeManually: false,
        },
        ssr: false, // default
        // emulatorPort: 9099,
        // emulatorHost: 'http://localhost',
      },
      database: true,
      messaging: true,
    },
  },
```
