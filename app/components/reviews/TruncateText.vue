<template>
  <div class="truncate-text">
    <p
      class="truncate-text__content"
      :class="{
        'truncate-text__content--truncated': isTruncated && !isExpanded,
      }"
    >
      {{ displayText }}
    </p>
    <button
      v-if="isTruncated"
      class="truncate-text__toggle"
      @click="toggleExpansion"
      type="button"
    >
      {{ isExpanded ? "Свернуть" : "Ещё" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  text: string;
  maxChars: number;
}

const props = defineProps<Props>();

const isExpanded = ref(false);

const isTruncated = computed(() => props.text.length > props.maxChars);

const displayText = computed(() => {
  if (!isTruncated.value || isExpanded.value) {
    return props.text;
  }
  return props.text.slice(0, props.maxChars);
});

const toggleExpansion = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style lang="scss" scoped>
.truncate-text {
  display: inline-block;
  max-width: 100%;

  &__content {
    line-height: 1.4;

    &--truncated {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      display: inline;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        display: inline-flex;
        width: 30px;
        height: 14px;
        background: linear-gradient(
          to left,
          rgba(#fff9eb, 1) 0%,
          rgba(#fff9eb, 0.7) 50%,
          rgba(#fff9eb, 0) 100%
        );
      }
    }
  }

  &__toggle {
    background: none;
    border: none;
    outline: none;
    color: $secondaryColor;
    cursor: pointer;
    font-size: 14px;
    padding: 0;
    margin: 0;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
