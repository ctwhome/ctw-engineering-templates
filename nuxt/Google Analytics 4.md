# Google Analytics 4 with Nuxt

nuxt/google-analytics is using the legacy Universal Analytics. To use the new Google Analytics 4 we use 'vue-tag' installed as a plugin for nuxt. More info [here](https://stackoverflow.com/questions/64612031/setup-google-analytics-4-in-nuxt-js)

This uses vue-gtag.

```shell
yarn add vue-gtag
```

Add env and the plugin to `Nuxt.config.js`: 
```js
export default {
  env: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,   // Note that this is the name it has to be passed inside 
  },
  ...
  
  plugins: [
  '@/plugins/gtag',
  ]
```

Create Plugin file: `plugins/gtag.js`:
```
import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: { id: process.env.googleAnalyticsId } //'G-XXXXXXXXXX' 
})
```
Passing router (from the plugin):
```
import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default ({ app }) => {
  Vue.use(
    VueGtag,
    {
      config: { id: ... },
    },
    app.router
  )
}
```
