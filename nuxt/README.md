## Goodies Nuxt

### Pre-hook commits with `eslint --fix`

```shell
yarn add -D lint-staged husky
```

package.json

```javascript
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

nuxt.config.js

```javascript
const isDev = process.env.NODE_ENV === 'development'
```

Deploying to GitHub pages

```javascript
  // If deploying on github pages
  // http://<username>.github.io/<repository-name>.
  router: {
    // base: '/<repository-name>/'
    base: isDev ? '/' : '/nuxt/'
  },
```
