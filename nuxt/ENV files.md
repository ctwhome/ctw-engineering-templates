There are two ways to get ENV variables with nuxt. Defined in the `nuxt.config.js` and with .env files
1. Import nuxt config from js files
2. Env files: useful for sensitive api variables.
3. nuxt.config: useful for base urls, development, etc.

## OPTION 1 - import nuxt.config
Define the variable you wanr to expose and access to them by importing nuxt.config.js inside js files

`nuxt.config.js`
```js
env: {
  supabaseUrl: process.publicRuntimeConfig.NUXT_ENV_SUPABASE_URL,
  supabaseKey: process.publicRuntimeConfig.NUXT_ENV_SUPABASE_KEY,
},
```
`jsFile.js`
```js
import config from '~/nuxt.config'
const SUPABASE_URL = config.publicRuntimeConfig.supabaseUrl
const SUPABASE_KEY = config.publicRuntimeConfig.supabaseKey

```

## OPTION 2 - ENV Files


publicRuntimeConfig should hold all env variables that are public as these will be exposed on the frontend. This could include a reference to your public URL for example.
privateRuntimeConfig should hold all env variables that are private and that should not be exposed on the frontend. This could include a reference to your API secret tokens for example.
⚠️ privateRuntimeConfig always overrides publicRuntimeConfig on server-side. $config in server mode is { ...public, ...private } but for client mode only { ...public }



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
