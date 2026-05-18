<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Thumbs, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const thumbsSwiper = ref<SwiperType | null>(null);
const setThumbsSwiper = (swiper: SwiperType) => {
  thumbsSwiper.value = swiper;
};

const images = [
  "/images/printer-1.png",
  "https://dsquare.storage.yandexcloud.net/4137/4137/4137_premium_43r_g3.webp?v1776337499",
  "/images/printer-1.png",
  "/images/printer-1.png",
  "/images/printer-1.png",
  "/images/printer-1.png",
  "/images/printer-1.png",
  "/images/printer-1.png",
  "/images/printer-1.png",
  "/images/printer-1.png",
];
</script>

<template>
  <div class="slider-container">
    <!-- Основной слайдер -->
    <Swiper
      :modules="[Thumbs, Pagination]"
      :thumbs="{ swiper: thumbsSwiper }"
      :navigation="true"
      :loop="true"
      :breakpoints="{
        320: {
          pagination: {
            el: '.swiper-pagination',
            enabled: true,
          },
        },
        1024: {
          pagination: { enabled: false },
        },
      }"
      class="main-swiper"
    >
      <SwiperSlide v-for="(img, idx) in images" :key="idx">
        <img :src="img" alt="Slide image" />
      </SwiperSlide>
      <div class="swiper-pagination"></div>
    </Swiper>

    <!-- Слайдер миниатюр -->
    <div class="thumbs-wrapper">
      <div class="swiper-button-prev thumb-prev"></div>
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
        <SwiperSlide
          v-for="(img, idx) in images"
          :key="idx"
          class="thumb-slide"
        >
          <img :src="img" alt="Thumb" />
        </SwiperSlide>
      </Swiper>
      <div class="swiper-button-next thumb-next"></div>
    </div>

    <!-- Иконки на моб -->
    <div class="product-slider__icons">
      <div class="product-slider__back">
        <UiButton iconOnly icon="ds:icon-back" class="ui-button--back" />
      </div>
      <div class="product-slider__actions">
        <UiButton iconOnly icon="ds:icon-search1" />
        <UiButton iconOnly icon="ds:icon-rotate" />
        <UiButton iconOnly icon="ds:icon-favorite" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.swiper-slide {
  height: auto;
}
.slider-container {
  width: 100%;
  
  margin: 0 auto;
  height: 100%;
  position: relative;
  @include respond-to("lg") {
    max-width: 400px;
  }
  @include respond-to("xl") {
    max-width: 460px;
  }
  @include respond-to("2xl") {
    max-width: 560px;
  }

  .main-swiper {
    width: 100%;
    height: 100%;
    min-height: 500px;
    border-radius: 6px;
    background-color: #fff0c7;
    padding: 0;
    @include respond-to("lg") {
      border-radius: 16px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .thumbs-wrapper {
    position: absolute;
    width: calc(100% - 20px);
    left: 10px;
    bottom: 10px;
    display: none;
    @include respond-to("lg") {
      display: block;
    }

    .thumbs-swiper {
      width: 100%;

      .thumb-slide {
        aspect-ratio: 1;
        padding: 10px;
        background-color: #fff8e6;
        cursor: pointer;
        opacity: 0.6;
        transition:
          opacity 0.3s,
          border-color 0.3s;
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

    .thumb-prev,
    .thumb-next {
      width: 30px;
      height: 30px;
      margin-top: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: $greyColor;
      border-radius: 30px;
      color: $blackColor;
      padding: 10px;

      &::after {
        font-size: 18px;
        font-weight: bold;
      }

      &.swiper-button-disabled {
        display: none;
      }
    }

    .thumb-prev {
      left: 10px;
    }
    .thumb-next {
      right: 10px;
    }
  }
}
.product-slider {
  &__icons {
    position: absolute;
    left: 10px;
    right: 10px;
    top: 10px;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    @include respond-to("lg") {
      display: none;
    }
    .ui-button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #fff4db;
      padding: 0;
      .iconify {
        width: 20px;
        height: 20px;
      }
      &--back {
        font-size: 10px;
        .iconify {
          width: 8px !important;
          height: 8px !important;
        }
      }
    }
  }
  &__actions {
    display: flex;
    gap: 6px;
  }
}
</style>
