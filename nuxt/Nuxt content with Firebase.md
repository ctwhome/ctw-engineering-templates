Use Firebase as nuxt content
```js
 async asyncData({ app, params, error }) {
    const ref = app.$fireStore.collection('foo')
  }
```
