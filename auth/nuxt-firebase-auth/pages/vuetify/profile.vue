<template>
  <v-main fluid>
    <v-app-bar dense elevation="0" color="transparent">
      <v-btn @click="goBack" rounded text>
        <v-icon left> mdi-arrow-left </v-icon>
        <span class="hidden-xs-only">Go back</span>
      </v-btn>
    </v-app-bar>
    <v-container>
      <v-row no-gutters justify="center" align="start">
        <v-card width="500" class="mx-4 pa-2">
          <div style="display: grid; grid-template-columns: 125px 1fr">
            <v-img :src="user.photoURL" width="125" contain />
            <v-card-title primary-title>
              <div>
                <div class="headline">
                  {{ user.displayName }}
                </div>
                <div>{{ user.email }}</div>
              </div>
            </v-card-title>
          </div>
          <v-card-actions>
            <v-btn @click="logout" depressed> LOG OUT</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { version } from "../../package.json";

export default {
  name: "App",
  data() {
    return {
      showButton: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.authUser,
    }),
    ...mapGetters("user", ["isLoggedIn"]),
    version() {
      return version;
    },
  },
  methods: {
    async logout() {
      await this.$fire.auth.signOut();
      this.$router.push("/");
    },

    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
