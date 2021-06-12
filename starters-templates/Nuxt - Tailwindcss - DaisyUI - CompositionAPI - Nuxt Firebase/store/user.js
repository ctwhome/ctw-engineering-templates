const initialState = () => ({
  authUser: {
    id: null,
    uid: null,
    displayName: null,
    photoURL: null
  }
})

export const state = () => ({
  authUser: initialState()
})

export const getters = {
  isLoggedIn: (state) => {
    try {
      return state.authUser.id !== null
    } catch {
      return false
    }
  }
}

export const mutations = {
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },

  SET_AUTH_USER: (state, authUser) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
      photoURL: authUser.photoURL,
      displayName: authUser.displayName
    }
  }
}

export const actions = {
  async nuxtServerInit ({ dispatch }, ctx) {
    if (this.$fire.auth === null) {
      console.error(
        'nuxtServerInit Example not working - this.$fire.auth cannot be accessed.'
      )
    }

    if (ctx.$fire.auth === null) {
      console.error(
        'nuxtServerInit Example not working - ctx.$fire.auth cannot be accessed.'
      )
    }

    if (ctx.app.$fire.auth === null) {
      console.error(
        'nuxtServerInit Example not working - ctx.$fire.auth cannot be accessed.'
      )
    }

    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser from the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      )

      await dispatch('onAuthStateChanged', {
        authUser,
        claims
      })
    }
  },

  onAuthStateChanged (ctx, { authUser, claims }) {
    if (!authUser) {
      ctx.commit('RESET_STORE')
      return
    }
    // $nuxt.$store.dispatch('userData/openDBChannel')
    ctx.commit('SET_AUTH_USER', authUser)
  }
}
