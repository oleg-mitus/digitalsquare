<template>
  <nav class="bottom-bar" v-if="isMobile">
    <ul class="bottom-bar__list">
      <!-- Поиск -->
      <li class="bottom-bar__item">
        <button class="bottom-bar__link" aria-label="Поиск">
          <span class="icon icon-search"></span>
        </button>
      </li>

      <!-- Каталог -->
      <li class="bottom-bar__item">
        <button class="bottom-bar__link" aria-label="Каталог">
          <span class="icon icon-catalog"></span>
        </button>
      </li>

      <!-- Профиль -->
      <li class="bottom-bar__item">
        <button class="bottom-bar__link" aria-label="Профиль">
          <span class="icon icon-profile"></span>
        </button>
      </li>

      <!-- Обратный звонок -->
      <li class="bottom-bar__item">
        <button class="bottom-bar__link" aria-label="Обратный звонок">
          <span class="icon icon-phone"></span>
        </button>
      </li>

      <!-- Корзина с бейджем -->
      <li class="bottom-bar__item">
        <button
          class="bottom-bar__link bottom-bar__link--cart"
          aria-label="Корзина"
        >
          <span class="icon icon-cart"></span>
          <span v-if="cartCount > 0" class="bottom-bar__badge">
            {{ cartCount }}
          </span>
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
  window.addEventListener('resize', checkWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkWidth);
});
</script>

<style lang="scss" scoped>

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

  &__link {
    position: relative;
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $icon-color;
    transition: opacity 0.2s;

    &:active {
      opacity: 0.6;
    }

    &--cart {
      position: relative;
    }
  }

  &__badge {
    position: absolute;
    top: 2px;
    right: 2px;
    background-color: $badge-color;
    color: white;
    font-size: 10px;
    font-weight: bold;
    min-width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    border: 1px solid $bg-color; // Чтобы визуально отделить бейдж
  }
}

// Заглушки для иконок (используйте SVG или иконочный шрифт)
.icon {
  width: 24px;
  height: 24px;
  display: inline-block;
  background-color: currentColor;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;

  &-search {
    mask-image: url('@/assets/icons/icon-search.svg');
  }
  &-catalog {
    mask-image: url('@/assets/icons/icon-grid.svg');
  }
  &-profile {
    mask-image: url('@/assets/icons/icon-user.svg');
  }
  &-phone {
    mask-image: url('@/assets/icons/icon-phone.svg');
  }
  &-cart {
    mask-image: url('@/assets/icons/icon-cart.svg');
  }
}
</style>
