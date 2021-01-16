<template>
  <div>
    <v-avatar v-if="isLoggedIn" @click="toProfile" size="36">
      <v-img :src="user.photoURL" />
    </v-avatar>

    <v-dialog v-else v-model="loginDialog" width="340">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" outlined>
          Login<span class="hidden-xs-only">/Signup</span>
        </v-btn>
      </template>

      <v-card class="dialog-login text-center">
        <v-card-title class="headline text-wrap" primary-title>
          <div class="d-flex text-center">
            We are all made of carbon. <br />with enough pressure, <br />
            we can become Diamonds!
          </div>
        </v-card-title>
        <v-btn @click="signInWithGoogle" rounded class="flex-grow-1" depressed>
          <v-icon left> mdi-google </v-icon>
          Login with Google
        </v-btn>
        <v-card-actions>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
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

    toProfile() {
      this.$router.push({ name: "profile" });
    },
  },
};
</script>

<style>
.dialog-login {
  background: linear-gradient(90deg, #e3ffe7, #d9e7ff) !important;
}
</style>
