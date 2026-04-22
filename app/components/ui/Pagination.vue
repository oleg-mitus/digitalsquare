<script setup lang="ts">
interface Props {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  pageSizeOptions?: number[];
}

const props = withDefaults(defineProps<Props>(), {
  pageSizeOptions: () => [9, 12, 18, 36],
});

const emit = defineEmits<{
  (e: "update:currentPage", page: number): void;
  (e: "update:pageSize", size: number): void;
}>();

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize));

const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = props.currentPage;
  const delta = 3;
  const range = [];
  const rangeWithDots = [];

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  let l;
  for (const i of range) {
    if (l) {
      if (i - l === 2) rangeWithDots.push(l + 1);
      else if (i - l !== 1) rangeWithDots.push("...");
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
});

const setPage = (page: number | string) => {
  if (typeof page === "number" && page > 0 && page <= totalPages.value) {
    emit("update:currentPage", page);
  }
};

const onPageSizeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit("update:pageSize", Number(target.value));
  emit("update:currentPage", 1);
};
</script>

<template>
  <div class="pagination">
    <div class="pagination__top">
      <div class="pagination__pages">
        <button
          v-for="(page, idx) in visiblePages"
          :key="idx"
          class="pagination__btn"
          :class="{
            'is-active': page === currentPage,
            'is-dots': page === '...',
          }"
          :disabled="page === '...'"
          @click="setPage(page)"
        >
          {{ page }}
        </button>

        <div class="pagination__arrows">
          <button
            class="pagination__btn pagination__btn-prev"
            :disabled="currentPage === 1"
            @click="setPage(currentPage - 1)"
          >
            <Icon name="ds:icon-bottom" size="8px" />
          </button>
          <button
            class="pagination__btn pagination__btn-next"
            :disabled="currentPage === totalPages"
            @click="setPage(currentPage + 1)"
          >
            <Icon name="ds:icon-bottom" size="8px" />
          </button>
        </div>
      </div>
    </div>
    <div class="pagination__info">
      Показано {{ Math.min(pageSize * currentPage, totalItems) }} товаров из
      {{ totalItems }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px 0;

  &__top {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 20px;
  }

  &__pages {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__arrows {
    display: flex;
    gap: 6px;
    margin-left: 10px;
  }

  &__btn {
    min-width: 43px;
    height: 43px;
    background: #fff;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover:not(:disabled):not(.is-dots) {
      background: $secondaryColor;
      color: #ffffff;
    }

    &.is-active {
      background: $secondaryColor;
      color: #fff;
    }

    &.is-dots {
      border: none;
      cursor: default;
    }

    &:disabled {
      cursor: not-allowed;
    }
    &-prev {
      .iconify {
        transform: rotate(90deg);
        width: 8px;
        height: 8px;
      }
    }
    &-next {
      .iconify {
        transform: rotate(-90deg);
        width: 8px;
        height: 8px;
      }
    }
  }

  &__limit {
    select {
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      background: #fff;
      outline: none;
      cursor: pointer;
      &:focus {
        border-color: #3b82f6;
      }
    }
  }

  &__info {
    font-size: 16px;
    color: rgba(#333333, 0.5);
    margin: 0;
  }
}
</style>
