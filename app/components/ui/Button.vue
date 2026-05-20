<template>
  <component
    :is="tag"
    :href="href"
    :type="type"
    class="ui-button"
    :class="[
      `ui-button--${variant}`,
      { 'ui-button--block': block },
      { 'ui-button--with-desc': $slots.desc },
      { 'ui-button--icon': iconOnly },
      `ui-button--${size}`,
      `ui-button--radius-${radius}`,
    ]"
    :disabled="loading || disabled"
    @click="$emit('click', $event)"
  >
    <template v-if="icon">
      <Icon :name="icon" size="24px" />
    </template>
    <slot v-if="!iconOnly" />
    <template v-if="$slots.desc">
      <span class="ui-button-desc"><slot name="desc" /></span>
    </template>
    <div class="ui-button__loading" v-if="loading">
      <Icon name="ds:icon-loading" size="16px" />
    </div>
  </component>
</template>

<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "white" | "yellow" | "green" | "ghost" | "transparent";
  size?: "xs" | "md" | "lg";
  color?: "gray" | "orange";
  icon?: string;
  type?: "button" | "submit" | "reset";
  href?: string;
  iconOnly?: boolean;
  block?: boolean;
  radius?: "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  type: "button",
  iconOnly: false,
  block: false,
  radius: "md",
  loading: false,
  disabled: false,
});

defineEmits(["click"]);

const tag = computed(() => (props.href ? "a" : "button"));
</script>

<style lang="scss">
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
  position: relative;
  font-size: 14px;
  height: 44px;
  overflow: hidden;

  @include respond-to("lg") {
    font-size: 16px;
    height: 50px;
  }

  &:disabled {
    opacity: 0.8;
  }

  &__loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: currentColor;
    .iconify {
      width: 16px;
      height: 16px;
    }
  }

  .iconify {
    width: 20px;
    height: 20px;
    @include respond-to("lg") {
      width: 24px;
      height: 24px;
    }
  }
  &--primary {
    background: $secondaryColor;
    color: $primaryColor;
    &:hover:not(:disabled) {
      background-color: #ffd461;
    }
    .ui-button__loading {
      background-color: $secondaryColor;
    }
  }
  &--secondary {
    background: $primaryColor;
    color: $whiteColor;
    &:hover:not(:disabled) {
      background-color: #1c1c1c;
    }
    .ui-button__loading {
      background-color: $primaryColor;
    }
  }
  &--white {
    background: $whiteColor;
    color: $primaryColor;
    &:hover:not(:disabled) {
      background-color: #1c1c1c;
      color: $whiteColor;
    }
    .ui-button__loading {
      background-color: $whiteColor;
    }
  }
  &--green {
    background: $greenColor;
    color: $whiteColor;
    &:hover:not(:disabled) {
      background-color: $greenText;
    }
    .ui-button__loading {
      background-color: $greenColor;
    }
  }
  &--ghost {
    background: #fff9eb;
    color: $primaryColor;
    &:hover:not(:disabled) {
      background-color: $secondaryColor;
    }
    .ui-button__loading {
      background-color: #fff9eb;
    }
  }
  &--vk {
    background-color: #fff9ea;
    color: #311313;
    font-weight: 500;
  }
  &--transparent {
    background: transparent;
    color: $primaryColor;
    &:hover:not(disabled) {
      background-color: #f5f7fa;
    }
  }
  &--yellow {
    background: rgba($secondaryColor, 0.1);
    color: $secondaryColor;
    &:hover:not(disabled) {
      background-color: $secondaryColor;
      color: #fff;
    }
    .ui-button__loading {
      background-color: rgba($secondaryColor, 0.1);
    }
  }
  &--grey {
    background: $greyColor;
    color: $greyText;
    &:hover:not(disabled) {
      opacity: 0.8;
    }
    .ui-button__loading {
      background-color: $greyColor;
    }
  }
  &--red {
    background: #fff4f6;
    color: #f1117e;
    &:hover:not(disabled) {
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
  &--xs {
    &.icon-only {
      width: 20px;
      height: 20px;
      padding: 0;
      .iconify {
        width: 20px;
        height: 20px;
      }
    }
  }
  &--lg {
    font-weight: 500;
    height: 50px;
    @media (max-width: 1023px) {
      font-size: 16px;
      height: 50px;
    }
  }
  &--block {
    width: 100%;
  }
  &--radius-lg {
    border-radius: 10px;
  }
  &--with-desc {
    gap: 4px;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    line-height: 1;
    justify-content: center;
    align-items: center;
  }
  &-desc {
    display: flex;
    justify-content: center;
    font-size: 12px;
    font-weight: 400;
    @include respond-to("lg") {
      font-size: 14px;
    }
  }
}
</style>
