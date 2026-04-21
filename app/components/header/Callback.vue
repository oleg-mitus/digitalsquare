<template>
  <div
    class="h-callback h-icon"
    @click="show = !show"
    :class="{ active: show }"
    ref="linkTarget"
  >
    <Icon name="ds:icon-phone" class="h-cart__icon" />
    <Transition name="fade-in">
      <div class="h-drop" v-if="show" ref="target">
        <div class="h-drop__top">
          <div class="h-drop__top-title">Возникли вопросы?</div>
        </div>
        <div class="h-drop__content">
          <div class="h-callback__content">
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

              <UiButton type="submit" block radius="lg">Заказать звонок</UiButton>
            </form>
            <div class="callback-info">
              <p>Пишите</p>
              <UiButton
                type="outline"
                block
                icon="ds:icon-ds"
                variant="vk"
                radius="lg"
                >VK Мессенджер</UiButton
              >
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
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

const form = reactive({
  phone: "",
});

const handleSubmit = () => {
  console.log("Данные формы:", { ...form });
};
</script>

<style lang="scss" scoped>
.h-callback {
  position: relative;
}
</style>
