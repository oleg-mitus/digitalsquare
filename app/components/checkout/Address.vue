<template>
  <div class="checkout__data-item" @click="openModal">
    <div class="checkout__data-info">
      <div class="checkout__data-title">Пункт выдачи</div>
      <div class="checkout__data-desc">
        г. Санкт-Петербург, ул. Кантемировская, 39
      </div>
    </div>
    <div class="checkout__data-arrow">
      <Icon name="ds:icon-caret" size="8px" />
    </div>
  </div>

  <UiModal :isOpen="showModal" @close="showModal = false">
    <template #header>
      <h3>Адрес доставки</h3>
    </template>

    <div class="checkout__address">
      <CheckoutAddresses />
    </div>
  </UiModal>

  <BottomSheet ref="sheetRef" :snapPoints="snapPoints" :hideScrollbar="true">
    <div class="bottom-sheet" ref="sheetContentRef">
      <div class="bottom-sheet__title">
        Адрес доставки
        <Icon
          name="ds:icon-close"
          size="24px"
          class="bottom-sheet__close"
          @click="sheetRef?.close()"
        />
      </div>
      <div class="bottom-sheet__content">
        <CheckoutAddresses />
      </div>
    </div>
  </BottomSheet>
</template>

<script lang="ts" setup>
import { useWindowSize } from "@vueuse/core";

const showModal = ref<boolean>(false);
const sheetRef = ref(null);
const sheetContentRef = ref(null);
const sheetContentHeight = ref(0);
const { width } = useWindowSize();

const snapPoints = computed(() => {
  return [sheetContentHeight.value + 12, `${100}%`];
});

const openModal = (): void => {
  if (width.value > 1024) {
    showModal.value = true;
  } else {
    openSheet();
  }
};

const openSheet = (): void => {
  sheetRef.value?.open().then(() => {
    if (sheetContentRef.value) {
      sheetContentHeight.value = sheetContentRef.value.offsetHeight;
    }

    sheetRef.value?.open();
  });
};
</script>
