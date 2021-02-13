Linting the code with ESLint in 

ESLint will warn if a developer uses a variable without declaring it first. Or if a developer uses “bind” when it's not necessary. With Prettier, your original code formatting is completely lost — it doesn't care what you think your code should look like, it just makes it conform to a set of rules


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
