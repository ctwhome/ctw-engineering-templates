<template>
  <p> It requiers scss and Vue 3</p>
  <swiper
    virtual
    effect="cube"
    :slides-per-view="1"
    :space-between="50"
    style="height: 300px"
  >
    <swiper-slide
      class="card"
      v-for="(slideContent, index) in slides"
      :key="index"
      :virtualIndex="index"
      >{{ slideContent }}
    </swiper-slide>
  </swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Virtual, EffectCube } from "swiper";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/effect-cube/effect-cube.scss";

SwiperCore.use([EffectCube, Virtual]);
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    // Create array with 1000 slides
    const slides = Array.from({ length: 100 }).map(
      (el, index) => `Slide ${index + 1}`
    );
    return {
      slides,
    };
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
  },
};
</script>

<style>
.card {
  height: 300px;
  width: 300px;
  background: cornflowerblue;
}
</style>
