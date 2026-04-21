<template>
  <div class="h-services" ref="target">
    <div
      class="h-services__link"
      @click="show = !show"
      :class="{ active: show }"
    >
      <span>Сервис</span>
      <span><Icon name="ds:icon-caret" class="h-services__caret" /></span>
    </div>
    <Transition name="slide-up">
      <div class="h-drop" v-if="show">
        <div class="h-drop__content">
          <ul class="h-drop__results">
            <li class="h-drop__results-item">
              <NuxtLink
                to="/payments"
                class="h-drop__results-link"
                @click="closeDropdown"
                >Оплата</NuxtLink
              >
            </li>
            <li class="h-drop__results-item">
              <NuxtLink
                to="/delivery"
                class="h-drop__results-link"
                @click="closeDropdown"
                >Доставка</NuxtLink
              >
            </li>
            <li class="h-drop__results-item">
              <NuxtLink
                to="/refund"
                class="h-drop__results-link"
                @click="closeDropdown"
                >Легкий возврат</NuxtLink
              >
            </li>
            <li class="h-drop__results-item">
              <NuxtLink
                to="/about"
                class="h-drop__results-link"
                @click="closeDropdown"
                >О компании</NuxtLink
              >
            </li>
            <li class="h-drop__results-item">
              <NuxtLink
                to="/articles"
                class="h-drop__results-link"
                @click="closeDropdown"
                >Статьи</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const show = ref<boolean>(false);
const target = useTemplateRef<HTMLElement>('target');

const closeDropdown = (): void => {
  show.value = false;
};

onClickOutside(target, () => closeDropdown());
</script>

<style lang="scss" scoped>
.h-services {
  position: relative;
  &__link {
    font-size: 16px;
    line-height: 1;
    border-radius: 6px;
    height: 40px;
    text-decoration: none;
    color: $primaryColor;
    display: flex;
    align-items: center;
    padding: 0 12px;
    display: flex;
    gap: 4px;
    align-items: center;
    cursor: pointer;
    &:hover, &.active {
      background-color: #ffd461;
    }
    &.active {
      .h-services__caret {
        transform: rotate(-180deg);
      }
    }
  }
  &__caret {
    transition: all 0.2s ease-in;
    width: 8px;
    height: 8px;
    transform: rotate(0deg);
  }
}

.h-drop {
  position: absolute;
  width: 375px;
  right: 0;
  top: calc(100% + 25px);
  background: $whiteColor;
  padding-bottom: 10px;
  border-radius: 0 0 20px 20px;
  border: 1px solid $secondaryColor;
  border-top: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__content {
    padding: 10px 10px 0 10px;
  }
  &__results {
    margin: 0;
    padding: 0;
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
        background-color: $greyColor;
      }
    }
  }
}
</style>
