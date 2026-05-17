<template>
  <div
    class="address"
    :class="{ disabled: !props.is_available, active: props.checked }"
  >
    <div class="address__wrapper">
      <div class="address__check">
        <UiButton
          iconOnly
          variant="transparent"
          :icon="checked ? `ds:icon-radio-checked` : `ds:icon-radio`"
          size="xs"
          class="icon-only"
        />
      </div>
      <div class="address__content">
        <div class="address__title">
          {{ props.title }}
        </div>
        <div class="address__city">
          {{ props.address }}
        </div>
        <div class="address__period" v-if="props.period && props.is_available">
          {{ props.period }}
        </div>
        <div
          class="address__available"
          :class="{ unavailable: !props.is_available }"
        >
          {{
            props.is_available
              ? `Адрес подходит для этих товаров`
              : `Недоступен`
          }}
        </div>
      </div>
      <div class="address__actions">
        <UiButton
          iconOnly
          variant="transparent"
          icon="ds:icon-dots"
          size="xs"
          class="icon-only"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Address {
  id: number;
  title: string;
  address: string;
  is_available: boolean;
  period?: string;
}

interface Props extends Address {
  checked: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(["update"]);
</script>

<style lang="scss" scoped>
.address {
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 10px;
  background-color: $greyColor;
  &.disabled {
    cursor: not-allowed;
    color: rgba(#313131, 0.5);
  }
  &.active {
    border-color: $secondaryColor;
  }
  &__wrapper {
    display: flex;
    gap: 6px;
    justify-content: space-between;
  }
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    line-height: 1;
  }
  &__title {
    font-weight: 500;
  }
  &__period {
    color: rgba(#313131, 0.5);
    font-size: 14px;
  }
  &__city {
    font-size: 14px;
  }

  &__available {
    color: $greenText;
    font-size: 14px;
    &.unavailable {
      color: $redText;
    }
  }
  &__actions {
    .ui-button .iconify {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
