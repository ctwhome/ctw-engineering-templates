### Awesome page transitions 
- Tansition for with super nuxt https://sahkyovision.medium.com/slick-image-resize-page-transition-with-nuxt-vuejs-d903025d799f
- demo: https://nuxt-transition.netlify.app/
- ![image](https://user-images.githubusercontent.com/4195550/116843300-d2587000-abdf-11eb-91a0-5048ae309c7e.png)


-Native-Like Animations for Page Transitions on the Web: https://css-tricks.com/native-like-animations-for-page-transitions-on-the-web/


## Goodies Nuxt

### Pre-hook commits with `eslint --fix`

```shell
yarn add -D lint-staged husky
```

```javascript
// package.json
...
  "lint-staged": {
    "*.{js,vue}": "eslint",
    "*.{css,vue}": "stylelint". // <-- optional
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  ...
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
