<template>
  <component
    :is="tag"
    :href="href"
    :type="type"
    class="ui-button"
    :class="[
      `ui-button--${variant}`,
      { 'ui-button--block': block },
      { 'ui-button--icon': iconOnly },
      `ui-button--${size}`,
    ]"
    @click="$emit('click', $event)"
  >
    <template v-if="icon">
      <Icon :name="icon" size="24px" />
    </template>
    <slot v-if="!iconOnly" />
  </component>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md",
  },
  icon: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: "button",
  },
  href: {
    type: String,
    default: null,
  },
  iconOnly: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["click"]);

const tag = computed(() => (props.href ? "a" : "button"));
</script>

<style scoped lang="scss">
.ui-button {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  display: inline-flex;
  gap: 10px;
  box-sizing: border-box;
  cursor: pointer;
  text-decoration: none;
  align-items: center;
  height: 50px;
  justify-content: center;
  outline: none;
  transition: all 0.3s ease-in-out;
  @media (max-width: 1023px) {
    font-size: 14px;
    height: 44px;
  }
  .iconify {
    width: 24px;
    height: 24px;
  }
  &--primary {
    background: #fec93b;
    color: #2f2f2f;
    &:hover {
      background-color: #ffd461;
    }
  }
  &--secondary {
    background: #272727;
    color: #ffffff;
    &:hover {
      opacity: 0.8;
    }
  }
  &--transparent {
    background: transparent;
    color: #2f2f2f;
    &:hover {
      background-color: #f5f7fa;
    }
  }
  &--grey {
    background: $greyColor;
    color: $greyText;
    &:hover {
      opacity: 0.8;
    }
  }
  &--red {
    background: #fff4f6;
    color: #f1117e;
    &:hover {
      opacity: 0.8;
    }
  }
  &--icon {
    width: 44px;
    height: 44px;
    padding: 10px;
  }
  &--sm {
    height: 44px;
    padding: 10px;
  }
  &--block {
    width: 100%;
  }
}
</style>
