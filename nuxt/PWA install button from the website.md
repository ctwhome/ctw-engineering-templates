Component to show install application directly to your mobile/desktop

- Vue
- Vuetify
- js-cookie `yarn add -D js-cookie`

![image](https://user-images.githubusercontent.com/4195550/108035172-dc35f280-7036-11eb-845a-843745fd873a.png)

Component/InstallApp.vue
```vue
<template>
  <div id="app">
    <v-banner v-if="deferredPrompt" color="info" dark class="text-left">
      Install Supertaal. It won't take up space on your phone and also works
      offline!

      <template #actions>
        <v-btn text @click="dismiss">Dismiss</v-btn>
        <v-btn text @click="install">Install</v-btn>
      </template>
    </v-banner>
  </div>
</template>
<script>
import Cookies from 'js-cookie'

export default {
  name: 'App',
  data() {
    return {
      deferredPrompt: null,
    }
  },

  created() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      // Stash the event so it can be triggered later.
      if (Cookies.get('add-to-home-screen') === undefined) {
        this.deferredPrompt = e
      }
    })
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null
    })
  },
  methods: {
    dismiss() {
      Cookies.set('add-to-home-screen', null, { expires: 15 })
      this.deferredPrompt = null
    },
    install() {
      this.deferredPrompt.prompt()
    },
  },
}
</script>

```
When we click on the dismiss button, the banner disappears, but if we refresh the page, it will appear again. Considering that this is not user friendly, let’s make the banner appear again only 15 days after the user clicks in the dismiss button.

