<template>
  <button
    class="bottom-bar__link"
    aria-label="Возникли вопросы?"
    @click="openSheet"
  >
    <Icon name="my-icon:icon-phone" size="20px" />
    <span class="bottom-bar__text">Позвонить</span>
  </button>
  <BottomSheet ref="sheetRef" :snapPoints="snapPoints" :hideScrollbar="true">
    <div class="bottom-sheet" ref="sheetContentRef">
      <div class="bottom-sheet__title">
        Возникли вопросы?
        <Icon
          name="my-icon:icon-close"
          size="24px"
          class="bottom-sheet__close"
          @click="sheetRef?.close()"
        />
      </div>
      <div class="bottom-sheet__content">
        <div class="bottom-sheet__callback">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="email">Звоните</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                placeholder="8 800 000 00 00"
                required
              />
            </div>

            <UiButton type="submit" block>Заказать звонок</UiButton>
          </form>
          <div class="callback-info">
            <p>Пишите</p>
            <UiButton
              type="outline"
              block
              icon="my-icon:icon-ds"
              class="ui-button-vk"
              >VK Мессенджер</UiButton
            >
          </div>
        </div>
      </div>
    </div>
  </BottomSheet>
</template>

<script setup lang="ts">
const sheetRef = ref(null);
const sheetContentRef = ref(null);
const sheetContentHeight = ref(0);

const isPasswordVisible = ref(false);

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const form = reactive({
  phone: "",
});

const handleSubmit = () => {
  console.log("Данные формы:", { ...form });
};

const snapPoints = computed(() => {
  return [sheetContentHeight.value + 12, `${100}%`];
});
const openSheet = (): void => {
  sheetRef.value?.open().then(() => {
    if (sheetContentRef.value) {
      sheetContentHeight.value = sheetContentRef.value.offsetHeight;
    }

    sheetRef.value?.open();
  });
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 6px;
    font-size: 12px;
  }

  input {
    padding: 10px;
    border: 1px solid #f5f7fa;
    border-radius: 10px;
    font-size: 16px;
    background: #f5f7fa;
    height: 44px;

    &:focus {
      outline: none;
      border-color: #2f2f2f;
    }
  }
}

.ui-button-vk {
  background-color: #fff9ea;
  color: #311313;
  font-weight: 500;
}

.callback-info {
    margin-top: 10px;
  p {
    margin: 0 0 6px 0;
    font-size: 12px;
  }
}
</style>
