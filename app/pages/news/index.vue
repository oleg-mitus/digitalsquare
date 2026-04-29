<script setup lang="ts">
const images = [
  'https://picsum.photos/id/1/800/800',
  'https://picsum.photos/id/2/800/800',
  'https://picsum.photos/id/3/800/800',
  'https://picsum.photos/id/4/800/800',
  'https://picsum.photos/id/5/800/800',
  'https://picsum.photos/id/6/800/800',
]

const mainSwiperRef = ref<any>(null)
const thumbsSwiperRef = ref<any>(null)

const onThumbClick = (index: number) => {
  mainSwiperRef.value?.swiper?.slideTo(index)
}

const syncSwipers = () => {
  if (mainSwiperRef.value?.swiper && thumbsSwiperRef.value?.swiper) {
    mainSwiperRef.value.swiper.thumbs.swiper = thumbsSwiperRef.value.swiper
  }
}
</script>

<template>
  <div class="gallery-wrapper">
    <!-- Основной слайдер -->
    <swiper-container 
      ref="mainSwiperRef"
      class="main-swiper"
      space-between="10"
      @swiperafterinit="syncSwipers"
    >
      <swiper-slide v-for="img in images" :key="img">
        <NuxtImg src="/images/product.jpg" />
      </swiper-slide>
    </swiper-container>

    <!-- Слайдер миниатюр -->
    <div class="thumbs-container">
      <swiper-container 
        ref="thumbsSwiperRef"
        class="thumbs-swiper"
        slides-per-view="auto" 
        space-between="10"
        :navigation="true"
        :watch-slides-progress="true"
        :center-insufficient-slides="true"
      >
        <swiper-slide 
          v-for="(img, index) in images" 
          :key="'t'+index"
          class="thumb-slide"
          @click="onThumbClick(index)"
        >
          <div class="thumb-content">
            <NuxtImg src="/images/product-variant.jpg" />
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gallery-wrapper {
  max-width: 800px; // Ширина всей галереи
  margin: 0 auto;

  .main-swiper {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 12px;
    margin-bottom: 10px;
    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .thumbs-container {
    position: relative; // Для позиционирования стрелок, если нужно
    width: 100%;

    .thumbs-swiper {
      width: 100%;
      height: 80px;
      // ВАЖНО: чтобы стрелки были видны, Swiper Elements 
      // добавляет padding внутри Shadow DOM, если включена навигация.
      
      .thumb-slide {
        width: 120px; // ФИКСИРОВАННАЯ ШИРИНА МИНИАТЮРЫ
        cursor: pointer;
      }

      .thumb-content {
        height: 100%;
        border-radius: 6px;
        overflow: hidden;
        opacity: 0.4;
        transition: opacity 0.3s;
        border: 2px solid transparent;
        img { width: 100%; height: 100%; object-fit: cover; }
      }

      // Активная миниатюра
      .swiper-slide-thumb-active .thumb-content {
        opacity: 1;
        border-color: #00dc82;
      }

      /* СТИЛИЗАЦИЯ СТРЕЛОК ЧЕРЕЗ ::PART */
      &::part(button-prev),
      &::part(button-next) {
        color: #fff;
        background: rgba(0, 0, 0, 0.6);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        --swiper-navigation-size: 14px;
        // Если фото не выходят за границы, Swiper сам скроет стрелки 
        // благодаря параметру watch-slides-progress
      }

      &::part(button-prev) { left: 5px; }
      &::part(button-next) { right: 5px; }
    }
  }
}
</style>
