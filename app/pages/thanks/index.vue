<template>
  <div class="c-thanks">
    <div class="c-thanks__wrapper">
      <div class="c-thanks__main">
        <div class="c-thanks__top">
          <div class="c-thanks__top-title">Спасибо за покупку</div>
          <div class="c-thanks__top-desc">
            Ваш заказ <span>№12345</span> успешно оформлен
          </div>
        </div>
        <div class="c-thanks__content">
          <div class="c-thanks__item">
            <div class="c-thanks__item-row">
              Дата заказа: <span class="bold">16 декабря 2025</span>
            </div>
            <div class="c-thanks__item-row">
              Статус: <span class="color-green">Оплачен</span>
            </div>
            <div class="c-thanks__item-row">
              <span class="bold">Итого: 2999</span>
            </div>
          </div>
          <div class="c-thanks__item">
            <div class="c-thanks__item-row c-thanks__item-row--icon">
              <Icon name="ds:icon-cart" size="20px" />
              <span>Товар в заказе:</span>
            </div>
            <div class="c-thanks__item-row">
              Картридж СF259XL для HP LJ Pro M304, LJ Pro M404 - 1шт х 2999 ₽
            </div>
          </div>
          <div class="c-thanks__item">
            <div class="c-thanks__item-row c-thanks__item-row--icon">
              <Icon name="ds:icon-phone" size="20px" />
              <span>Поддержка: <span class="bold">support@shop.ru</span></span>
            </div>
            <div class="c-thanks__item-row c-thanks__item-row--icon">
              <Icon name="ds:icon-mail" size="20px" />
              <span
                >Письмо с чеком отправлено на
                <span class="bold">email.example.com</span></span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="c-thanks__bottom">
        <div class="c-thanks__bottom-action">
          <UiButton block href="/profile">Перейти в личный кабинет</UiButton>
        </div>
        <div class="c-thanks__bottom-action">
          <UiButton block href="/profile" variant="transparent"
            >Вернуться на главную</UiButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.c-thanks {
  display: flex;
  align-items: center;
  justify-content: center;
  @include respond-to("lg") {
    padding: 130px 0;
  }
  &__wrapper {
    width: 100%;
    max-width: 647px;
    background: #fff;
    justify-content: space-between;
    padding: 10px;
    display: flex;
    gap: 30px;
    flex-direction: column;
    @include respond-to("lg") {
      padding: 20px;
      justify-content: flex-start;
      border-radius: 10px;
    }
  }
  &__main {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 10px;
    @include respond-to("lg") {
      gap: 30px;
      padding: 0;
    }
  }
  &__top {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 10px;
    @include respond-to("lg") {
      gap: 10px;
    }
    &-title {
      font-size: 20px;
      font-weight: 500;
      @include respond-to("lg") {
        font-size: 36px;
      }
      @include respond-to("2xl") {
        font-size: 45px;
      }
    }
    &-desc {
      font-size: 16px;
      span {
        font-weight: 500;
      }
    }
  }
  &__content {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
  &__item {
    display: flex;
    flex-direction: column;
    gap: 12px;
    background-color: #f5f7fa;
    border-radius: 10px;
    padding: 10px;
    .bold {
      font-weight: 500;
    }
    .color-green {
      color: #367400;
    }
    &-row {
      &--icon {
        display: flex;
        align-items: flex-start;
        gap: 6px;
      }
    }
  }
  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
}
</style>
