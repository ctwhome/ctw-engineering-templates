<template>
  <div class="bg-gray-100 flex flex-col items-center justify-center h-screen">
    <!-- component -->
    <div class="flex flex-col items-center w-full max-w-xs p-4 bg-white rounded-3xl md:flex-row">
      <div class="-mt-28 md:-my-16 md:-ml-32" style="clip-path: url(#roundedPolygon)">
        <img class="w-auto h-48 w-48 bg-white" :src="user.photoURL">
      </div>
      <div class="flex flex-col space-y-4">
        <div class="flex flex-col items-center md:items-start">
          <h2 class="text-xl font-medium">
            {{ user.displayName }}
          </h2>
          <p class="text-base font-medium text-gray-400">
            {{ user.email }}
          </p>
        </div>
        <div class="flex items-center justify-center space-x-3 md:justify-start">
          <button
            class=" cursor-pointer mt-5 border-2 border-gray-500 rounded-lg font-bold text-gray-500 px-2 py-2 transition duration-200 ease-in-out hover:bg-gray-500 hover:text-white mr-6"
            depressed
            @click="logout"
          >
            LOG OUT
          </button>
        </div>
      </div>
    </div>

    <div class="text-base font-medium text-gray-400 mt-10">
      uid: {{ user.uid }}
    </div>
    <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- rounded polygon generator => https://weareoutman.github.io/rounded-polygon/ -->
        <!-- polygon size 190 * 190 almost the same size as the image -->
        <clipPath id="roundedPolygon">
          <path
            d="M79 6.237604307034a32 32 0 0 1 32 0l52.870489570875 30.524791385932a32 32 0 0 1 16 27.712812921102l0 61.049582771864a32 32 0 0 1 -16 27.712812921102l-52.870489570875 30.524791385932a32 32 0 0 1 -32 0l-52.870489570875 -30.524791385932a32 32 0 0 1 -16 -27.712812921102l0 -61.049582771864a32 32 0 0 1 16 -27.712812921102"
          />
        </clipPath>
      </defs>
    </svg>

    <!--    <div-->
    <!--      class="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t-->
    <!--      lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between"-->
    <!--      style="box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;"-->
    <!--    >-->
    <!--      <div class="flex items-center">-->
    <!--        <img-->
    <!--          class="w-15 h-15 rounded-full mr-4"-->
    <!--          :src="user.photoURL"-->
    <!--          alt="Avatar of Jonathan Reinink"-->
    <!--        >-->
    <!--        <div class="text-sm">-->
    <!--          <p class="text-black font-bold text-xl mb-2">-->
    <!--            {{ user.displayName }}-->
    <!--          </p>-->
    <!--          <p class="text-grey-dark">-->
    <!--            {{ user.email }}-->
    <!--          </p>-->
    <!--          <p class="text-grey-dark">-->
    <!--            uid: {{ user.uid }}-->
    <!--          </p>-->
    <!--          <button-->
    <!--            class=" cursor-pointer mt-5 border-2 border-gray-500 rounded-lg font-bold text-gray-500 px-2 py-2 transition duration-200 ease-in-out hover:bg-gray-500 hover:text-white mr-6"-->
    <!--            depressed-->
    <!--            @click="logout"-->
    <!--          >-->
    <!--            LOG OUT-->
    <!--          </button>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      showButton: false
    }
  },
  computed: {
    ...mapState({ user: state => state.user.authUser }),
    ...mapGetters('user', ['isLoggedIn'])
  },
  methods: {
    async logout () {
      await this.$fire.auth.signOut()
      this.$router.push('/')
    },

    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
