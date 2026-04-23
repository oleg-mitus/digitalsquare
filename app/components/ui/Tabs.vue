<template>
  <div class="ui-tabs">
    <div class="ui-tabs__container">
      <div class="ui-tabs__nav" ref="navRef">
        <div
          v-for="(tab, index) in items"
          :key="tab.id"
          class="ui-tabs__nav-item"
          :class="{ active: modelValue === tab.id }"
          @click="selectTab(tab.id, index)"
          :ref="(el) => (tabRefs[index] = el as HTMLElement)"
        >
          {{ tab.label }}
        </div>

        <div class="ui-tabs__nav-handler" :style="handlerStyle"></div>
      </div>

      <div class="ui-tabs__content">
        <transition name="fade" mode="out-in">
          <div :key="modelValue" class="ui-tabs__pane">
            <slot :name="modelValue">
              {{ items.find((t) => t.id === modelValue)?.content }}
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";

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

const navRef = ref<HTMLElement | null>(null);
const tabRefs = ref<HTMLElement[]>([]);
const handlerStyle = ref<CSSProperties>({
  width: "0px",
  transform: "translateX(0px)",
});

const updateHandler = () => {
  const index = props.items.findIndex((t) => t.id === props.modelValue);
  const target = tabRefs.value[index];

  if (target && navRef.value) {
    handlerStyle.value = {
      width: `${target.offsetWidth}px`,
      transform: `translateX(${target.offsetLeft}px)`,
    };
  }
};

const selectTab = (id: string, index: number) => {
  emit("update:modelValue", id);
};

watch(
  () => props.modelValue,
  async () => {
    await nextTick();
    updateHandler();
  },
);

onMounted(() => {
  updateHandler();
  window.addEventListener("resize", updateHandler);
});
</script>

<style lang="scss" scoped>
.ui-tabs {
  &__container {
    width: 100%;
  }
  &__nav {
    display: inline-flex;
    position: relative;
    margin-bottom: 20px;
    background-color: $greyColor;
    border-radius: 100px;
    height: 32px;
    @media (max-width: 768px) {
      background-color: $whiteColor;
    }
    &-item {
      padding: 8px 9px 8px 12px;
      height: 100%;
      cursor: pointer;
      color: $greyText;
      transition: color 0.3s ease;
      user-select: none;
      font-size: 14px;
      display: flex;
      align-items: center;
      z-index: 1;
      &.active {
        color: $whiteColor;
      }
    }
    &-handler {
      position: absolute;
      top: 2px;
      bottom: 2px;
      left: 0;
      border-radius: 100px;
      z-index: 0;
      background-color: $secondaryColor;
      transition:
        transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
