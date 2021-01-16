<template>
  <div>
    <div v-if="isLoggedIn" @click="toProfile"
         class="cursor-pointer border-2 border-blue-500 rounded-lg font-bold text-blue-500 px-2 py-2 transition duration-200 ease-in-out hover:bg-blue-500 hover:text-white mr-6">
      <img :src="user.photoURL"/>
      {{ user.displayName }}
    </div>
    <div v-else>
      <button
          class="inline-block no-underline py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded">
        Login<span class="hidden-xs-only">/Signup</span>
      </button>
      <button @click="signInWithMicrosoft"
              class="inline-flex items-center no-underline py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded">
        <svg class="w-4 h-4 mr-2" width="22" height="22" viewBox="0 0 42 42" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
              d="M1 0C0.448 0 0 0.447 0 1V20H20V0H1ZM22 0V20H42V1C42 0.447 41.552 0 41 0H22ZM0 22V41C0 41.553 0.448 42 1 42H20V22H0ZM22 22V42H41C41.552 42 42 41.553 42 41V22H22Z"
              fill="currentColor"/>
        </svg>
        <span>Login with Microsoft</span>
      </button>


      <button @click="signInWithGoogle"
              class="inline-flex items-center no-underline py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded">

        <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
              d="M12.0039 0C5.37491 0 0 5.373 0 12C0 18.627 5.37491 24 12.0039 24C22.0139 24 24.2691 14.707 23.3301 10H22H19.7324H12V14H19.7383C18.8487 17.4483 15.726 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4C14.009 4 15.8391 4.74575 17.2441 5.96875L20.0859 3.12891C17.9519 1.18491 15.1169 0 12.0039 0Z"
              fill="currentColor"/>
        </svg>


        <span>Login with Google</span>
      </button>
    </div>


  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      activeTab: 0,
      loginDialog: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.authUser,
    }),
    ...mapGetters("user", ["isLoggedIn"]),
  },
  methods: {
    async signInWithGoogle() {
      const provider = new this.$fireModule.auth.GoogleAuthProvider();
      // You can add or remove more scopes here provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const authData = await this.$fire.auth.signInWithPopup(provider);
      this.$store.commit("user/SET_AUTH_USER", authData);
      this.loginDialog = false;
      this.$router.push("/");
    },

    async signInWithMicrosoft() {
      const provider = new this.$fireModule.auth.OAuthProvider('microsoft.com')
      // You can add or remove more scopes here provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

      this.$fire.auth.signInWithPopup(provider)
          .then((result) => {
            // IdP data available in result.additionalUserInfo.profile.
            // ...
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // OAuth access and id tokens can also be retrieved:
            var accessToken = credential.accessToken;
            var idToken = credential.idToken;
            console.log('🎹', result, accessToken, idToken,);
          })
          .catch((error) => {
            // Handle error.
            console.error('Error on authentication', error)
          });
    },

    toProfile() {
      this.$router.push({ name: "profile" });
    },
  },
};
</script>
