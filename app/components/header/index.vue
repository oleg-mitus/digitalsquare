<template>
  <header
    class="header"
    :class="{ 'is-home-page': $route.path === '/', 'show-search': showSearch }"
    id="header"
  >
    <div class="header__top">
      <div class="container header__top-content">
        <div class="header__top-nav">
          <ul class="header__nav">
            <li class="header__nav-item">
              <NuxtLink to="/about" class="active">О магазине</NuxtLink>
            </li>
            <li class="header__nav-item">
              <NuxtLink to="/about">Оплата и доставка</NuxtLink>
            </li>
            <li class="header__nav-item">
              <NuxtLink to="/about">Новости</NuxtLink>
            </li>
            <li class="header__nav-item">
              <NuxtLink to="/about">Контакты</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="header__top-contacts">
          <div class="header__top-address" @click="showCityModal = true">
            Санкт-Петербург
          </div>
          <div class="header__top-phone">
            <a href="tel:+78124907406">+7 (812) 490 74 06</a>
          </div>
        </div>
      </div>
    </div>

    <div class="header__bottom">
      <div class="header__bottom-content container">
        <div class="header__bottom-left">
          <NuxtLink to="/" class="header-logo">
            <img src="~/assets/images/logo.png" alt="logo" />
          </NuxtLink>
          <HeaderCatalog />
        </div>
        <div class="header__bottom-right">
          <div class="header__bottom-search">
            <HeaderSearch />
          </div>
          <div class="header__bottom-nav">
            <div class="header__bottom-links">
              <div class="header__bottom-link">
                <HeaderServices />
              </div>
              <div class="header__bottom-link">
                <NuxtLink to="/my-order">Мой заказ</NuxtLink>
              </div>
            </div>
            <div class="header__bottom-icons">
              <div class="header__bottom-icon">
                <HeaderCallback />
              </div>
              <div class="header__bottom-icon">
                <NuxtLink to="/cart" class="h-cart h-icon">
                  <Icon name="ds:icon-cart" class="h-cart__icon" />
                  <span class="h-cart__num">1</span>
                </NuxtLink>
              </div>
            </div>
          </div>
          <!-- Добавить когда будет ЛК -->
          <div class="header__bottom-profile" v-if="false">
            <HeaderProfile />
          </div>
          <div class="header__bottom-city" @click="showCityModal = true">
            г. Санкт-Петербург<Icon name="ds:icon-caret" size="6px" />
          </div>
        </div>
      </div>
    </div>
    <HeaderMobileSearch />
  </header>

  <UiModal :isOpen="showCityModal" @close="showCityModal = false">
    <template #header>
      <h3>Выберите Ваш город</h3>
    </template>

    <div class="city-select">
      <form>
        <div class="form-group">
          <input id="phone" type="text" placeholder="Введите название города" />
        </div>
        <div class="city-select__text">
          Не нашли свой город? У нас есть <a href="">доставка Почтой России</a>
        </div>
      </form>
    </div>
  </UiModal>
</template>

<script lang="ts" setup>
import { useUIState } from "~/stores/ui";

const { showSearch } = useUIState();
const showCityModal = ref<boolean>(false);
</script>

<style lang="scss">
.header {
  position: sticky;
  top: calc(-1 * var(--top-bar-height, 30px));
  width: 100%;
  z-index: 10;
  transition: transform 0.3s ease-in;
  @media (max-width: 1024px) {
    top: 0;
  }

  &-logo {
    @media (max-width: 1024px) {
      width: 95px;
    }
  }

  &__top {
    background-color: $primaryColor;
    height: $headerTopHeight;
    display: flex;
    font-size: 14px;
    color: $whiteColor;

    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-contacts {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      @media (max-width: 1280px) {
        gap: 30px;
      }
      a {
        text-decoration: none;
        color: $whiteColor;
        &:hover {
          color: $secondaryColor;
        }
      }
    }
    @media (max-width: 1280px) {
      font-size: 14px;
    }
    @media (max-width: 1024px) {
      display: none;
    }
  }

  &__nav {
    list-style: none;
    display: flex;
    gap: 30px;
    margin: 0;
    padding: 0;

    &-item a {
      color: $whiteColor;
      text-decoration: none;
      &.active,
      &:hover {
        color: $secondaryColor;
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 2px;
      }
    }
    @media (max-width: 1280px) {
      gap: 20px;
    }
  }

  &__m-search {
    height: 54px;
    border-radius: 0 0 15px 15px;
    background-color: $secondaryColor;
    padding: 0 10px 10px 10px;
    display: none;

    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }

    input {
      width: 100%;
      height: 44px;
      padding: 10px;
      padding-left: 32px;
      background-color: #fff4d8;
      border-radius: 10px;
      border: none;
      &:focus {
        outline: none;
      }
    }
  }
  &.show-search {
    transform: translateY(-46px);
    .header__m-search {
      display: block;
      @include respond-to("lg") {
        display: none;
      }
    }
  }
  &.is-home-page {
    .header__m-search {
      display: block;
      @include respond-to("lg") {
        display: none;
      }
    }
  }

  &__bottom {
    background-color: $secondaryColor;
    height: 56px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    position: sticky;
    top: 0;
    z-index: 30;

    @include respond-to("lg") {
      border-radius: 0 0 15px 15px;
      height: 80px;
    }
    @include respond-to("2xl") {
      height: 80px;
    }
    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
    }
    &-left {
      display: flex;
      gap: 40px;
      align-items: center;
      .ui-button {
        display: none;
        @include respond-to("lg") {
          display: flex;
        }
      }
    }
    &-catalog {
      display: none;
      align-items: center;
      background-color: #272727;
      border-radius: 6px;
      color: #ffffff;
      padding: 10px 20px;
      gap: 10px;
      @include respond-to("lg") {
        display: flex;
      }
    }
    &-right {
      display: flex;
      justify-content: flex-end;
      flex: 1;
      gap: 30px;
    }
    &-nav {
      display: none;
      gap: 30px;
      align-items: center;
      @include respond-to("lg") {
        display: flex;
      }
    }
    &-links {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    &-link {
      a {
        font-size: 16px;
        line-height: 1;
        border-radius: 6px;
        height: 40px;
        text-decoration: none;
        color: #2f2f2f;
        display: flex;
        align-items: center;
        padding: 0 12px;
        &:hover {
          background-color: #ffd461;
        }
      }
    }
    &-icons {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    &-search {
      flex: 1;
      input {
        width: 100%;
      }

      @media (max-width: 1024px) {
        display: none;
      }
    }
    &-profile {
      @media (max-width: 1024px) {
        display: none;
      }
    }
    &-city {
      font-size: 14px;
      color: #2f2f2f;
      align-items: center;
      gap: 4px;
      display: none;
      @media (max-width: 1024px) {
        display: flex;
      }
      .iconify {
        transform: rotate(-90deg);
      }
    }
  }
}

.h-icon {
  width: 40px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: #ffd461;
  }
  .iconify {
    width: 26px;
    height: 26px;
  }
}

.h-catalog {
  @media (max-width: 1024px) {
    display: none;
  }
}

.h-cart {
  &__num {
    position: absolute;
    font-size: 14px;
    top: 4px;
    right: 2px;
    font-weight: 300;
    background-color: #ffffff;
    border-radius: 50%;
    padding: 0 4px;
    line-height: 130%;
    height: 18px;
    min-width: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
