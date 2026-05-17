<template>
  <div class="header__m-search">
    <div class="h-search__field">
      <div class="h-search__icon">
        <Icon name="ds:icon-search" size="15" />
      </div>
      <input
        class="h-search"
        type="search"
        placeholder="Найти товары"
        ref="input"
        @focusin="showSearch = true"
      />
      <div class="h-search__close"></div>
    </div>
  </div>

  <Teleport to="body">
    <div class="searchbar" :class="{ 'is-open': showSearch }">
      <div class="searchbar__content">
        <div class="searchbar__content-title">Каталог</div>
        <div class="searchbar__content-list">
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
          <div class="searchbar__item">Товар 1</div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useUIState } from "~/stores/ui";

const inputRef = useTemplateRef<HTMLInputElement>("input");
const { showSearch } = useUIState();

watch(showSearch, (incoming) => {
  if (incoming) {
    inputRef.value?.focus();
    document.body.classList.add('hidden');
  } else {
    document.body.classList.remove('hidden');
  }
});
</script>

<style lang="scss">
.searchbar {
  position: fixed;
  height: 100vh;
  padding-bottom: 80px;
  padding-top: 64px;
  overflow-y: scroll;
  z-index: 9;
  background: #fff;
  top: 0;
  left: 0;
  width: 100%;
  transform: translateY(-100%);
  transition: transform 0.2s ease-in;
  &.is-open {
    transform: translateY(0);
  }
  &__content {
    padding: 0 10px;
    &-title {
      position: sticky;
      top: 0;
      height: 44px;
      background: #fff;
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 500;
    }
  }
  &__item {
    min-height: 44px;
    align-items: center;
    padding: 6px 0;
    border-top: 1px solid $borderColor;
    &:last-child {
      border-bottom: 1px solid $borderColor;
    }
  }
}
</style>
