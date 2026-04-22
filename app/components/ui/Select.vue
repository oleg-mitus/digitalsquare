<template>
  <div class="dropdown" ref="target" >
    <div
      class="dropdown__selection"
      :class="{ 'is-open': isOpen, 'is-disabled': disabled }"
      @click="toggle"
    >
      <div class="dropdown__selected-text">
        <span v-if="props.multiple">{{ props.label }}</span>
        <template v-else>
          <span v-if="!selectedOptions" class="dropdown__placeholder">{{ placeholder }}</span>
          <span v-else>{{ selectedOptions.label }}</span>
        </template>
      </div>
      <span class="dropdown__arrow">
        <Icon name="ds:icon-dropdown" size="12px" />
      </span>
    </div>

    <transition name="fade">
      <ul v-if="isOpen" class="dropdown__menu">
        <li
          v-for="option in options"
          :key="option.value"
          class="dropdown__item"
          :class="{
            'is-selected': isSelected(option.value),
            'is-disabled': option.disabled,
          }"
          @click="selectOption(option)"
        >
          <UiCheckbox
            v-if="multiple"
            readonly
            color="orange"
            :value="option.value"
            :modelValue="modelValue"
            @change="selectOption(option)"
          />
          {{ option.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface Props {
  modelValue: any;
  options: Option[];
  label?: string;
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
}

const target = useTemplateRef<HTMLElement>("target");

onClickOutside(target, () => close());

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  disabled: false,
});

const emit = defineEmits(["update:modelValue", "change"]);

const isOpen = ref(false);

const selectedOptions = computed(() => {
  if (props.multiple) {
    return props.options.filter((opt) =>
      (props.modelValue as any[]).includes(opt.value),
    );
  }
  return props.options.find((opt) => opt.value === props.modelValue) || null;
});

const toggle = () => {
  if (!props.disabled) isOpen.value = !isOpen.value;
};

const close = () => {
  isOpen.value = false;
};

const isSelected = (value: string | number) => {
  if (props.multiple) {
    return (props.modelValue as any[]).includes(value);
  }
  return props.modelValue === value;
};

const selectOption = (option: Option) => {
  if (option.disabled) return;

  if (props.multiple) {
    const newValue = [...(props.modelValue as any[])];
    const index = newValue.indexOf(option.value);

    if (index > -1) {
      newValue.splice(index, 1);
    } else {
      newValue.push(option.value);
    }
    emit("update:modelValue", newValue);
  } else {
    emit("update:modelValue", option.value);
    close();
  }
  emit("change", option);
};

const removeItem = (value: string | number) => {
  const newValue = (props.modelValue as any[]).filter((v) => v !== value);
  emit("update:modelValue", newValue);
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  display: inline-flex;

  &__label {
    margin-bottom: 8px;
    font-size: 14px;
  }

  &__selection {
    border: none;
    border-radius: 100px;
    padding: 6px 10px;
    background: $whiteColor;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 35px;
    transition: border-color 0.2s;

    &:hover {
      border-color: darken($blackColor, 10%);
    }
    &.is-open {
      border-color: $secondaryColor;
    }
    &.is-disabled {
      background: #f5f7fa;
      cursor: not-allowed;
    }
  }

  &__arrow {
    transition: transform 0.3s;
    display: flex;
    .is-open & {
      transform: rotate(180deg);
    }
  }

  &__menu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    z-index: 1000;
    margin-top: 8px;
    padding: 6px 10px;
    background: $whiteColor;
    border: 1px solid $borderColor;
    border-radius: 16px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    max-height: 360px;
    overflow-y: auto;
    list-style: none;
  }

  &__item {
    padding: 6px 4px;
    font-size: 14px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background-color: $greyColor;
    }
    &.is-selected {
      
    }
    &.is-disabled {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
