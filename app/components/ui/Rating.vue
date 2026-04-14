<script setup lang="ts">
import { ref } from "vue";

interface Props {
  modelValue?: number;
  maxStars?: number;
  readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  maxStars: 5,
  readonly: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const hoverRating = ref<number>(0);

const setRating = (val: number): void => {
  if (props.readonly) return;
  emit("update:modelValue", val);
};

const handleMouseEnter = (star: number): void => {
  if (props.readonly) return;
  hoverRating.value = star;
};

const handleMouseLeave = (): void => {
  if (props.readonly) return;
  hoverRating.value = 0;
};
</script>

<template>
  <div
    class="star-rating"
    :class="{ 'is-readonly': readonly }"
    @mouseleave="handleMouseLeave"
  >
    <button
      v-for="star in maxStars"
      :key="star"
      type="button"
      class="star-rating__btn"
      :class="{ 'is-active': star <= (hoverRating || modelValue) }"
      @mouseenter="handleMouseEnter(star)"
      @click="setRating(star)"
    >
      ★
    </button>
  </div>
</template>

<style lang="scss" scoped>
.star-rating {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  height: 55px;
  background-color: #F5F7FA;
  &__btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 20px;
    line-height: 1;
    color: #d1d5db;
    transition:
      color 0.15s ease-in-out,
      transform 0.1s ease;

    &:focus {
      outline: none;
    }

    &.is-active {
      color: #fbbf24;
    }

    &:not(.is-readonly):hover {
      transform: scale(1.1);
    }
  }

  &.is-readonly {
    .star-rating__btn {
      cursor: default;
    }
  }
}
</style>
