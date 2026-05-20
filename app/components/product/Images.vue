<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  '/images/b1.jpg',
  '/images/b2.jpg',
  '/images/b3.jpg',
  '/images/b1.jpg',
  '/images/b2.jpg',
  '/images/b3.jpg',
  '/images/b1.jpg',
  '/images/b2.jpg',
  '/images/b3.jpg',
];
</script>

<template>
  <div class="b-container">
    <Swiper
      :modules="[Pagination]"
      :loop="true"
      slidesPerView: 1,
      spaceBetween: 40,
      :breakpoints="{
        320: {
          pagination: {
            el: '.swiper-pagination',
            enabled: true,
          },
        },
        480: {
            slidesPerView: 2,
        },
        1024: {
          pagination: { enabled: false },
          slidesPerView: 4,
        },
      }"
      class="b-swiper"
    >
      <SwiperSlide v-for="(img, idx) in images" :key="idx">
        <img :src="img" alt="Slide image" />
      </SwiperSlide>
      <div class="swiper-pagination"></div>
    </Swiper>
  </div>
</template>

<style lang="scss">
.b-swiper {
  .swiper-slide {
    height: 440px;
  }
}

.b-container {
  width: 100%;

  margin: 0 auto;
  height: 100%;
  position: relative;

  .b-swiper {
    width: 100%;
    height: 440px;
    padding: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }


}
</style>
