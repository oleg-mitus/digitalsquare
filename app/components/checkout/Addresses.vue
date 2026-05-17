<template>
  <div class="addresses">
    <div class="addresses__list">
      <CheckoutAddressItem
        v-for="address in addresses"
        :key="address.id"
        v-bind="address"
        :checked="address.id === checked"
        @update="checked = address.id"
      />
    </div>
    <div class="addresses__button">
      <UiButton block>
        Добавить
        <template #desc>Пункт выдачи, постомат, адрес доставки</template>
      </UiButton>
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

const checked = ref<number>(1);

const addresses: Address[] = [
  {
    id: 1,
    title: "Пункт Ozon",
    address: "г. Санкт-Петербург, ул. Кантемировская, 39",
    is_available: true,
    period: "Срок хранения заказа -14 дней ",
  },
  {
    id: 2,
    title: "Пункт Ozon",
    address: "г. Санкт-Петербург, ул. Кантемировская, 23",
    is_available: false,
  },
];
</script>

<style lang="scss" scoped>
.addresses {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
  }
}
</style>
