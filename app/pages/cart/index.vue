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
                <UiButton icon="my-icon:icon-share" variant="grey" size="sm"
                  >Поделится</UiButton
                >
                <UiButton icon="my-icon:icon-trash" iconOnly variant="grey" />
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
                          2010 ₽ при покупке от 3х штук
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
                      <UiButton
                        icon="ds:icon-trash"
                        iconOnly
                        variant="grey"
                      />
                      <UiButton
                        icon="ds:icon-heart"
                        iconOnly
                        variant="red"
                      />
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
      <div class="home__blocks-top">
        <div class="home__blocks-title">
          <h3>Подобрали для вас</h3>
        </div>
        <div class="home__blocks-more">
          <NuxtLink to="/catalog">История просмотров</NuxtLink>
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
  @media (max-width: 1024px) {
    background-color: #fff;
    border-radius: 6px;
  }
  &__wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    @media (max-width: 1024px) {
      flex-direction: column;
      gap: 0;
    }
  }
  &__left {
    flex: 1;
  }
  &__right {
    width: 365px;
    position: relative;
    @media (max-width: 1024px) {
      width: 100%;
    }
  }
  &__actions {
    background: #fff;
    border-radius: 16px;
    padding: 20px 12px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-right {
      display: flex;
      gap: 20px;
    }

    @media (max-width: 1024px) {
      display: none;
    }
  }
  &__info {
    background: #fff;
    border-radius: 16px;
    padding: 10px;
    position: sticky;
    top: calc($headerTopHeight + $headerBottomHeight + 20px);
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
      border-bottom: 1px solid rgba(#000000, 0.2);
      @media (max-width: 1024px) {
        border-bottom: none;
        margin-top: 20px;
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
      gap: 20px;
      @media (max-width: 1024px) {
        gap: 12px;
        padding-top: 20px;
      }
    }
    &-more {
      margin-top: 20px;
      @media (max-width: 1024px) {
        display: none;
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
      padding: 20px;
      border-radius: 6px;
      background: $greyColor;
      @media (max-width: 1024px) {
        display: none;
      }
    }
    &-wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 20px;
      @media (max-width: 1024px) {
        gap: 0;
        margin-top: 0;
      }
    }
  }

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    gap: 10px;
    min-height: 176px;
    @media (max-width: 1024px) {
      border-bottom: 1px solid rgba($blackColor, 0.2);
      padding: 20px 0;
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
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
      @media (max-width: 1024px) {
        width: 80px;
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
      @media (max-width: 1024px) {
        order: 1;
        max-width: none;
        font-size: 16px;
      }
    }
    &-prices {
      @media (max-width: 1024px) {
        display: flex;
        gap: 10px;
      }
    }
    &-price {
      @media (max-width: 1024px) {
        order: 0;
      }
      &_current {
        font-size: 28px;
        font-weight: 500;
        @media (max-width: 1024px) {
          font-size: 20px;
        }
      }
      &_old {
        text-decoration: line-through;
        @media (max-width: 1024px) {
          font-size: 14px;
        }
      }
      &_row {
        display: flex;
        gap: 10px;
        margin-top: 6px;
        font-size: 20px;
        @media (max-width: 1024px) {
          font-size: 14px;
        }
      }
      &_info {
        margin-top: 10px;
        color: $redText;
        border-bottom: 1px dotted $redText;
        text-decoration: none;
        cursor: pointer;
        @media (max-width: 1024px) {
          margin-top: 6px;
          display: inline-flex;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
