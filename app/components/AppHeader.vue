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
          <NuxtLink to="/">
            <img src="~/assets/images/logo.png" alt="logo" />
          </NuxtLink>
          <UiButton icon="my-icon:icon-catalog" variant="secondary"
            >Каталог</UiButton
          >
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
                  <Icon name="my-icon:icon-cart" class="h-cart__icon" />
                  <span class="h-cart__num">1</span>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="header__bottom-profile">
            <HeaderProfile />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
$headerTopHeight: 43px;
$headerBottomHeight: 92px;

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  @media (max-width: 1024px) {
    display: none;
  }

  &__top {
    background-color: $primaryColor;
    height: $headerTopHeight;
    display: flex;
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
      gap: 30px;
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
    }
  }

  &__nav {
    list-style: none;
    display: flex;
    gap: 30px;
    margin: 0;
    padding: 0;
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

.h-cart {
  &__num {
    position: absolute;
    font-size: 14px;
    top: 4px;
    right: 4px;
    font-weight: 300;
    background-color: #ffffff;
    border-radius: 50%;
    padding: 0 4px;
  }
}
</style>
