<template>
  <div class="h-search">
    <div class="h-search__field">
      <div class="h-search__icon">
        <Icon name="my-icon:icon-search" />
      </div>
      <input
        type="h-search"
        @focusin="show = true"
        @focusout="show = false"
        placeholder="Найти товары"
      />
      <div class="h-search__close"></div>
    </div>
    <Transition name="slide-up">
      <div class="h-search__drop" v-if="show">
        <div class="h-search__drop-wrapper">
          <div class="h-search__drop-top">
            <div class="h-search__drop-title">История</div>
            <div class="h-search__drop-clear">очистить</div>
          </div>
          <div class="h-search__drop-content">
            <ul class="h-search__results">
              <li class="h-search__results-item">
                <NuxtLink
                  to="/catalog"
                  class="h-search__results-link"
                  @click="closeDropdown"
                  >Картридж 1</NuxtLink
                >
              </li>
              <li class="h-search__results-item">
                <NuxtLink
                  to="/catalog"
                  class="h-search__results-link"
                  @click="closeDropdown"
                  >Картридж 2</NuxtLink
                >
              </li>
              <li class="h-search__results-item">
                <NuxtLink
                  to="/catalog"
                  class="h-search__results-link"
                  @click="closeDropdown"
                  >Картридж 3</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const show = ref<boolean>(false);

const closeDropdown = (): void => {
  show.value = false;
};
</script>

<style lang="scss">
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance:none;
}

.h-search {
  position: relative;
  width: 100%;
  input {
    width: 100%;
    height: 50px;
    padding: 10px;
    padding-left: 45px;
    background-color: #fff4d8;
    border-radius: 6px;
    border: none;
    &:focus {
      outline: none;
    }
  }
  &__field {
    display: flex;
    align-items: center;
  }
  &__icon {
    width: 35px;
    height: 35px;
    position: absolute;
    left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__drop {
    margin-top: 22px;
    position: absolute;
    width: 100%;
    background: #fff;
    padding-bottom: 10px;
    border-radius: 0 0 20px 20px;
    &-top {
      padding: 20px 10px;
      border-bottom: 1px solid #ececec;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-title {
      font-size: 20px;
      line-height: 1;
      font-weight: 500;
    }
    &-clear {
      font-size: 14px;
      line-height: 1;
      color: rgba(49, 49, 49, 0.5);
      cursor: pointer;
      &:hover {
        color: rgba(49, 49, 49);
      }
    }
    &-content {
      padding: 0 10px;
    }
  }
  &__results {
    padding: 10px 0 0;
    list-style-type: none;
    margin: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    &-item {
      width: 100%;
      display: flex;
      flex: 1;
    }
    &-link {
      width: 100%;
      height: 44px;
      padding: 0 10;
      border-radius: 6px;
      color: rgba(49, 49, 49, 0.5);
      font-size: 16px;
      text-decoration: none;
      align-items: center;
      display: flex;
      padding: 0 10px;
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>
