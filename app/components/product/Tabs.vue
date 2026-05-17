<template>
  <div class="product-tabs">
    <div class="product-tabs__container">
      <div class="product-tabs__nav">
        <div
          v-for="(tab, index) in items"
          :key="tab.id"
          class="product-tabs__nav-item"
          :class="{ active: modelValue === tab.id }"
          @click="selectTab(tab.id, index)"
        >
          {{ tab.label }}
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <div :key="modelValue" class="product-tabs__pane">
          <slot :name="modelValue">
            {{ items.find((t) => t.id === modelValue)?.content }}
          </slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TabItem {
  id: string;
  label: string;
  content?: string;
}

const props = defineProps<{
  items: TabItem[];
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const selectTab = (id: string, index: number) => {
  emit("update:modelValue", id);
};
</script>

<style lang="scss" scoped>
.product-tabs {
  margin-top: 50px;
  margin-bottom: 50px;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    margin: 25px -10px;
    padding: 10px 0;
    background: #fff;
    border-radius: 6px;
  }
  &__container {
    width: 100%;
  }
  &__nav {
    display: flex;
    position: relative;
    margin-bottom: 30px;
    @media (max-width: 1024px) {
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-padding-left: 10px;
      gap: 4px;
      padding: 0 10px;

      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;
      margin-bottom: 20px;
    }

    &-item {
      padding: 4px 12px;
      height: 100%;
      cursor: pointer;
      border-radius: 100px;
      transition: background-color 0.3s ease;
      user-select: none;
      font-size: 16px;
      display: flex;
      align-items: center;
      z-index: 1;
      text-wrap: nowrap;
      background-color: $greyColor;
      &.active {
        background-color: $secondaryColor;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
