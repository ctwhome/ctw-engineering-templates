# Linting and formatting the code with ESLint and Prettier as a plugin

ESLint will warn if a developer uses a variable without declaring it first. Or if a developer uses “bind” when it's not necessary. With Prettier, your original code formatting is completely lost — it doesn't care what you think your code should look like, it just makes it conform to a set of rules



## Disable ESLint line or Block code
Disable line:
```js
// eslint-disable-line 
or 
// eslint-disable-line <rule1, rule2> 
```

All rules block:

```js
/* eslint-disable */
...
/* eslint-enable  */
```


With specific rules:
```js
/* eslint-disable <rule1, rule2> */
...
/* eslint-enable <rule1, rule2> */
```

## Disable Nuxt EsLint black overlay
// nuxt.config.js
```js
build: {
    hotMiddleware: {
    client: {
      overlay: false,
    },
  },
}
```
