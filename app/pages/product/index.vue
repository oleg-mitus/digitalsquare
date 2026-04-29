<script setup lang="ts">
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";

const containerRef = ref(null);

const swiper = useSwiper(containerRef);

const thumbsSwiper = ref<SwiperType | null>(null);
const setThumbsSwiper = (swiper: SwiperType) => {
  thumbsSwiper.value = swiper;
};

const selectedVariant = ref(0);
const selectedPack = ref(0);
const selectedVolume = ref(0);
const quantity = ref(1);
const isGalleryOpen = ref(false);

const activeMainTab = ref<"description" | "specs" | "delivery">("description");
const activeReviewTab = ref<"reviews" | "faq">("reviews");

const { data: product } = await useAsyncData("product", () => {
  return Promise.resolve({
    name: "Картридж СF259XL для HP LJ Pro M304, LJ Pro M404",
    price: 2100,
    oldPrice: 3000,
    discount: "3%",
    images: Array.from(
      { length: 5 },
      (_, i) => `https://picsum.photos/id/${i + 20}/800/800`,
    ),
    variants: Array.from(
      { length: 3 },
      (_, i) => `https://picsum.photos/id/{i + 30}/100/100`,
    ),
    packs: ["1", "2", "4"],
    volumes: ["1600", "2000", "4000"],
    specs: [
      { label: "Вид", value: "IPS матрица" },
      { label: "Цвет", value: "Черный матовый" },
      { label: "Емкость", value: "10 бит" },
      { label: "Совместимость", value: "macOS, Windows, Linux" },
    ],
    reviewsPhotos: Array.from(
      { length: 8 },
      (_, i) => `https://picsum.photos{i + 40}/400/400`,
    ),
  });
});
</script>

<template>
  <div class="product-page" v-if="product">
    <div class="container">
      <div class="product-breadcrumbs">
        <Breadcrumbs
          :items="[
            { text: 'Главная', to: '/' },
            { text: 'Каталог', to: '/catalog/' },
            {
              text: 'Картриджи',
            },
          ]"
        />
      </div>
      <div class="product-container">
        <main class="product-main">
          <div class="product-layout">
            <div class="gallery-section">
              <div class="thumbs-container">
                <ClientOnly>
                  <swiper-container
                    ref="containerRef"
                    @swiper="setThumbsSwiper"
                    :direction="'vertical'"
                    :space-between="10"
                    :slides-per-view="4"
                    :modules="[FreeMode, Navigation, Thumbs]"
                    class="thumbs-slider"
                  >
                    <swiper-slide
                      v-for="(img, idx) in product.images"
                      :key="idx"
                    >
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
                    <SwiperSlide
                      v-for="(img, idx) in product.images"
                      :key="idx"
                    >
                      <img :src="img" class="main-img" />
                    </SwiperSlide>
                  </Swiper>
                </ClientOnly>
              </div>
            </div>
            <div class="product-section">
              <h1 class="product-title">{{ product.name }}</h1>

              <!-- Блок с количеством отзывов и вопросов -->
              <div class="product-nums">
                <div class="product-nums__item product-nums__item--rating">
                  <div class="product-nums__item-icon">
                    <Icon name="ds:icon-star" />
                    <span>5</span>
                  </div>
                  <span class="product-nums__sep"></span>
                  <div>205 отзывов</div>
                </div>
                <div class="product-nums__item product-nums__item--questions">
                  <div class="product-nums__item-icon">
                    <Icon name="ds:icon-comment" />
                    <span>4</span>
                  </div>
                  <div>вопроса</div>
                </div>
              </div>

              <!-- Блок с выбором вариантов товара -->
              <div class="product-variants">
                <div class="product-variants__list">
                  <div
                    v-for="(v, i) in product.variants"
                    :key="i"
                    :class="[
                      'product-variants__item',
                      { active: selectedVariant === i },
                    ]"
                    @click="selectedVariant = i"
                  >
                    <div class="product-variants__item-image">
                      <NuxtImg src="/images/product-variant.jpg" />
                    </div>
                  </div>
                </div>
                <div class="product-variants__title">
                  Голубой (cyan) 2000 мл
                </div>
              </div>

              <!-- Блок с выбором количества в упаковке -->
              <div class="product-package">
                <div class="product-package__title">
                  Количество в упаковке, шт
                </div>
                <div class="product-package__list">
                  <div
                    v-for="(p, i) in product.packs"
                    :key="i"
                    :class="[
                      'product-package__item',
                      { active: selectedPack === i },
                    ]"
                    @click="selectedPack = i"
                  >
                    <div class="product-package__item-title">{{ p }}</div>
                    <div class="product-package__item-desc">551₽ за шт</div>
                  </div>
                </div>
              </div>

              <!-- Блок с выбором объема -->
              <div class="product-volume">
                <div class="product-volume__title">Объем, мл</div>
                <div class="product-volume__list">
                  <div
                    v-for="(v, i) in product.volumes"
                    :key="i"
                    :class="[
                      'product-volume__item',
                      { active: selectedVolume === i },
                    ]"
                    @click="selectedVolume = i"
                  >
                    {{ v }}
                  </div>
                </div>
              </div>

              <!-- Блок о товаре -->
              <div class="product-about">
                <div class="product-about__top">
                  <div class="product-about__title">О товаре</div>
                  <div class="product-about__more">
                    <button>
                      Перейти к описанию
                      <span>
                        <Icon name="ds:icon-arrow" size="8px" />
                      </span>
                    </button>
                  </div>
                </div>
                <div class="product-about__content">
                  <ul class="product-about__list">
                    <li v-for="spec in product.specs" :key="spec.label">
                      <span class="product-about__list-title">{{
                        spec.label
                      }}</span>
                      <span class="product-about__list-desc">{{
                        spec.value
                      }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Блок фото и видео от покупателей -->
              <div class="product-reviews">
                <div class="product-reviews__title">
                  Фото и видео покупателей:
                </div>
                <div
                  class="product-reviews__container"
                  @click="isGalleryOpen = true"
                >
                  <div
                    v-for="(img, i) in product.reviewsPhotos.slice(0, 4)"
                    :key="i"
                    class="product-reviews__item"
                    :style="{ transform: `translateX(${i * 45}px)` }"
                  >
                    <NuxtImg src="/images/product-variant.jpg" />
                    <div v-if="i === 3" class="product-reviews__more">
                      +{{ product.reviewsPhotos.length - 4 }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Блок с характеристиками и описанием -->
          <div class="tabs-section">
            <nav class="tab-header">
              <button
                @click="activeMainTab = 'description'"
                :class="{ active: activeMainTab === 'description' }"
              >
                Описание
              </button>
              <button
                @click="activeMainTab = 'specs'"
                :class="{ active: activeMainTab === 'specs' }"
              >
                Характеристики
              </button>
              <button
                @click="activeMainTab = 'delivery'"
                :class="{ active: activeMainTab === 'delivery' }"
              >
                Доставка
              </button>
            </nav>
            <div class="tab-body card">
              <p v-if="activeMainTab === 'description'">
                Здесь находится подробное описание товара в Nuxt 4...
              </p>
            </div>

            <nav class="tab-header mt-8">
              <button
                @click="activeReviewTab = 'reviews'"
                :class="{ active: activeReviewTab === 'reviews' }"
              >
                Отзывы
              </button>
              <button
                @click="activeReviewTab = 'faq'"
                :class="{ active: activeReviewTab === 'faq' }"
              >
                Вопрос-ответ
              </button>
            </nav>
            <div class="tab-body card">
              <div v-if="activeReviewTab === 'reviews'">Список отзывов...</div>
            </div>
          </div>
        </main>

        <aside class="product-sidebar">
          <div class="product-actions">
            <div class="price-wrapper">
              <div class="prices">
                <span class="price-now"
                  >{{ product.price.toLocaleString() }} ₽</span
                >
                <span class="price-old"
                  >{{ product.oldPrice.toLocaleString() }} ₽</span
                >
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
          <div class="product-buy"></div>
          <div class="product-delivery"></div>
        </aside>
      </div>
    </div>
    <Teleport to="body">
      <div
        v-if="isGalleryOpen"
        class="gallery-modal"
        @click.self="isGalleryOpen = false"
      >
        <div class="modal-inner">
          <ClientOnly>
            <Swiper
              :navigation="true"
              :modules="[Navigation]"
              class="full-viewer"
            >
              <SwiperSlide v-for="(img, i) in product.reviewsPhotos" :key="i">
                <NuxtImg src="/images/product.jpg" />
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
}

.product-layout {
  display: flex;
  gap: 50px;
  align-items: flex-start;
}

.product-main {
  flex: 1;
}

.product-breadcrumbs {
  margin: 30px 0;
}

.product-container {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.product-title {
  font-size: 24px;
  margin: 0;
  line-height: 130%;
}

// Блок с количеством отзывов и вопросов
.product-nums {
  display: flex;
  gap: 18px;
  margin-top: 20px;
  &__item {
    display: flex;
    gap: 10px;
    align-items: center;
    &--questions {
      gap: 12px;
    }
    &-icon {
      display: flex;
      gap: 6px;
      align-items: center;
      line-height: 100%;
    }
  }
  &__sep {
    display: flex;
    width: 4px;
    height: 4px;
    background-color: $primaryColor;
    border-radius: 50%;
  }
}

// Блок с выбором вариантов товара
.product-variants {
  &__list {
    display: flex;
    gap: 6px;
    margin-top: 30px;
  }
  &__item {
    padding: 4px;
    border-radius: 6px;
    border: 1px solid transparent;
    cursor: pointer;
    &.active {
      border: 1px solid $secondaryColor;
    }
    &-image {
      border-radius: 2px;
      overflow: hidden;
    }
    img {
      display: block;
      width: 70px;
      height: auto;
    }
  }
  &__title {
    font-size: 14px;
    font-weight: 500;
    margin-top: 10px;
  }
}

// Блок с выбором количества в упаковке
.product-package {
  margin-top: 30px;
  &__title {
    font-size: 20px;
    font-weight: 500;
  }
  &__list {
    display: flex;
    gap: 6px;
    margin-top: 16px;
  }
  &__item {
    cursor: pointer;
    padding: 10px;
    border-radius: 6px;
    border: 1px dashed rgba($primaryColor, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80px;
    gap: 4px;
    &.active {
      border: 1px solid $secondaryColor;
    }
    &-title {
      font-size: 18px;
      font-weight: 500;
      text-align: center;
    }
    &-desc {
      font-size: 14px;
      color: rgba($primaryColor, 0.5);
    }
  }
}

//Блок с выбором объема
.product-volume {
  margin-top: 30px;
  &__title {
    font-size: 20px;
    font-weight: 500;
  }
  &__list {
    display: flex;
    gap: 6px;
    margin-top: 16px;
  }
  &__item {
    cursor: pointer;
    padding: 8px 20px;
    border-radius: 6px;
    border: 1px dashed rgba($primaryColor, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 80px;
    &.active {
      border: 1px solid $secondaryColor;
    }
    &-title {
      font-size: 18px;
      font-weight: 400;
      text-align: center;
    }
  }
}

// Блок о товаре
.product-about {
  margin-top: 30px;
  &__top {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
  }
  &__title {
    font-size: 20px;
    font-weight: 600;
  }
  &__list {
    list-style: none;
    padding: 0;
    margin: 10px 0 0;
    li {
      display: flex;
      padding: 12px 0;
      min-height: 50px;
      border-bottom: 1px solid $borderColor;
      gap: 6px;
    }
    &-title {
      color: rgba($primaryColor, 0.6);
      flex: 0 0 200px;
    }
    &-value {
    }
  }
}

// Блок фото и видео от покупателей
.product-reviews {
  margin-top: 30px;
  &__title {
    font-size: 20px;
    font-weight: 600;
  }
  &__container {
    position: relative;
    height: 100px;
    margin-top: 12px;
    cursor: pointer;
  }
  &__item {
    position: absolute;
    width: 90px;
    height: 90px;
    border-radius: 15px;
    border: 2px solid #fff;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__more {
    position: absolute;
    inset: 0;
    background: rgba(#ffffff, 0.2);
    backdrop-filter: blur(6px);
    color: $primaryColor;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
}

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
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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
    &:hover {
      border-color: #ccc;
    }
    &.active {
      border-color: #007bff;
      color: #007bff;
      background: #f0f7ff;
    }
  }
}

.price-wrapper {
  margin-bottom: 25px;
  .price-now {
    font-size: 36px;
    font-weight: 800;
    display: block;
  }
  .price-old {
    color: #999;
    text-decoration: line-through;
    font-size: 18px;
  }
  .discount-tag {
    margin-top: 8px;
    color: #ff4757;
    font-weight: 600;
  }
}

.counter-box {
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 12px;
  width: fit-content;
  margin-bottom: 20px;
  button {
    width: 45px;
    height: 45px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 20px;
    &:hover {
      color: #007bff;
    }
  }
  input {
    width: 60px;
    border: none;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
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
  &:active {
    transform: scale(0.98);
  }
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
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      color: #888;
      border-bottom: 3px solid transparent;
      &.active {
        color: #000;
        border-color: #007bff;
        font-weight: 600;
      }
    }
  }
  .tab-body {
    padding: 30px 0;
    min-height: 100px;
  }
}

// Модалка
.gallery-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  .modal-inner {
    width: 90%;
    max-width: 1000px;
    position: relative;
    .close-modal {
      position: absolute;
      top: -50px;
      right: 0;
      color: #fff;
      font-size: 30px;
      background: none;
      border: none;
      cursor: pointer;
    }
  }
}

.product-sidebar {
  width: 365px;
  position: sticky;
  top: 150px;
  bottom: 0;
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.product-actions {
  background-color: $whiteColor;
  border-radius: 16px;
  padding: 10px;
}
</style>
