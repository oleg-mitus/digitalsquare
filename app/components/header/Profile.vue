<template>
  <div class="ui-header-profile" ref="linkTarget">
    <button
      class="ui-header-profile__button"
      @click="show = !show"
      :class="{ active: show }"
    >
      <span class="ui-header-profile__icon">
        <Icon
          width="26px"
          height="26px"
          name="ds:icon-user"
          class="ui-header-profile__svg"
        />
      </span>
      <span>Войти</span>
    </button>
    <Transition name="fade-in">
      <div class="h-drop" v-if="show" ref="target">
        <div class="h-drop__top">
          <div class="h-drop__top-title">Вход</div>
        </div>
        <div class="h-drop__content">
          <form @submit.prevent="handleSubmit">
            <div class="form-group" :class="{ error: errors.email }">
              <label for="email">Электронная почта</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="example@mail.com"
              />
              <span v-if="errors.email" class="form-error">{{
                errors.email
              }}</span>
            </div>

            <div class="form-group" :class="{ error: errors.password }">
              <label for="password">Пароль</label>
              <div class="password-wrapper">
                <input
                  id="password"
                  v-model="form.password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  placeholder="Введите пароль"
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
              <span v-if="errors.password" class="error-msg">{{
                errors.password
              }}</span>
            </div>
            <UiButton type="submit" block radius="lg">Войти</UiButton>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { LoginFormSchema, type LoginFormData } from "@/schemas/login";
import { useValidation } from "@/composables/useValidate";

const show = ref<boolean>(false);
const target = useTemplateRef<HTMLElement>("target");
const linkTarget = useTemplateRef<HTMLElement>("linkTarget");

const closeDropdown = (): void => {
  show.value = false;
};

onClickOutside(target, () => closeDropdown(), {
  ignore: [linkTarget],
});

const isPasswordVisible = ref(false);

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const form = ref<LoginFormData>({
  email: "",
  password: "",
});

const { errors, isValid, validate } = useValidation(form, LoginFormSchema);

const handleSubmit = () => {
  console.log("Данные формы:", { ...form });
  if (validate()) {
    console.log("Данные формы:", { ...form });
  } else {
    console.log("Форма содержит ошибки");
  }
};
</script>

<style lang="scss">
.header__bottom-profile {
  display: flex;
  align-items: center;
}
.ui-header-profile {
  position: relative;
  &__button {
    padding: 6px 12px;
    height: 40px;
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 12px;
    box-sizing: border-box;
    &:hover,
    &.active {
      background: #ffd461;
    }
  }
  &__icon {
    display: flex;
    width: 26px;
    height: 26px;
    .iconify {
      width: 26px;
      height: 26px;
    }
  }
}
</style>
