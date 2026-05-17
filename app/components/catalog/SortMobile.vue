<template>
  <button class="catalog-actions__filter-button" @click="openServiceSheet">
    <Icon name="ds:icon-sort" size="18px" />
  </button>

  <BottomSheet
    ref="sheetServiceRef"
    :snapPoints="snapPoints"
    :hideScrollbar="true"
    @open="() => openSheet"
  >
    <div class="bottom-sheet" ref="sheetContentRef">
      <div class="bottom-sheet__title">
        Сортировка
        <Icon
          name="ds:icon-close"
          size="24px"
          class="bottom-sheet__close"
          @click="sheetServiceRef?.close()"
        />
      </div>
      <div class="bottom-sheet__content">
        <ul class="bottom-sheet__nav">
          <li class="bottom-sheet__nav-link">По названию</li>
          <li class="bottom-sheet__nav-link">Сначала дешевле</li>
          <li class="bottom-sheet__nav-link">Сначала дороже</li>
          <li class="bottom-sheet__nav-link">По популярности</li>
        </ul>
      </div>
    </div>
  </BottomSheet>
</template>

<script setup lang="ts">
const sheetServiceRef = ref(null);
const sheetContentRef = ref(null);
const sheetContentHeight = ref(0);

const snapPoints = computed(() => {
  return [sheetContentHeight.value + 12, `${100}%`];
});
const openServiceSheet = (): void => {
  sheetServiceRef.value?.open().then(() => {
    if (sheetContentRef.value) {
      sheetContentHeight.value = sheetContentRef.value.offsetHeight;
    }

    sheetServiceRef.value?.open();
  });
};
</script>
