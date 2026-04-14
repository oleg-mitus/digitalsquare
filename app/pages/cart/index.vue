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
                        <div class="cart__item-price_current">2010 ₽</div>
                        <div class="cart__item-price_row">
                          <div class="cart__item-price_old">2010 ₽</div>
                          <div class="text-green">3%</div>
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
                      </div>
                    </div>
                    <div class="cart__item-buttons">
                      <UiButton
                        icon="my-icon:icon-trash"
                        iconOnly
                        variant="grey"
                      />
                      <UiButton
                        icon="my-icon:icon-heart"
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
const checkedItems = ref<Number[]>([]);
const count = ref<Number>(1);
</script>

<style lang="scss" scoped>
.cart {
  margin-bottom: 40px;
  &__wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  &__left {
    flex: 1;
  }
  &__right {
    width: 365px;
    position: relative;
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
  }
  &__info {
    background: #fff;
    border-radius: 16px;
    padding: 10px;
    position: sticky;
    top: calc($headerTopHeight + $headerBottomHeight + 20px);
    &-top {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(#000000, 0.2);
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
    }
    &-more {
      margin-top: 20px;
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
    &-title {
      padding: 20px;
      border-radius: 6px;
      background: $greyColor;
    }
    &-wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 20px;
    }
  }

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    gap: 10px;
    min-height: 176px;
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
    }
    &-info {
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }
    &-buttons {
      display: flex;
      gap: 10px;
    }
    &-title {
      max-width: 420px;
    }
    &-price {
      &_current {
        font-size: 28px;
        font-weight: 500;
      }
      &_old {
        text-decoration: line-through;
      }
      &_row {
        display: flex;
        gap: 10px;
        margin-top: 6px;
        font-size: 20px;
      }
      &_info {
        margin-top: 10px;
        color: $redText;
        border-bottom: 1px dotted $redText;
        text-decoration: none;
        cursor: pointer;
      }
    }
  }
}
</style>
