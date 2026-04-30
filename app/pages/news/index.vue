<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Thumbs } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

const thumbsSwiper = ref<SwiperType | null>(null)
const setThumbsSwiper = (swiper: SwiperType) => {
  thumbsSwiper.value = swiper
}

const images = [
  '/images/printer-1.png',
  '/images/printer-1.png',
  '/images/printer-1.png',
  '/images/printer-1.png',
  '/images/printer-1.png',
  '/images/printer-1.png',
  '/images/printer-1.png',
  '/images/printer-1.png',
  '/images/printer-1.png',
]
</script>

<template>
  <div class="slider-container">
    <!-- Основной слайдер -->
    <Swiper
      :modules="[Navigation, Thumbs]"
      :thumbs="{ swiper: thumbsSwiper }"
      :navigation="true"
      class="main-swiper"
    >
      <SwiperSlide v-for="(img, idx) in images" :key="idx">
        <img :src="img" alt="Slide image" />
      </SwiperSlide>
    </Swiper>

    <!-- Слайдер миниатюр -->
    <div class="thumbs-wrapper">
      <div class="swiper-button-prev thumb-prev">
        <Icon name="ds:icon-slider-arrow" size="8px" />
      </div>
      <Swiper
        @swiper="setThumbsSwiper"
        :modules="[Navigation, Thumbs]"
        :slides-per-view="5"
        :space-between="10"
        :watch-slides-progress="true"
        :navigation="{
          prevEl: '.thumb-prev',
          nextEl: '.thumb-next',
        }"
        class="thumbs-swiper"
      >
        <SwiperSlide v-for="(img, idx) in images" :key="idx" class="thumb-slide">
          <img :src="img" alt="Thumb" />
        </SwiperSlide>
      </Swiper>
      <div class="swiper-button-next thumb-next">
        <Icon name="ds:icon-slider-arrow" size="8px" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slider-container {
  width: 560px;
  margin: 0 auto;

  .main-swiper {
    width: 100%;
    height: 100%;
    min-height: 500px;
    border-radius: 8px;
    margin-bottom: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .thumbs-wrapper {
    position: relative;

    .thumbs-swiper {
      width: 100%;
      
      .thumb-slide {
        width: 100px;
        height: 100px;
        padding: 10px;
        background-color: #FFF8E6;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.3s, border-color 0.3s;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        border-radius: 16px;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        &.swiper-slide-thumb-active {
          opacity: 1;
          border-color: $secondaryColor;
        }
      }
    }
    
    :deep(.swiper-button-disabled) {
      display: none;
    }

    .thumb-prev, .thumb-next {
      width: 30px;
      height: 30px;
      margin-top: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: $greyColor;
      border-radius: 30px;

      &::after {
        font-size: 18px;
        font-weight: bold;
      }

      &.swiper-button-disabled {
        display: none;
      }
    }

    .thumb-prev { left: 10px; }
    .thumb-next { right: 10px; }
  }
}
</style>
