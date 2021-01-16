# Nuxt Firebase Auth

Parts:

- Components (LoginButton with avatar and popup)
- Pages (Profile)
- Middleware for protection
- User Store

## Install
* Install nuxt firebase and pwa if it is not yet installed
`yarn add firebase @nuxtjs/firebase @nuxtjs/pwa`
* Register and app and get the config file from firebase console 


extra:

- vuex-easy-firestore (Working version with ease-vuex-firestate)

## Use in component

```js

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('userModule')  // Name of the module

...

computed:{
  // STATE
  ...mapState({ user: ({ data }) => data }) }

  // GETTER
  ...mapGetters('user', ['isLoggedIn'])
}
```

### Nuxt-config

```js

export default {
modules: ['@nuxtjs/firebase', '@nuxtjs/pwa'],
firebase: {
    // options
    config: {
      apiKey: '******',
      authDomain: '******.firebaseapp.com',
      databaseURL:'https://******.firebasedatabase.app',
      projectId: '******',
      storageBucket: '******.appspot.com',
      ...
    },
    services: {
      firestore: true,
      auth: {
        persistence: 'local', // default
        initialize: {
          onAuthStateChangedAction: 'user/onAuthStateChanged',
        },
        ssr: false, // default
      },
    },
},
```
