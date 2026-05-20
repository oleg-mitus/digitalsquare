<script setup lang="ts">
import { useUIState } from "~/stores/ui";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";

const { isInCart, addToCart } = useUIState();

const selectedVariant = ref(0);
const selectedPack = ref(0);
const selectedVolume = ref(0);
const quantity = ref(1);
const isGalleryOpen = ref(false);
const cartLoading = ref<boolean>(false);

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
    packs: ["1", "3", "5", "7"],
    volumes: ["1600", "2000", "6000", "8000"],
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

const handleAddToCart = (id: number): void => {
  cartLoading.value = true;
  setTimeout(() => {
    cartLoading.value = false;
    addToCart(id);
  }, 1000);
};
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

              <!-- Блок на мобилке -->
              <div class="product-m_block">
                <div class="product-m_block__title">
                  <h1 class="product-title">{{ product.name }}</h1>
                  <div class="product-m_block__title-more">Еще</div>
                </div>
                <div class="product-m_block__row">
                  <div class="product-nums">
                    <div class="product-nums__item product-nums__item--rating">
                      <div class="product-nums__item-icon">
                        <Icon name="ds:icon-star" />
                        <span>5</span>
                      </div>
                      <span class="product-nums__sep"></span>
                      <div>205 отзывов</div>
                    </div>
                    <div
                      class="product-nums__item product-nums__item--questions"
                    >
                      <div class="product-nums__item-icon">
                        <Icon name="ds:icon-comment" />
                        <span>4</span>
                      </div>
                      <div>вопроса</div>
                    </div>
                  </div>
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
                        :style="{ transform: `translateX(${i * 35}px)` }"
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
              <div class="product-reviews only-desktop">
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
                <div class="product-button">
                  <UiButton
                    block
                    variant="green"
                    radius="lg"
                    size="lg"
                    @click="navigateTo('/catalog')"
                    v-if="isInCart(1)"
                  >
                    В корзине
                    <template #desc>Перейти</template>
                  </UiButton>
                  <UiButton
                    block
                    variant="green"
                    radius="lg"
                    size="lg"
                    @click="handleAddToCart(1)"
                    :loading="cartLoading"
                    v-else
                  >
                    В корзину
                    <template #desc>Доставим завтра</template>
                  </UiButton>
                </div>
                <div class="product-quantity">
                  <UiCounter
                    v-model="quantity"
                    :min="1"
                    :max="10"
                    :step="1"
                    variant="product-desktop"
                  />
                </div>
                <div class="product-favorite">
                  <UiButton
                    block
                    variant="transparent"
                    radius="lg"
                    size="lg"
                    iconOnly
                    icon="ds:icon-favorite"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="product-click">
            <UiButton variant="yellow" block>Купить в 1 клик</UiButton>
          </div>
          <div class="product-return">
            <div class="product-return__title">Доставка и возврат</div>
            <div class="product-return__row">
              <div class="product-return__icon">
                <Icon name="ds:icon-pin" size="30px" />
              </div>
              <div class="product-return__content">
                <div class="product-return__info">
                  <div class="product-return__info-title">
                    пр-кт Карла Маркса, 20/3
                  </div>
                  <div class="product-return__info-desc">С нашего склада</div>
                </div>
                <div class="product-return__more">
                  <Icon name="ds:icon-arrow" size="16px" />
                </div>
              </div>
            </div>
            <div class="product-return__row">
              <div class="product-return__icon"></div>
              <div class="product-return__content">
                <div class="product-return__info">
                  <div class="product-return__info-title">Курьером</div>
                  <div class="product-return__info-desc">
                    Послезавтра, 16 декабря
                  </div>
                </div>
                <div class="product-return__more">+149 ₽</div>
              </div>
            </div>
            <div class="product-return__row">
              <div class="product-return__icon"></div>
              <div class="product-return__content">
                <div class="product-return__info">
                  <div class="product-return__info-title">
                    Пункты выдачи и постаматы
                  </div>
                  <div class="product-return__info-desc">
                    Послезавтра, 16 декабря
                  </div>
                </div>
                <div class="product-return__more">Без доплаты</div>
              </div>
            </div>
            <div class="product-return__row">
              <div class="product-return__icon">
                <div class="product-return__icon-circle">
                  <Icon name="ds:icon-rotate" size="20px" />
                </div>
              </div>
              <div class="product-return__content">
                <div class="product-return__info">
                  <div class="product-return__info-title">
                    Пункты выдачи и постаматы
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div class="product-m-actions">
          <div class="product-m-actions__row">
            <div class="product-m-actions__button">
              <UiButton
                block
                variant="secondary"
                radius="lg"
                size="lg"
                @click="navigateTo('/cart')"
                v-if="isInCart(1)"
              >
                В корзине
                <template #desc>Перейти</template>
              </UiButton>
              <UiButton
                block
                variant="white"
                radius="lg"
                size="lg"
                @click="handleAddToCart(1)"
                :loading="cartLoading"
                v-else
              >
                В корзину
                <template #desc>Доставим завтра</template>
              </UiButton>
            </div>
            <div class="product-m-actions__quantity" v-if="isInCart(1)">
              <UiCounter
                v-model="quantity"
                :min="1"
                :max="10"
                :step="1"
                variant="product-mobile"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="product-images">
        <ProductImages />
      </div>
      <div class="product-answers">
        <div class="product-answers__tabs">
          <div
            class="product-answers__tab"
            :class="{ active: activeReviewTab === 'reviews' }"
            @click="activeReviewTab = 'reviews'"
          >
            Отзывы (250)
          </div>
          <div
            class="product-answers__tab"
            :class="{ active: activeReviewTab === 'faq' }"
            @click="activeReviewTab = 'faq'"
          >
            Вопрос-ответ (6) <Icon name="ds:icon-comment" :size="20" />
          </div>
        </div>
        <div class="product-answers__content">
          <div
            class="product-answers__panel"
            :class="{ active: activeReviewTab === 'reviews' }"
          >
            <Reviews />
          </div>
          <div
            class="product-answers__panel"
            :class="{ active: activeReviewTab === 'faq' }"
          >
            <Answers />
          </div>
        </div>
      </div>
      <div class="product-m_answers">
        <ReviewsMobile />
        <AnswersMobile />
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

<style lang="scss">
.product-page {
  .only-desktop {
    @media (max-width: 1024px) {
      display: none;
    }
  }
}

.product-images {
  margin-top: 50px;
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
    margin: 0 auto;
    max-width: 460px;
  }
  &__button {
    flex: 1;
  }
}

.product-button {
  flex: 1;
}

.product-favorite {
  .ui-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 0;
    .iconify {
      width: 36px;
      height: 36px;
    }
  }
}

.product-click {
  margin-top: 10px;
}

.product-return {
  width: 100%;
  border-radius: 6px;
  border: 1px dashed rgba($primaryColor, 0.5);
  padding: 10px;
  margin-top: 20px;
  &__title {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.3;
  }
  &__row {
    display: flex;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid rgba($primaryColor, 0.1);
    &:last-child {
      border-bottom: 0;
    }
  }
  &__content {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
    flex: 1;
  }
  &__more {
    font-size: 12px;
    font-weight: 500;
  }
  &__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    &-desc {
      color: rgba($primaryColor, 0.5);
    }
  }
  &__icon {
    flex: 0 0 30px;
    &-circle {
      width: 30px;
      height: 30px;
      background-color: $whiteColor;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.product-cart {
  display: flex;
  gap: 10px;
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
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  line-height: 130%;
  max-width: 260px;
  @include respond-to("md") {
    font-size: 24px;
    max-width: none;
  }
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

.product-m_block {
  margin: 15px -10px;
  padding: 10px;
  background: #fff;
  border-radius: 6px;
  @include respond-to("md") {
    display: none;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 10px;
    &-more {
      font-size: 14px;
      color: $secondaryColor;
    }
  }

  &__row {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

.product-answers {
  display: none;
  margin-top: 50px;
  margin-bottom: 50px;
  @include respond-to("md") {
    display: block;
  }
  &__tabs {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
  }
  &__tab {
    display: flex;
    gap: 10px;
    color: rgba($blackColor, 0.5);
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
    &.active,
    &:hover {
      color: $blackColor;
    }
  }
  &__panel {
    display: none;
    &.active {
      display: block;
    }
  }
}

.product-m_answers {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;

  @include respond-to("md") {
    display: none;
  }
}

// Блок с количеством отзывов и вопросов
.product-nums {
  display: flex;
  gap: 18px;
  margin-top: 20px;
  @media (max-width: 768px) {
    gap: 6px;
    align-items: center;
    margin-top: 0;
  }
  &__item {
    display: flex;
    gap: 10px;
    align-items: center;
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 6px;
      font-size: 12px;
      padding: 0 10px;
    }
    &--questions {
      gap: 12px;
      @media (max-width: 768px) {
        gap: 6px;
      }
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
    @media (max-width: 768px) {
      display: none;
    }
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
  }
}

// Блок фото и видео от покупателей
.product-reviews {
  margin-top: 30px;
  @media (max-width: 768px) {
    margin-top: 0;
  }
  &__title {
    font-size: 20px;
    font-weight: 600;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &__container {
    position: relative;
    height: 100px;
    margin-top: 12px;
    cursor: pointer;
    @media (max-width: 768px) {
      margin-top: 0;
      height: 72px;
    }
  }
  &__item {
    position: absolute;
    width: 90px;
    height: 90px;
    border-radius: 15px;
    border: 2px solid #fff;
    overflow: hidden;
    @media (max-width: 768px) {
      width: 70px;
      height: 70px;
      border: 1px solid #fff;
      border-radius: 10px;
    }
    &:last-child {
      border: none;
    }
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
    @media (max-width: 768px) {
      font-size: 14px;
    }
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
}

.product-description,
.product-delivery {
  padding: 0 10px;
  line-height: 1.5;
  @include respond-to("lg") {
    padding: 0;
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
  flex: 0 0 365px;
  position: sticky;
  top: 100px;
  bottom: 0;
  display: flex;
  gap: 10px;
  flex-direction: column;
  @media (max-width: 1024px) {
    display: none;
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

// Цена
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
