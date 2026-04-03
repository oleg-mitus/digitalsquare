<template>
  <component
    :is="tag"
    :href="href"
    :type="type"
    class="ui-button"
    :class="[`ui-button--${variant}`, { 'ui-button--block': block }]"
    @click="$emit('click', $event)"
  >
    <template v-if="icon">
      <Icon :name="icon" />
    </template>
    <slot>Кнопка</slot>
  </component>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  icon: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'button',
  },
  href: {
    type: String,
    default: null,
  },
  block: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['click']);

const tag = computed(() => (props.href ? 'a' : 'button'));
</script>

<style scoped lang="scss">
.ui-button {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  display: inline-flex;
  gap: 10px;
  box-sizing: border-box;
  cursor: pointer;
  text-decoration: none;
  align-items: center;
  height: 50px;
  justify-content: center;
  @media (max-width: 1023px) {
    font-size: 14px;
    height: 44px;
  }
  .iconify {
    width: 24px;
    height: 24px;
  }
  &--primary {
    background: #fec93b;
    color: #2f2f2f;
  }
  &--secondary {
    background: #272727;
    color: #ffffff;
  }
  &--block {
    width: 100%;
  }
}
</style>
