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
