<template>
  <div class="progress-bar">
    <div
      class="progress-bar__fill"
      :style="{ width: `${validatedValue}%` }"
      :aria-valuenow="validatedValue"
      aria-valuemin="0"
      aria-valuemax="100"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  value: number;
}

const props = defineProps<Props>();

const validatedValue = computed(() => {
  if (props.value < 0) return 0;
  if (props.value > 100) return 100;
  return props.value;
});
</script>

<style lang="scss" scoped>
$progress-height: 10px;
$transition-duration: 0.3s;
$bg-color: #e5e5e5;
$fill-color: $secondaryColor;

.progress-bar {
  width: 100%;
  height: $progress-height;
  background-color: $bg-color;
  border-radius: 10px;
  overflow: hidden;

  &__fill {
    height: 100%;
    transition: width $transition-duration ease-in-out;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 8px;
    box-sizing: border-box;
    background-color: $fill-color;
  }
}
</style>
