<template>
  <div>
    <div>
      <img :src="user.photoURL" width="125" contain/>
      <h1 class="text-2xl font-semibold text-gray-800">{{ user.displayName }}</h1>
      <div class="flex items-center mt-4 text-gray-700">
        <div class="text-xl px-2 text-sm">{{ user.email }}</div>
      </div>
    </div>
    <button
        class=" cursor-pointer mt-5 border-2 border-blue-500 rounded-lg font-bold text-blue-500 px-2 py-2 transition duration-200 ease-in-out hover:bg-blue-500 hover:text-white mr-6"
        @click="logout" depressed> LOG OUT
    </button>


  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";

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
