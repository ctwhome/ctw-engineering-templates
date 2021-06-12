<template>
  <div>
    <div
      v-if="isLoggedIn"
      class="flex cursor-pointer rounded px-2 py-2 transition duration-200 ease-in-out hover:bg-gray-100 hover:text-white mr-6"
      @click="toProfile"
    >
      <img class="w-10 h-10 rounded-full" :src="user.photoURL">
      <div class="font-bold text-gray-500">
        {{ user.displayName }}
      </div>
    </div>
    <div v-else>
      <button
        class="inline-flex items-center transition no-underline py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
        @click="signInWithGoogle"
      >
        <svg
          class="w-4 h-4 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.0039 0C5.37491 0 0 5.373 0 12C0 18.627 5.37491 24 12.0039 24C22.0139 24 24.2691 14.707 23.3301 10H22H19.7324H12V14H19.7383C18.8487 17.4483 15.726 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4C14.009 4 15.8391 4.74575 17.2441 5.96875L20.0859 3.12891C17.9519 1.18491 15.1169 0 12.0039 0Z"
            fill="currentColor"
          />
        </svg>
        <span>Login with Google</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data () {
    return {
      activeTab: 0,
      loginDialog: false
    }
  },
  computed: {
    ...mapState({ user: state => state.user.authUser }),
    ...mapGetters('user', ['isLoggedIn'])
  },
  methods: {
    async signInWithGoogle () {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      // You can add or remove more scopes here provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const authData = await this.$fire.auth.signInWithPopup(provider)
      this.$store.commit('user/SET_AUTH_USER', authData)
      this.loginDialog = false
      this.$router.push('/')
    },

    toProfile () {
      this.$router.push({ name: 'profile' })
    }
  }
}
</script>
