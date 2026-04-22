<template>
  <button
    class="bottom-bar__link"
    aria-label="Профиль"
    @click="openSheet"
  >
    <Icon name="ds:icon-user" size="20px" />
    <span class="bottom-bar__text">Вход</span>
  </button>
  <BottomSheet ref="sheetRef" :snapPoints="snapPoints" :hideScrollbar="true">
    <div class="bottom-sheet" ref="sheetContentRef">
      <div class="bottom-sheet__title">
        Вход
        <Icon
          name="ds:icon-close"
          size="24px"
          class="bottom-sheet__close"
          @click="sheetRef?.close()"
        />
      </div>
      <div class="bottom-sheet__content">
        <div class="bottom-sheet__profile">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="email">Электронная почта</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="example@mail.com"
                required
              />
            </div>

            <div class="form-group">
              <label for="password">Пароль</label>
              <div class="password-wrapper">
                <input
                  id="password"
                  v-model="form.password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  placeholder="Введите пароль"
                  required
                />
                <button
                  type="button"
                  class="toggle-btn"
                  @click="togglePassword"
                  :title="isPasswordVisible ? 'Скрыть' : 'Показать'"
                >
                  <Icon
                    :name="`${isPasswordVisible ? 'fa-regular:eye-slash' : 'fa6-regular:eye'}`"
                    size="12px"
                  />
                </button>
              </div>
            </div>
            <UiButton type="submit" block>Войти</UiButton>
          </form>
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
  email: "",
  password: "",
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

.password-wrapper {
  position: relative;
  display: flex;

  input {
    width: 100%;
    padding-right: 40px; // Место для иконки
  }

  .toggle-btn {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
