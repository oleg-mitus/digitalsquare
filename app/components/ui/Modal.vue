<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content" role="dialog" aria-modal="true">
          <header class="modal-header">
            <slot name="header">
              <h3>Заголовок</h3>
            </slot>
            <button class="close-btn" @click="$emit('close')">
              <Icon name="ds:icon-close" size="20px" />
            </button>
          </header>

          <main class="modal-body">
            <slot />
          </main>

          <footer class="modal-footer" v-if="$slots.footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from "vue";

interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "close"): void;
}>();

watch(
  () => props.isOpen,
  (newValue) => {
    if (process.client) {
      if (newValue) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  },
  { immediate: true },
);
</script>

<style lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 510px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $borderColor;
  padding: 10px 20px;
  height: 64px;

  h3 {
    margin: 0;
    padding: 0;
    line-height: 130%;
    font-weight: 500;
  }
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
  color: #666;
  &:hover {
    color: #000;
  }
}

.modal-body {
    padding: 10px;
}

// Анимация появления
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
