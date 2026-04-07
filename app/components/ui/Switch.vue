<script setup lang="ts">
interface Props {
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: "",
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const toggle = () => {
  if (!props.disabled) {
    emit("update:modelValue", !props.modelValue);
  }
};
</script>

<template>
  <div class="ui-switch" :class="{ 'is-disabled': disabled }" @click="toggle">
    <div class="ui-switch__track" :class="{ 'is-active': modelValue }">
      <div class="ui-switch__handle" />
    </div>
    <span v-if="label" class="ui-switch__label">{{ label }}</span>

    <input
      type="checkbox"
      class="ui-switch__input"
      :checked="modelValue"
      :disabled="disabled"
      @change="toggle"
    />
  </div>
</template>

<style lang="scss" scoped>
.ui-switch {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  position: relative;

  &__track {
    width: 36px;
    height: 22px;
    background-color: #DCE3ED;
    border-radius: 999px;
    position: relative;
    transition: background-color 0.2s ease;

    &.is-active {
      background-color: #fec93b;

      .ui-switch__handle {
        transform: translateX(13px);
      }
    }
  }

  &__handle {
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    left: 5px;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  &__label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #374151;
  }

  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;

    .ui-switch__track {
      background-color: #e5e7eb;
    }
  }
}
</style>
