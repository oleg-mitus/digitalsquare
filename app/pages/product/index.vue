<script setup lang="ts">
// В Nuxt 4 все импорты из vue и nuxt автоимпортируются
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';

const containerRef = ref(null)

const swiper = useSwiper(containerRef)

const thumbsSwiper = ref<SwiperType | null>(null);
const setThumbsSwiper = (swiper: SwiperType) => {
  thumbsSwiper.value = swiper;
};

const selectedVariant = ref(0);
const selectedPack = ref(0);
const selectedVolume = ref(0);
const quantity = ref(1);
const isGalleryOpen = ref(false);

const activeMainTab = ref<'description' | 'specs' | 'delivery'>('description');
const activeReviewTab = ref<'reviews' | 'faq'>('reviews');

const { data: product } = await useAsyncData('product', () => {
  return Promise.resolve({
    name: "Профессиональный монитор UltraVision 32\"",
    price: 89000,
    oldPrice: 105000,
    images: Array.from({ length: 5 }, (_, i) => `https://picsum.photos/id/${i + 20}/800/800`),
    variants: Array.from({ length: 3 }, (_, i) => `https://picsum.photos/id/{i + 30}/100/100`),
    packs: ['1 шт', '2 шт', '4 шт'],
    volumes: ['24"', '27"', '32"'],
    specs: [
      { label: 'Вид', value: 'IPS матрица' },
      { label: 'Цвет', value: 'Черный матовый' },
      { label: 'Емкость', value: '10 бит' },
      { label: 'Совместимость', value: 'macOS, Windows, Linux' },
    ],
    reviewsPhotos: Array.from({ length: 8 }, (_, i) => `https://picsum.photos{i + 40}/400/400`)
  });
});
</script>

<template>
  <div class="product-page" v-if="product">
    <div class="app-container">
      <div class="product-layout">
        <main class="product-main">
          <div class="gallery-section">
  
            <div class="thumbs-container">
              <ClientOnly>
                <swiper-container ref="containerRef"
                  @swiper="setThumbsSwiper"
                  :direction="'vertical'"
                  :space-between="10"
                  :slides-per-view="4"
                  :modules="[FreeMode, Navigation, Thumbs]"
                  class="thumbs-slider"
                >
                  <swiper-slide v-for="(img, idx) in product.images" :key="idx">
                    <div class="thumb-card"><img :src="img" /></div>
                  </swiper-slide>
                </swiper-container>
              </ClientOnly>
            </div>

            
            <div class="main-slider-container">
              <ClientOnly>
                <Swiper
                  :navigation="true"
                  :thumbs="{ swiper: thumbsSwiper }"
                  :modules="[Navigation, Thumbs]"
                  class="main-slider"
                >
                  <SwiperSlide v-for="(img, idx) in product.images" :key="idx">
                    <img :src="img" class="main-img" />
                  </SwiperSlide>
                </Swiper>
              </ClientOnly>
            </div>
          </div>

          <h1 class="title">{{ product.name }}</h1>

          
          <div class="option-group">
            <p class="label">Выберите вариант:</p>
            <div class="variant-list">
              <button 
                v-for="(v, i) in product.variants" :key="i"
                :class="['variant-btn', { active: selectedVariant === i }]"
                @click="selectedVariant = i"
              >
                <img :src="v" />
              </button>
            </div>
          </div>

          
          <div class="option-group">
            <p class="label">Количество в упаковке:</p>
            <div class="grid-boxes">
              <div 
                v-for="(p, i) in product.packs" :key="i"
                :class="['pack-box', { active: selectedPack === i }]"
                @click="selectedPack = i"
              >
                {{ p }}
              </div>
            </div>
          </div>

          
          <div class="option-group">
            <p class="label">Объем / Размер:</p>
            <div class="grid-boxes">
              <div 
                v-for="(v, i) in product.volumes" :key="i"
                :class="['pack-box', { active: selectedVolume === i }]"
                @click="selectedVolume = i"
              >
                {{ v }}
              </div>
            </div>
          </div>

          
          <ul class="specs-list">
            <li v-for="spec in product.specs" :key="spec.label">
              <span class="spec-name">{{ spec.label }}</span>
              <span class="spec-value">{{ spec.value }}</span>
            </li>
          </ul>

          
          <div class="reviews-preview">
            <p class="label">Фотографии покупателей:</p>
            <div class="stack-container" @click="isGalleryOpen = true">
              <div 
                v-for="(img, i) in product.reviewsPhotos.slice(0, 4)" 
                :key="i"
                class="stack-item"
                :style="{ transform: `translateX(${i * 45}px)` }"
              >
                <img :src="img" />
                <div v-if="i === 3" class="stack-more">
                  +{{ product.reviewsPhotos.length - 4 }}
                </div>
              </div>
            </div>
          </div>
        </main>

        
        <aside class="product-sidebar">
          <div class="sticky-panel">
            <div class="price-wrapper">
              <div class="prices">
                <span class="price-now">{{ product.price.toLocaleString() }} ₽</span>
                <span class="price-old">{{ product.oldPrice.toLocaleString() }} ₽</span>
              </div>
              <div class="discount-tag">Скидка 20%</div>
            </div>

            <div class="counter-box">
              <button @click="quantity > 1 && quantity--">−</button>
              <input type="number" v-model="quantity" />
              <button @click="quantity++">+</button>
            </div>

            <button class="buy-btn">Добавить в корзину</button>
          </div>
        </aside>
      </div>

      
      <div class="tabs-section">
        <nav class="tab-header">
          <button @click="activeMainTab = 'description'" :class="{ active: activeMainTab === 'description' }">Описание</button>
          <button @click="activeMainTab = 'specs'" :class="{ active: activeMainTab === 'specs' }">Характеристики</button>
          <button @click="activeMainTab = 'delivery'" :class="{ active: activeMainTab === 'delivery' }">Доставка</button>
        </nav>
        <div class="tab-body card">
          <p v-if="activeMainTab === 'description'">Здесь находится подробное описание товара в Nuxt 4...</p>
        </div>

        <nav class="tab-header mt-8">
          <button @click="activeReviewTab = 'reviews'" :class="{ active: activeReviewTab === 'reviews' }">Отзывы</button>
          <button @click="activeReviewTab = 'faq'" :class="{ active: activeReviewTab === 'faq' }">Вопрос-ответ</button>
        </nav>
        <div class="tab-body card">
          <div v-if="activeReviewTab === 'reviews'">Список отзывов...</div>
        </div>
      </div>
    </div>

    
    <Teleport to="body">
      <div v-if="isGalleryOpen" class="gallery-modal" @click.self="isGalleryOpen = false">
        <div class="modal-inner">
          <ClientOnly>
            <Swiper :navigation="true" :modules="[Navigation]" class="full-viewer">
              <SwiperSlide v-for="(img, i) in product.reviewsPhotos" :key="i">
                <img :src="img" />
              </SwiperSlide>
            </Swiper>
          </ClientOnly>
          <button class="close-modal" @click="isGalleryOpen = false">✕</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.product-page {
  padding: 40px 0;
  background: #fcfcfc;
}

.app-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px;
}

.product-layout {
  display: flex;
  gap: 50px;
  align-items: flex-start;
}

.product-main {
  flex: 1;
}

// Галлерея
.gallery-section {
  display: flex;
  gap: 20px;
  height: 540px;
  margin-bottom: 40px;

  .thumbs-container {
    width: 100px;
    height: 100%;
  }

  .main-slider-container {
    flex: 1;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
  }
}

.thumbs-slider {
  height: 100%;
  .thumb-card {
    height: 100px;
    border: 2px solid #eee;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    img { width: 100%; height: 100%; object-fit: cover; }
  }
  .swiper-slide-thumb-active .thumb-card {
    border-color: #000;
  }
}

.main-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

// Опции
.option-group {
  margin-bottom: 30px;
  .label { font-weight: 600; margin-bottom: 12px; font-size: 16px; }
}

.variant-list {
  display: flex;
  gap: 10px;
  .variant-btn {
    width: 65px; height: 65px;
    border-radius: 8px;
    border: 2px solid #eee;
    padding: 0; overflow: hidden;
    cursor: pointer;
    &.active { border-color: #007bff; }
    img { width: 100%; height: 100%; object-fit: cover; }
  }
}

.grid-boxes {
  display: flex;
  gap: 15px;
  .pack-box {
    width: 90px;
    height: 80px;
    border: 2px solid #eee;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #fff;
    font-weight: 500;
    transition: all 0.2s;
    &:hover { border-color: #ccc; }
    &.active { border-color: #007bff; color: #007bff; background: #f0f7ff; }
  }
}

// Характеристики
.specs-list {
  list-style: none;
  padding: 0;
  margin: 40px 0;
  li {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    .spec-name { color: #777; }
    .spec-value { font-weight: 500; }
  }
}

// Фото покупателей
.stack-container {
  position: relative;
  height: 100px;
  margin-top: 20px;
  cursor: pointer;
  .stack-item {
    position: absolute;
    width: 90px; height: 90px;
    border-radius: 15px;
    border: 4px solid #fff;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    img { width: 100%; height: 100%; object-fit: cover; }
  }
  .stack-more {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0.6);
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-weight: bold; font-size: 18px;
  }
}

// Сайдбар
.product-sidebar {
  width: 365px;
  .sticky-panel {
    position: sticky;
    top: 100px;
    background: #fff;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }
}

.price-wrapper {
  margin-bottom: 25px;
  .price-now { font-size: 36px; font-weight: 800; display: block; }
  .price-old { color: #999; text-decoration: line-through; font-size: 18px; }
  .discount-tag { margin-top: 8px; color: #ff4757; font-weight: 600; }
}

.counter-box {
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 12px;
  width: fit-content;
  margin-bottom: 20px;
  button { 
    width: 45px; height: 45px; border: none; background: none; cursor: pointer; font-size: 20px; 
    &:hover { color: #007bff; }
  }
  input { 
    width: 60px; border: none; text-align: center; font-size: 16px; font-weight: 600;
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button { -webkit-appearance: none; }
  }
}

.buy-btn {
  width: 100%;
  background: #007bff;
  color: #fff;
  border: none;
  padding: 18px;
  border-radius: 14px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;
  &:active { transform: scale(0.98); }
}

// Табы
.tabs-section {
  margin-top: 60px;
  .tab-header {
    display: flex;
    gap: 40px;
    border-bottom: 1px solid #eee;
    button {
      padding: 15px 5px;
      background: none; border: none; cursor: pointer;
      font-size: 18px; color: #888;
      border-bottom: 3px solid transparent;
      &.active { color: #000; border-color: #007bff; font-weight: 600; }
    }
  }
  .tab-body { padding: 30px 0; min-height: 100px; }
}

// Модалка
.gallery-modal {
  position: fixed; inset: 0; background: rgba(0,0,0,0.95);
  z-index: 9999; display: flex; align-items: center; justify-content: center;
  .modal-inner {
    width: 90%; max-width: 1000px; position: relative;
    .close-modal { position: absolute; top: -50px; right: 0; color: #fff; font-size: 30px; background: none; border: none; cursor: pointer; }
  }
}
</style>
