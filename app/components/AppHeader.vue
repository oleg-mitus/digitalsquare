<script setup>
const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);

// Закрываем меню при переходе по ссылке
const closeMenu = () => (isMenuOpen.value = false);

const navLinks = [
  { name: 'Главная', path: '/' },
  { name: 'Каталог', path: '/catalog' },
  { name: 'Отзывы', path: '/reviews' },
  { name: 'Новости', path: '/news' },
  { name: 'Статьи', path: '/articles' },
];
</script>

<template>
  <header class="header">
    <div class="header__top">
      <div class="container header__top-content">
        <div class="header__top-nav">
          <ul class="header__nav">
            <li class="header__nav-item">
              <NuxtLink to="/about">О магазине</NuxtLink>
            </li>
            <li class="header__nav-item">
              <NuxtLink to="/about">Оплата и доставка</NuxtLink>
            </li>
            <li class="header__nav-item">
              <NuxtLink to="/about">Новости</NuxtLink>
            </li>
            <li class="header__nav-item">
              <NuxtLink to="/contacts">Контакты</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="header__top-contacts">
          <div class="header__top-address">
            г. Санкт-Петербург, ул. Кантемировская, 39
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
          <NuxtLink to="/">
            <img src="~/assets/images/logo.png" alt="logo" />
          </NuxtLink>
          <NuxtLink to="/" class="header__bottom-catalog" @click="closeMenu">
            <SvgIcon name="phone" width="24px" height="24px" />
            <span>Каталог</span>
          </NuxtLink>
        </div>

        
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
$headerTopHeight: 43px;
$headerBottomHeight: 90px;

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  @media (max-width: 1024px) {
    display: none;
  }

  &__top {
    background-color: $primaryColor;
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
      color: #ffffff;
      a {
        text-decoration: none;
        color: #ffffff;
      }
    }
  }

  &__bottom {
    background-color: #fec93b;
    height: $headerBottomHeight;
    border-radius: 0 0 15px 15px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-left {
      display: flex;
      gap: 40px;
      align-items: center;
    }
    &-catalog {
      display: flex;
      align-items: center;
      background-color: #272727;
      border-radius: 6px;
      color: #ffffff;
      padding: 10px 20px;
      gap: 10px;
    }
  }

  &__nav {
    list-style: none;
    display: flex;
    gap: 30px;
    &-item a {
      color: #fff;
      text-decoration: none;
    }
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
  }

  .nav {
    display: flex;
    gap: 20px;
    align-items: center;

    @media (max-width: $tablet) {
      display: none;

      &.open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #fff;
        padding: 20px;
        border-top: 1px solid #eee;
      }
    }
  }

  .burger {
    display: none;

    @media (max-width: $tablet) {
      display: block;
      background: none;
      border: none;
      font-size: 24px;
    }
  }
}
</style>
