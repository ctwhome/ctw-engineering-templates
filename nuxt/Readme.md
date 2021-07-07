# Goodies Nuxt

### Pre-hook commits with `eslint --fix` with [husky](https://github.com/typicode/husky#usage)

```shell
yarn add -D husky
```

```
# Install first time
npm set-script prepare "husky install"
npm run prepare

# Add a hook:
npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit
```

### is Dev

```javascript
// nuxt.config.js
const isDev = process.env.NODE_ENV === 'development'
```

Deploying to GitHub pages

```javascript
// nuxt.config.js

  // If deploying on github pages
  // http://<username>.github.io/<repository-name>.
  router: {
    // base: '/<repository-name>/'
    base: isDev ? '/' : '/nuxt/'
  },
```

## Transitions

### Nuxt transitions

nuxt.config.js

```
export default {
  css: [
    '~/assets/main.css'
  ]
}
```

```
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
```

### Awesome page transitions

*   Tansition for with super nuxt https://sahkyovision.medium.com/slick-image-resize-page-transition-with-nuxt-vuejs-d903025d799f
*   demo: https://nuxt-transition.netlify.app/

![image](https://user-images.githubusercontent.com/4195550/116843300-d2587000-abdf-11eb-91a0-5048ae309c7e.png)

\-Native-Like Animations for Page Transitions on the Web: https://css-tricks.com/native-like-animations-for-page-transitions-on-the-web/
