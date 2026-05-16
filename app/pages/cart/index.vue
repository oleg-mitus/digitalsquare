<template>
  <div class="page container">
    <div class="page__title page__title--desc">
      <h1>Корзина</h1>
      <span>3 товара</span>
    </div>
    <div class="page__content">
      <div class="cart">
        <div class="cart__wrapper">
          <div class="cart__left">
            <div class="cart__actions">
              <div class="cart__actions-left">
                <UiCheckbox v-model="isShowAll">Выбрать все</UiCheckbox>
              </div>
              <div class="cart__actions-right">
                <UiButton icon="ds:icon-share" variant="grey" size="sm"
                  >Поделится</UiButton
                >
                <UiButton icon="ds:icon-trash" iconOnly variant="grey" />
              </div>
            </div>
            <div class="cart__list">
              <div class="cart__list-title text-lg text-bold">
                Доступные для заказа
              </div>
              <div class="cart__list-wrapper">
                <div class="cart__item" v-for="i in 20" :key="i">
                  <div class="cart__item-left">
                    <div class="cart__item-image">
                      <NuxtImg src="/images/product.jpg" alt="Product" />
                    </div>
                    <div class="cart__item-check">
                      <UiCheckbox
                        v-model="checkedItems"
                        :value="i"
                      ></UiCheckbox>
                    </div>
                  </div>
                  <div class="cart__item-right">
                    <div class="cart__item-info">
                      <div class="cart__item-title text-lg">
                        Картридж СF259XL для HP LJ Pro M304, LJ Pro M404
                      </div>
                      <div class="cart__item-price">
                        <div class="cart__item-prices">
                          <div class="cart__item-price_current">2010 ₽</div>
                          <div class="cart__item-price_row">
                            <div class="cart__item-price_old">2010 ₽</div>
                            <div class="text-green">3%</div>
                          </div>
                        </div>
                        <div class="cart__item-price_info">
                          <span>2010 ₽ при покупке от 3х штук</span>
                        </div>
                      </div>
                      <div class="cart__item-quantity">
                        <UiCounter
                          v-model="count"
                          :min="1"
                          :max="10"
                          :step="1"
                        />
                        <div class="cart__item-quantity_buttons">
                          <UiButton
                            icon="ds:icon-heart"
                            iconOnly
                            variant="red"
                          />
                          <UiButton
                            icon="ds:icon-trash"
                            iconOnly
                            variant="grey"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="cart__item-buttons">
                      <UiButton icon="ds:icon-trash" iconOnly variant="grey" />
                      <UiButton icon="ds:icon-heart" iconOnly variant="red" />
                      <UiButton size="sm" variant="grey">Купить</UiButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cart__right">
            <div class="cart__info">
              <div class="cart__info-top">
                <div class="cart__info-submit">
                  <UiButton href="/checkout" block
                    >Перейти к оформлению</UiButton
                  >
                </div>
                <div class="cart__info-desc">
                  Доступные способы и время доставки можно выбрать при
                  оформлении заказа
                </div>
              </div>
              <div class="cart__info-bottom">
                <div class="cart__info-row">
                  <div class="cart__info-row_title text-bold text-lg">
                    Ваша корзина
                  </div>
                  <div class="cart__info-row_value text-grey">3 товара</div>
                </div>
                <div class="cart__info-row">
                  <div class="cart__info-row_title">Товары (3)</div>
                  <div class="cart__info-row_value text-bold">2010 ₽</div>
                </div>
                <div class="cart__info-row">
                  <div class="cart__info-row_title">Скидка</div>
                  <div class="cart__info-row_value text-bold text-red">
                    -100 ₽
                  </div>
                </div>
              </div>
              <div class="cart__info-more">
                <div class="cart__info-more_link text-blue">Подробнее</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="catalog-products">
    <div class="container">
      <div class="catalog-products__top">
        <div class="catalog-products__title">
          <h3>Подобрали для вас</h3>
        </div>
        <div class="catalog-products__more">
          <NuxtLink to="/catalog">Смотреть все</NuxtLink>
        </div>
      </div>
      <div class="catalog__grid">
        <CatalogProduct v-for="i in 8" :key="i" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isShowAll = ref<boolean>(false);
const checkedItems = ref<number[]>([]);
const count = ref<number>(1);
</script>

<style lang="scss" scoped>
.cart {
  margin-bottom: 40px;
  background-color: #fff;
  border-radius: 6px;
  @include respond-to("lg") {
    background-color: transparent;
    border-radius: none;
  }
  &__wrapper {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 0;
    @include respond-to("lg") {
      flex-direction: row;
      gap: 20px;
    }
  }
  &__left {
    flex: 1;
  }
  &__right {
    width: 100%;
    position: relative;
    @include respond-to("lg") {
      width: 365px;
    }
  }
  &__actions {
    background: #fff;
    border-radius: 16px;
    padding: 12px;
    margin-bottom: 10px;
    display: none;
    align-items: center;
    justify-content: space-between;
    &-right {
      display: flex;
      gap: 20px;
    }
    @include respond-to("lg") {
      display: flex;
    }
    @include respond-to("2xl") {
      padding: 20px 12px;
    }
  }
  &__info {
    background: #fff;
    border-radius: 16px;
    padding: 10px;
    position: sticky;
    top: calc(100px);
    @media (max-width: 1024px) {
      flex-direction: column-reverse;
      display: flex;
      background: transparent;
      border-radius: 0;
      padding: 0 10px;
    }

    &-top {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-bottom: 20px;
      margin-top: 20px;

      @include respond-to("lg") {
        border-bottom: 1px solid rgba(#000000, 0.2);
        margin-top: 0;
      }
    }
    &-desc {
      font-size: 14px;
      color: rgba($blackColor, 0.5);
    }
    &-bottom {
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      @include respond-to("lg") {
        gap: 20px;
      }
    }
    &-more {
      margin-top: 20px;
      display: none;
      @include respond-to("lg") {
        display: block;
      }
    }
    &-row {
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }
  }
  &__list {
    border-radius: 16px;
    background: #fff;
    padding: 10px;
    @media (max-width: 1024px) {
      padding: 0 10px;
    }
    &-title {
      display: none;
      border-radius: 6px;
      background: $greyColor;
      font-size: 16px;
      padding: 12px;
      @include respond-to("lg") {
        display: block;
      }
      @include respond-to("2xl") {
        font-size: 20px;
        padding: 20px;
      }
    }
    &-wrapper {
      display: flex;
      flex-direction: column;

      @include respond-to("lg") {
        gap: 20px;
        margin-top: 20px;
      }
    }
  }

  &__item {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    min-height: 140px;
    border-bottom: 1px solid rgba($blackColor, 0.2);
    padding: 20px 0;
    @include respond-to("lg") {
      border-bottom: none;
      padding: 10px;
    }
    @include respond-to("2xl") {
      min-height: 176px;
    }
    &-left {
      position: relative;
      display: flex;
      align-items: center;
    }
    &-right {
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
      display: flex;
    }
    &-image {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
      @include respond-to("lg") {
        width: 160px;
        padding: 10px;
      }
    }
    &-check {
      position: absolute;
      width: 30px;
      height: 30px;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 1024px) {
        display: none;
      }
    }
    &-info {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      @media (max-width: 1024px) {
        flex-direction: column;
        gap: 6px;
      }
    }
    &-buttons {
      display: flex;
      gap: 10px;
      @media (max-width: 1024px) {
        display: none;
      }
    }
    &-quantity {
      @media (max-width: 1024px) {
        order: 2;
        justify-content: space-between;
        display: flex;
        margin-top: 6px;
      }
      &_buttons {
        display: none;
        gap: 12px;
        align-items: center;
        @media (max-width: 1024px) {
          display: flex;
          .ui-button {
            width: 24px;
            height: 24px;
            padding: 0;
            background: transparent;
          }
        }
      }
    }
    &-title {
      max-width: 420px;
      font-size: 16px;
      order: 1;
      @include respond-to("lg") {
        max-width: 320px;
        font-size: 18px;
        order: 0;
      }
      @include respond-to("2xl") {
        font-size: 20px;
        max-width: 420px;
      }
    }
    &-prices {
      @media (max-width: 1024px) {
        display: flex;
        gap: 4px;
        align-items: baseline;
      }
    }
    &-price {
      @media (max-width: 1024px) {
        order: 0;
      }
      &_current {
        font-size: 20px;
        font-weight: 500;
        @include respond-to("lg") {
          font-size: 24px;
        }
        @include respond-to("2xl") {
          font-size: 28px;
        }
      }
      &_old {
        text-decoration: line-through;
        font-size: 14px;
        @include respond-to("lg") {
          font-size: 18px;
        }
        @include respond-to("2xl") {
          font-size: 20px;
        }
      }
      &_row {
        display: flex;
        gap: 10px;
        margin-top: 6px;
        font-size: 14px;
        @include respond-to("lg") {
          font-size: 18px;
        }
        @include respond-to("2xl") {
          font-size: 20px;
        }
      }
      &_info {
        margin-top: 10px;
        color: $redText;
        text-decoration: none;
        cursor: pointer;
        @media (max-width: 1024px) {
          margin-top: 4px;
          display: inline-flex;
          font-size: 12px;
        }

        span {
          border-bottom: 1px dotted $redText;
          display: inline;
        }
      }
    }
  }
}
</style>
