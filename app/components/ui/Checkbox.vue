<template>
  <label
    :class="[
      'ui-checkbox',
      `ui-checkbox--${color}`,
      { 'is-checked': isChecked },
    ]"
  >
    <input
      type="checkbox"
      class="ui-checkbox__input"
      :value="value"
      :checked="isChecked"
      @change="handleChange"
    />
    <span class="ui-checkbox__box">
      <svg
        class="ui-checkbox__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M20 6L9 17L4 12"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <slot />
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: any[] | boolean;
  value?: any;
  color?: "gray" | "orange";
}

const props = withDefaults(defineProps<Props>(), {
  color: "gray",
});

const emit = defineEmits(["update:modelValue"]);

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value);
  }
  return props.modelValue;
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const checked = target.checked;

  if (Array.isArray(props.modelValue)) {
    const newValue = [...props.modelValue];
    if (checked) {
      newValue.push(props.value);
    } else {
      const index = newValue.indexOf(props.value);
      if (index !== -1) newValue.splice(index, 1);
    }
    emit("update:modelValue", newValue);
  } else {
    emit("update:modelValue", checked);
  }
};
</script>

<style lang="scss" scoped>
$gray: $greyText;
$orange: #FEC93B;
$white: #ffffff;

.ui-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  user-select: none;
  font-size: 16px;

  &__input {
    display: none;
  }

  &__box {
    width: 16px;
    height: 16px;
    border: 1px solid $gray;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    background-color: transparent;
  }

  &__icon {
    width: 12px;
    height: 12px;
    color: $white;
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.2s ease;
  }

  &.is-checked {
    .ui-checkbox__icon {
      opacity: 1;
      transform: scale(1);
    }

    &.ui-checkbox--gray .ui-checkbox__box {
      background-color: $gray;
      border-color: $gray;
    }

    &.ui-checkbox--orange .ui-checkbox__box {
      background-color: $white;
      border-color: $orange;
      .ui-checkbox__icon {
        color: $orange;
      }
    }
  }

  &--orange:not(.is-checked) .ui-checkbox__box {
    /*border-color: $orange;*/
  }
}
</style>
