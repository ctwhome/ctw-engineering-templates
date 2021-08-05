Add the theme to the header: in nuxt.config.js

```js
head:{
  ...
  htmlAttrs: {
      'data-theme': 'light' // https://daisyui.com/docs/default-themes
    },
  }
```

Or at any other HTML tag element

```html
<div theme="light">Content</div>
```

Add the `tailwind.config.js` file

```js
module.exports = {  
  // Enable JIT for nuxt-tailwindcss
  mode: 'jit',
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ]

}
```
