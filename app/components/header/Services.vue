<template>
  <div class="h-services" ref="linkTarget">
    <div
      class="h-services__link"
      @click.prevent="show = !show"
      :class="{ active: show }"
    >
      <span>Сервис</span>
      <span><Icon name="ds:icon-caret" class="h-services__caret" /></span>
    </div>
    <Transition name="fade-in">
      <div class="h-drop h-drop--services" v-if="show" ref="target">
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
const target = useTemplateRef<HTMLElement>("target");
const linkTarget = useTemplateRef<HTMLElement>("linkTarget");

const closeDropdown = (): void => {
  show.value = false;
};

onClickOutside(target, () => closeDropdown(), {
  ignore: [linkTarget],
});
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
    &:hover,
    &.active {
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
</style>
