<template>
  <header class="header">
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
              <NuxtLink to="/news">Новости</NuxtLink>
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
          <div class="header__bottom-profile">
            <HeaderProfile />
          </div>
          <div class="header__bottom-city">
            г. Санкт-Петербург<Icon name="my-icon:icon-caret" size="6px" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;

  &-logo {
    @media (max-width: 1024px) {
      width: 95px;
    }
  }

  &__top {
    background-color: $primaryColor;
    height: $headerTopHeight;
    display: flex;
    font-size: 16px;
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

  &__bottom {
    background-color: $secondaryColor;
    height: $headerBottomHeight;
    border-radius: 0 0 15px 15px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    @media (max-width: 1024px) {
      border-radius: 0;
      height: 56px;
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
        @media (max-width: 1024px) {
          display: none;
        }
      }
    }
    &-catalog {
      display: flex;
      align-items: center;
      background-color: #272727;
      border-radius: 6px;
      color: #ffffff;
      padding: 10px 20px;
      gap: 10px;
      @media (max-width: 1024px) {
        display: none;
      }
    }
    &-right {
      display: flex;
      justify-content: flex-end;
      flex: 1;
      gap: 30px;
    }
    &-nav {
      display: flex;
      gap: 30px;
      align-items: center;
      @media (max-width: 1024px) {
        display: none;
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
      max-width: 500px;
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
