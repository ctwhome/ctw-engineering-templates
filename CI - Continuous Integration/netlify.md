# Netlify

Netlify offers a great CI experience from github repositories.
IT DOESN'T REQUIRE ANY GITHUB ACTIONS

## Using with Nuxt [From nuxt documentation](https://nuxtjs.org/faq/netlify-deployment/#configure)

- Connect repo with github
- set build to nuxt generate (for JAMStack)

### For a statically generated site

- Branch to deploy: **master**, or which-ever branch you prefer
- Build command: **npm run generate**
- Publish directory: **dist**

### For site generated in SPA mode

- Branch to deploy: **master**, or which-ever branch you prefer
- Build command: **npm run build**
- Publish directory: **dist**
