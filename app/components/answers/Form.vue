<template>
  <div class="textarea-wrapper">
    <textarea
      v-model="text"
      :class="['textarea', { 'textarea--focused': isFocused }]"
      @focus="handleFocus"
      placeholder="Задайте вопрос о товаре"
      maxlength="1000"
      :rows="1"
    ></textarea>
    <span>Введено символов {{ text.length }}/1000</span>
  </div>
  <div class="answers__buttons" :class="{ show: isFocused }">
    <UiButton type="submit">Задать вопрос</UiButton>
    <UiButton @click="handleBlur" variant="ghost">Отменить</UiButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const text = ref<string>("");
const isFocused = ref<boolean>(false);

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};
</script>

<style lang="scss" scoped>
.textarea-wrapper {
  display: inline-block;
  width: 100%;
  position: relative;
  span {
    opacity: 0;
    position: absolute;
    right: 0;
    bottom: -16px;
    transition: all 0.3s ease-in-out;
    font-size: 14px;
    line-height: 1;
    color: rgba($blackColor, 0.7);
  }
}

.textarea {
  width: 100%;
  min-height: 42px;
  padding: 14px 20px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  font-size: 16px;
  line-height: 1.3;
  resize: none;
  transition: all 0.3s ease-in-out;
  box-sizing: border-box;
  background-color: #e8e8e8;

  &::placeholder {
    color: rgba($blackColor, 0.7);
  }

  &:focus {
    outline: none;
  }

  &--focused {
    min-height: 120px;
    border-color: $secondaryColor;
    background-color: #f5f5f5;
    & + span {
      opacity: 1;
    }
  }
}

.answers__buttons {
  display: none;
  gap: 10px;
  margin-top: 10px;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  &.show {
    display: flex;
    opacity: 1;
  }
}
</style>
