<template>
  <div
    :class="[
      'ui-counter',
      { 'is-disabled': disabled },
      `ui-counter--${props.variant}`,
    ]"
  >
    <button
      type="button"
      class="ui-counter__btn"
      :disabled="modelValue <= min || disabled"
      @click="updateValue(modelValue - step)"
    >
      <Icon name="ds:icon-minus" size="24px" />
    </button>

    <input
      type="number"
      class="ui-counter__input"
      :value="modelValue"
      :min="min"
      :max="max"
      :disabled="disabled"
      @input="onInput"
      @blur="onBlur"
      readonly
    />

    <button
      type="button"
      class="ui-counter__btn"
      :disabled="modelValue >= max || disabled"
      @click="updateValue(modelValue + step)"
    >
      <Icon name="ds:icon-plus" size="24px" />
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  variant?: "primary" | "product-mobile" | "product-desktop";
}

const props = withDefaults(defineProps<Props>(), {
  number: 1,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  variant: "primary",
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (newValue: number) => {
  const clampedValue = Math.max(props.min, Math.min(props.max, newValue));
  emit("update:modelValue", clampedValue);
};

const onInput = (event: Event) => {
  const val = parseInt((event.target as HTMLInputElement).value);
  if (!isNaN(val)) {
    updateValue(val);
  }
};

const onBlur = (event: Event) => {
  const val = parseInt((event.target as HTMLInputElement).value);
  if (isNaN(val)) {
    updateValue(props.min);
  }
};
</script>

<style lang="scss" scoped>
$gray-light: #e0e0e0;
$gray-dark: #333;
$orange: #ff8c00;
$white: #ffffff;

.ui-counter {
  display: inline-flex;
  align-items: center;
  border: 1px solid $greyColor;
  border-radius: 8px;
  overflow: hidden;
  background: $greyColor;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: $blackColor;
  }

  &__btn {
    width: 36px;
    height: 36px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 20px;
    color: $blackColor;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover:not(:disabled) {
      background: rgba($greyColor, 0.9);
    }

    &:disabled {
      cursor: not-allowed;
      color: $gray-light;
    }
  }

  &__input {
    width: 36px;
    height: 36px;
    border: none;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    outline: none;
    background: $greyColor;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &.is-disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  &--product-mobile {
    border-radius: 10px;
    background-color: $yellowContentColor;
    border-color: $yellowContentColor;
    height: 100%;
    padding: 0 10px;
    .ui-counter__btn {
      width: 24px;
      height: 100%;
      &:hover:not(:disabled) {
        background: $yellowContentColor;
      }
      &:disabled {
        color: rgba($blackColor, 0.2);
      }
      .iconify {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }
    &:focus-within {
      border-color: $yellowContentColor;
    }
    .ui-counter__input {
      width: 28px;
      height: 100%;
      background-color: $yellowContentColor;
      font-weight: 400;
    }
  }
  &--product-desktop {
    border-radius: 10px;
    height: 100%;
    padding: 0 10px;
    .ui-counter__btn {
      width: 24px;
      height: 100%;
      .iconify {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }
    .ui-counter__input {
      width: 28px;
      height: 100%;
      font-weight: 400;
    }
  }
}
</style>
