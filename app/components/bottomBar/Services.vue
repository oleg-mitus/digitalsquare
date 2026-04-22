<template>
  <button
    class="bottom-bar__link"
    aria-label="Сервис"
    @click="openServiceSheet"
  >
    <Icon name="ds:icon-grid" size="20px" />
    <span class="bottom-bar__text">Сервис</span>
  </button>
  <BottomSheet ref="sheetServiceRef" :snapPoints="snapPoints" :hideScrollbar="true" @open="() => openSheet">
    <div class="bottom-sheet" ref="sheetContentRef">
      <div class="bottom-sheet__title">
        Сервис
        <Icon
          name="ds:icon-close"
          size="24px"
          class="bottom-sheet__close"
          @click="sheetServiceRef?.close()"
        />
      </div>
      <div class="bottom-sheet__content">
        <ul class="bottom-sheet__nav">
          <li class="bottom-sheet__nav-link">Оплата</li>
          <li class="bottom-sheet__nav-link">Доставка</li>
          <li class="bottom-sheet__nav-link">Легкий возврат</li>
          <li class="bottom-sheet__nav-link">О компании</li>
          <li class="bottom-sheet__nav-link">Статьи</li>
        </ul>
      </div>
    </div>
  </BottomSheet>
</template>

<script setup lang="ts">
const sheetServiceRef = ref(null);
const sheetContentRef = ref(null);
const sheetContentHeight = ref(0)

const snapPoints = computed(() => {
  return [sheetContentHeight.value + 12, `${100}%`];
})
const openServiceSheet = (): void => {
  sheetServiceRef.value?.open().then(() => {
    if (sheetContentRef.value) {
      sheetContentHeight.value = sheetContentRef.value.offsetHeight;
    }

    sheetServiceRef.value?.open();
  });

};

</script>
