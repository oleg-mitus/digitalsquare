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
const mainTabs = [
  { id: "description", label: "Описание" },
  { id: "specs", label: "Характеристики" },
  { id: "delivery", label: "Доставка и оплата" },
];

const specs = [
  { title: "Вид", value: "Новый, совместный" },
  { title: "Цвет", value: "Черный" },
  { title: "Емкость", value: "Стандартная" },
  { title: "Совместимость", value: "HP LJ Pro M304, LJ Pro M404" },
  { title: "Габариты (ВШГ), мм", value: "196х145х360" },
  { title: "Вес, гр", value: "1500" },
  { title: "Ресурс", value: "8000 страниц при 5% заполнении листа А4" },
  { title: "Чип", value: "С чипом" },
  { title: "Назначение", value: "Для лазерного принтера" },
  { title: "Тип", value: "Картридж" },
  { title: "Производство", value: "Китай" },
  { title: "Гарантия", value: "1 год" },
];

const activeReviewTab = ref<"reviews" | "faq">("reviews");

const { data: product } = await useAsyncData("product", () => {
  return Promise.resolve({
    name: "Картридж СF259XL для HP LJ Pro M304, LJ Pro M404",
    price: 2100,
    oldPrice: 3000,
    discount: "3%",
    images: Array.from({ length: 5 }, (_, i) => `/images/product-variant.jpg`),
    variants: Array.from(
      { length: 6 },
      (_, i) => `/images/product-variant.jpg`,
    ),
    packs: ["1", "2", "4", "8", "16", "32"],
    volumes: ["1600", "2000", "4000", "4000", "4000", "4000", "4000"],
    specs: [
      { label: "Вид", value: "IPS матрица" },
      { label: "Цвет", value: "Черный матовый" },
      { label: "Емкость", value: "10 бит" },
      { label: "Совместимость", value: "macOS, Windows, Linux" },
    ],
    reviewsPhotos: Array.from(
      { length: 8 },
      (_, i) => `/images/product-variant.jpg`,
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
            <div class="product-slider">
              <ProductSlider />
              <div class="product-slider__price">
                <div class="product-price">
                  <div class="product-price__row">
                    <div class="product-price__value">2010 ₽</div>
                    <div class="product-price__old">2010 ₽</div>
                    <div class="product-price__discount">3%</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="product-section">
              <h1 class="product-title only-desktop">{{ product.name }}</h1>

              <!-- Блок с количеством отзывов и вопросов -->
              <div class="product-nums only-desktop">
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
              <div class="product-about only-desktop">
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
          <ProductTabs v-model="activeMainTab" :items="mainTabs">
            <template #description>
              <div class="product-description">
                <p>
                  Картридж W1120A для принтеров HP - это совместимый картридж,
                  который обеспечивает надежную и качественную печать. С
                  емкостью стандартная, 120A идеально подходит для лазерного
                  принтера ХП. Картридж W1120A совместим с такими моделями, как
                  HP Laser 150a, Laser 178nw, Laser 179fnw. Картридж W1120A не
                  требуется чип, что обеспечивает удобство в установке и
                  использовании. Картридж для принтеров HP 150, 178, 179 имеет
                  цвет черный, а его ресурс печати составляет 16000 страниц, что
                  позволяет значительно сократить частоту замен и снизить
                  эксплуатационные расходы. Гарантия на 365 дней подтверждает
                  его долговечность и надежность, обеспечивая вам спокойствие и
                  уверенность в качестве продукции.
                </p>
              </div>
            </template>
            <template #specs>
              <div class="product-specs">
                <div
                  class="product-specs__row"
                  v-for="spec in specs"
                  :key="spec.title"
                >
                  <div class="product-specs__title">{{ spec.title }}</div>
                  <div class="product-specs__value">{{ spec.value }}</div>
                </div>
              </div>
            </template>
            <template #delivery>
              <div class="product-delivery">
                <p>
                  Картридж W1120A для принтеров HP - это совместимый картридж,
                  который обеспечивает надежную и качественную печать. С
                  емкостью стандартная, 120A идеально подходит для лазерного
                  принтера ХП. Картридж W1120A совместим с такими моделями, как
                  HP Laser 150a, Laser 178nw, Laser 179fnw. Картридж W1120A не
                  требуется чип, что обеспечивает удобство в установке и
                  использовании. Картридж для принтеров HP 150, 178, 179 имеет
                  цвет черный, а его ресурс печати составляет 16000 страниц, что
                  позволяет значительно сократить частоту замен и снизить
                  эксплуатационные расходы. Гарантия на 365 дней подтверждает
                  его долговечность и надежность, обеспечивая вам спокойствие и
                  уверенность в качестве продукции.
                </p>
              </div>
            </template>
          </ProductTabs>
        </main>

        <aside class="product-sidebar">
          <div class="product-actions">
            <div class="product-price">
              <div class="product-price__row">
                <div class="product-price__value">2010 ₽</div>
                <div class="product-price__old">2010 ₽</div>
                <div class="product-price__discount">3%</div>
              </div>
              <div class="product-price__desc">540₽ за 3 шт</div>
            </div>
            <div class="product-buttons">
              <div class="product-cart">
                <div class="product-button"></div>
                <div class="product-quantity"></div>
                <div class="product-favorite"></div>
              </div>
            </div>
          </div>
          <div class="product-click">
            <UiButton variant="yellow" block>Купить в 1 клик</UiButton>
          </div>
          <div class="product-delivery"></div>
        </aside>

        <div class="product-m-actions">
          <div class="product-m-actions__row">
            <div class="product-m-actions__button">
              <UiButton block>
                В корзину
                <template #desc>Доставим завтра</template>
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="catalog-products">
      <div class="container">
        <div class="catalog-products__top">
          <div class="catalog-products__title">
            <h3>Подобрали для вас</h3>
          </div>
          <div class="catalog-products__more">
            <NuxtLink to="/catalog">Смотреть все</NuxtLink>
          </div>
        </div>
        <div class="catalog__grid">
          <CatalogProduct v-for="i in 8" :key="i" />
        </div>
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
  .only-desktop {
    display: none;
    @include respond-to("lg") {
      display: flex;
    }
  }
}

.product-m-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  padding-bottom: calc(60px + env(safe-area-inset-bottom));
  width: 100%;
  background-color: $secondaryColor;
  border-radius: 20px 20px 0 0;
  @include respond-to("lg") {
    display: none;
  }
  &__row {
    display: flex;
    gap: 10px;
    padding: 10px;
  }
  &__button {
    flex: 1;
  }
}

.product-layout {
  display: flex;
  gap: 16px;
  align-items: stretch;
  flex-direction: column;
  @include respond-to("lg") {
    flex-direction: row;
  }
}

.product-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 10px;
  @include respond-to("lg") {
    padding-top: 0;
  }
}

.product-breadcrumbs {
  margin: 30px 0;
  display: none;
  @include respond-to("lg") {
    display: block;
  }
}

.product-container {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  width: 100%;
}

.product-title {
  font-size: 24px;
  margin: 0;
  line-height: 130%;
}

.product-slider,
.product-section {
  flex: 1;
  width: 100%;
}

.product-slider {
  border-radius: 6px;
  background-color: #fff;
  @include respond-to("lg") {
    border-radius: 0;
    background-color: transparent;
  }
  &__price {
    display: flex;
    padding: 10px;
    @include respond-to("lg") {
      display: none;
    }
  }
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
  @media screen and (max-width: 1024px) {
    margin: 0 -10px;
    padding: 10px 0;
    background: #fff;
    border-radius: 6px;
  }
  &__list {
    display: flex;
    gap: 6px;
    @media (max-width: 1024px) {
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-padding-left: 10px;
      gap: 4px;
      padding: 0 10px;

      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    @include respond-to("lg") {
      margin-top: 30px;
    }
  }
  &__item {
    padding: 4px;
    border-radius: 6px;
    border: 1px solid transparent;
    cursor: pointer;
    @media (max-width: 1024px) {
      min-width: 80px;
    }
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
    padding: 0 10px;
    @include respond-to("lg") {
      padding: 0;
    }
  }
}

// Блок с выбором количества в упаковке
.product-package {
  margin-top: 30px;
  @media screen and (max-width: 1024px) {
    margin: 0 -10px;
    padding: 10px 0;
    background: #fff;
    border-radius: 6px;
    margin-top: 15px;
  }

  &__title {
    font-size: 18px;
    font-weight: 500;
    padding: 0 10px;
    @include respond-to("lg") {
      padding: 0;
      font-size: 20px;
    }
  }
  &__list {
    display: flex;
    gap: 6px;
    margin-top: 16px;
    @media (max-width: 1024px) {
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-padding-left: 10px;
      gap: 4px;
      padding: 0 10px;
      margin-top: 12px;

      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
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
    min-width: 90px;
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
      text-wrap: nowrap;
    }
  }
}

//Блок с выбором объема
.product-volume {
  margin-top: 30px;
  @media screen and (max-width: 1024px) {
    margin: 0 -10px;
    padding: 10px 0;
    background: #fff;
    border-radius: 6px;
    margin-top: 15px;
  }

  &__title {
    font-size: 18px;
    font-weight: 500;
    padding: 0 10px;
    @include respond-to("lg") {
      padding: 0;
      font-size: 20px;
    }
  }
  &__list {
    display: flex;
    gap: 6px;
    margin-top: 16px;
    @media (max-width: 1024px) {
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-padding-left: 10px;
      gap: 4px;
      padding: 0 10px;
      margin-top: 12px;

      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
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

.product-specs {
  padding: 0 10px;
  @include respond-to("lg") {
    padding: 0;
  }
  &__row {
    display: flex;
    gap: 20px;
    padding: 6px 0;
    @include respond-to("lg") {
      min-height: 40px;
      align-items: center;
    }
  }
  &__title {
    flex: 0 0 50%;
    color: rgba($primaryColor, 0.6);
    @include respond-to("lg") {
      flex: 0 0 360px;
    }
  }
  &__value {
  }
}

.product-description,
.product-delivery {
  padding: 0 10px;
  line-height: 1.5;
  @include respond-to("lg") {
    padding: 0;
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
  display: none;
  gap: 10px;
  flex-direction: column;
  @include respond-to("lg") {
    display: flex;
  }
}

// Блок с ценой и кнопками
.product-actions {
  background-color: $whiteColor;
  border-radius: 16px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.product-price {
  display: flex;
  flex-direction: column;
  gap: 7px;
  &__row {
    display: flex;
    gap: 6px;
    align-items: baseline;
  }
  &__value {
    font-size: 20px;
    font-weight: 600;
    line-height: 130%;
    @include respond-to("lg") {
      font-size: 30px;
    }
  }
  &__old {
    font-size: 14px;
    text-decoration: line-through;
    font-weight: 500;
    line-height: 130%;
    @include respond-to("lg") {
      font-size: 20px;
    }
  }
  &__discount {
    margin-left: 4px;
    color: $greenText;
    font-size: 14px;
    font-weight: 500;
    line-height: 130%;
    @include respond-to("lg") {
      font-size: 20px;
    }
  }
  &__desc {
    font-size: 20px;
    color: rgba($primaryColor, 0.5);
  }
}
</style>
