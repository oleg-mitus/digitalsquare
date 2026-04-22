<template>
  <nav class="bottom-bar" v-if="isMobile">
    <ul class="bottom-bar__list">
      <li class="bottom-bar__item">
        <button class="bottom-bar__link" aria-label="Поиск">
          <Icon name="ds:icon-search" size="20px" />
          <span class="bottom-bar__text">Поиск</span>
        </button>
      </li>

      <li class="bottom-bar__item">
        <BottomBarServices />
      </li>
       
      <li class="bottom-bar__item">
        <BottomBarProfile />
      </li>

      <li class="bottom-bar__item">
        <BottomBarCallback />
      </li>

      <li class="bottom-bar__item">
        <button
          class="bottom-bar__link bottom-bar__link--cart"
          aria-label="Корзина"
          @click="navigateTo('/cart')"
        >
          <div class="bottom-bar__icon">
            <Icon name="ds:icon-cart" size="20px" />
            <span v-if="cartCount > 0" class="bottom-bar__badge">
              {{ cartCount }}
            </span>
          </div>
          <span class="bottom-bar__text">Корзина</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const isMobile = ref(false);
const cartCount = ref<number>(3);


const checkWidth = () => {
  isMobile.value = window.innerWidth <= 768;
};



onMounted(() => {
  checkWidth();
  window.addEventListener("resize", checkWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkWidth);
});
</script>

<style lang="scss">
$bg-color: #ebebeb;
$badge-color: $blackColor;
$icon-color: $blackColor;

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: $bottomBarHeight;
  background-color: $bg-color;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 10px;

  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    height: calc(#{$bottomBarHeight} + env(safe-area-inset-bottom));
    padding-bottom: env(safe-area-inset-bottom);
  }

  &__list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  &__icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__link {
    position: relative;
    background: none;
    border: none;
    padding: 6px 12px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
    color: $icon-color;
    transition: opacity 0.2s;

    &.active {
      background-color: #fec93b;
    }

    &:active {
      opacity: 0.6;
    }

    &--cart {
      position: relative;
    }
  }

  &__text {
    font-size: 12px;
  }

  &__badge {
    position: absolute;
    top: -2px;
    right: -4px;
    background-color: #2f2f2f;
    color: white;
    font-size: 8px;
    font-weight: 300;
    min-width: 12px;
    height: 12px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2px;
    border: 1px solid #ebebeb;
  }
}

.icon {
  width: 24px;
  height: 24px;
  display: inline-block;
  background-color: currentColor;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;

  &-search {
    mask-image: url("@/assets/icons/icon-search.svg");
  }
  &-catalog {
    mask-image: url("@/assets/icons/icon-grid.svg");
  }
  &-profile {
    mask-image: url("@/assets/icons/icon-user.svg");
  }
  &-phone {
    mask-image: url("@/assets/icons/icon-phone.svg");
  }
  &-cart {
    mask-image: url("@/assets/icons/icon-cart.svg");
  }
}

.bottom-sheet {
  &__title {
    font-size: 20px;
    font-weight: 500;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 20px 10px;
    border-bottom: 1px solid #ececec;
  }

  &__close {
    cursor: pointer;
  }

  &__content {
    padding: 10px;
  }

  &__nav {
    list-style: none;
    padding: 0;
    margin: 0;

    &-link {
      padding: 12px 16px;
      border-radius: 10px;
      height: 44px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover, &.active {
        background-color: #F5F7FA;
      }
    }
  }
}

</style>
