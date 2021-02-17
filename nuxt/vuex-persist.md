github/ vuex-persist.js

```
plugins: [
  { src: '~/plugins/vuex-persist', ssr: false }
],
```

```js
// ~/plugins/vuex-persist.js
import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    /* your options */
  }).plugin(store)
}
```
