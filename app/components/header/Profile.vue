<template>
  <div class="ui-header-profile" ref="target">
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
    <Transition name="slide-up">
      <div class="h-drop" v-if="show">
        <div class="h-drop__top">
          <div class="h-drop__top-title">Вход</div>
        </div>
        <div class="h-drop__content">
          <form>
            <div class="ui-field">
              <div class="ui-label">Логин</div>
              <div class="ui-input">
                <input placeholder="Введите ваш логин" />
              </div>
            </div>
            <div class="ui-field">
              <div class="ui-label">Введите ваш пароль</div>
              <div class="ui-input">
                <input placeholder="Логин" />
              </div>
            </div>
            <div class="ui-submit">
              <UiButton type="submit" block>Войти</UiButton>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const show = ref<boolean>(false);
const target = useTemplateRef<HTMLElement>("target");
onClickOutside(target, () => (show.value = false));
</script>

<style lang="scss">
.ui-header-profile {
  position: relative;
  &__button {
    padding: 6px 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 12px;
    &:hover,
    &.active {
      background: #ffd461;
    }
  }
  &__icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__svg {
    width: 26px;
    height: 26px;
  }
  &__drop {
    position: absolute;
    width: 375px;
    right: 0;
    top: calc(100% + 20px);
    background: #fff;
    padding-bottom: 10px;
    border-radius: 0 0 20px 20px;
  }
}

.h-drop {
  position: absolute;
  width: 375px;
  right: 0;
  top: calc(100% + 20px);
  background: #fff;
  padding-bottom: 10px;
  border-radius: 0 0 20px 20px;
  border: 1px solid #fec93b;
  border-top: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ececec;
    padding: 10px 20px;
    gap: 10px;
  }
  &__content {
    padding: 0 10px;
  }
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  //transform: translateY(-80px); /* Element starts 20px lower */
}

/* Ending state for enter, starting state for leave */
.slide-up-enter-to,
.slide-up-leave-from {
  opacity: 1;
  //transform: translateY(0); /* Element ends at its normal position */
}

/* Active state where transition properties are defined */
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}
</style>
