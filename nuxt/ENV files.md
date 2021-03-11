There are two ways to get ENV variables with nuxt. Defined in the `nuxt.config.js` and with .env files
1. Env files: useful for sensitive api variables.
2. nuxt.config: useful for base urls, development, etc.

## OPTION 1 - ENV Files
`.env` and `.local.env` files
```
GOOGLE_MAPS_API_KEY=xxxxxxxxxxxxxx
GOOGLE_TAG_MANAGER_KEY=xxxxxxxxxxxxxx
```

**Steps: **
1. Install `yarn add @nuxtjs/dotenv`
2. Set it in the build modules:
```
buildModules: [
  ...
  '@nuxtjs/dotenv'
  ...
],
```
Use it in your files
    
4. mounted() {
    console.log(process.env.TEST_VARIABLE)
}


## OPTION 2 - Inside Nuxt config

Useful for base urls, development, etc.

### Syntax:
NUXT_ENV_VAR_NAME

If you define environment variables starting with NUXT_ENV_ in the build phase (e.g. NUXT_ENV_COOL_WORD=freezing nuxt build, they'll be automatically injected into the process environment. Be aware that they'll potentially take precedence over defined variables in your nuxt.config.js with the same name.


nuxt.config.js
```

export default {
  env: {
    **baseUrl**: process.env.BASE_URL || 'http://localhost:3000'
  }
}

```


### Using inside other js files
```js
import axios from 'axios'

export default axios.create({
  baseURL: process.env.**baseUrl**. <==. call with process.env
})
```

### Using inside Vue components
```js
```
