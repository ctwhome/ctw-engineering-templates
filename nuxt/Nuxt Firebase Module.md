# Firebase module for Nuxt
https://firebase.nuxtjs.org/


## Installation
```
yarn add firebase @nuxtjs/firebase
```

nuxt config

```js
modules: ['@nuxtjs/firebase'],

firebase: {
   // options
   config: {
          apiKey: '<apiKey>',
          authDomain: '<authDomain>',
          databaseURL: '<databaseURL>',
          projectId: '<projectId>',
          storageBucket: '<storageBucket>',
          messagingSenderId: '<messagingSenderId>',
          appId: '<appId>',
          measurementId: '<measurementId>'
        },
    // Enable as many services as you want
    services: {
       firestore: {
        enablePersistence: true,
        synchronizeTabs: true,
      },
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
      database: false,
      messaging: false,
    },
    }
}
```

## Firestore Rules (https://firebase.google.com/docs/firestore/security/get-started)
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // get documents for the current auth user
    match /users/{userId}/{document=**} {
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
  }
}

```

## CRUD DATA

With the rules above, Firestore will return error if the user is not auth, automatically without you do anything. 

Usefull:
* `const uid = this.$fire.auth.currentUser?.uid`
* `const messageRef = this.$fire.firestore.collection('users').doc(this.$fire.auth.currentUser?.uid)`


```vue
<template>
  <div>
    <input type="text" v-model="data" @keypress.enter="writeToFirestore" />
    {{ data }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: '',
    }
  },
  mounted() {
    this.readFromFirestore()
  },
  methods: {
    async writeToFirestore() {
      const messageRef = this.$fire.firestore
        .collection('users')
        .doc(this.$fire.auth?.currentUser?.uid)
      try {
        await messageRef.update({
          message2: this.data,
        })
      } catch (e) {
        alert(e)
      }
    },

    readFromFirestore() {
      const messageRef = this.$fire.firestore
        .collection('users')
        .doc(this.$fire.auth.currentUser?.uid)

      try {
        messageRef.onSnapshot((snapShot) => {
          console.log('🎹', snapShot.data().message2)
          this.data = snapShot?.data()?.message2
        })

        // alert(messageDoc.data().message)
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>

```
