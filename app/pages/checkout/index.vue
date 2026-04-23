<script setup lang="ts">
type CustomerType = "individual" | "legal";
type PaymentMethod = "cash" | "card" | "non-cash";
type DeliveryMethod = "pickup-point" | "courier" | "courier-click";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const customerType = ref<CustomerType>("individual");
const promoCode = ref("");
const selectedPayment = ref<PaymentMethod>("card");
const selectedDelivery = ref<DeliveryMethod>("pickup-point");
const showModal = ref<boolean>(false);

const tabs = [
  { id: "individual", label: "Физ. лицо" },
  { id: "legal", label: "Юр. лицо" },
];

const customerForm = reactive({
  name: "",
  email: "",
  phone: "",
  comment: "",
});

const changePayment = (payment: PaymentMethod): void => {
  selectedPayment.value = payment;
};

const changeDelivery = (delivery: DeliveryMethod): void => {
  selectedDelivery.value = delivery;
};

const submitOrder = () => {
  console.log("Заказ оформлен", {
    type: customerType.value,
    payment: selectedPayment.value,
    promo: promoCode.value,
  });
};

const applyPromocode = () => {
  console.log("promo");
};
</script>

<template>
  <div class="page container">
    <div class="page__title">
      <h1>Оформление</h1>
    </div>
    <div class="page__content">
      <div class="checkout">
        <div class="checkout__container">
          <main class="checkout__main">
            <section class="checkout__section card card--scroll">
              <!-- delivery -->
              <div class="checkout__delivery">
                <div class="checkout__delivery-item">
                  <div
                    class="checkout-delivery"
                    @click="changeDelivery('pickup-point')"
                    :class="{ checked: selectedDelivery === 'pickup-point' }"
                  >
                    <div class="checkout-delivery__title">Пункт выдачи</div>
                    <div class="checkout-delivery__desc">
                      с 15 января бесплатно
                    </div>
                  </div>
                </div>
                <div class="checkout__delivery-item">
                  <div
                    class="checkout-delivery"
                    @click="changeDelivery('courier')"
                    :class="{ checked: selectedDelivery == 'courier' }"
                  >
                    <div class="checkout-delivery__title">Курьером</div>
                    <div class="checkout-delivery__desc highlight-color">
                      При заказе от 600 ₽
                    </div>
                  </div>
                </div>
                <div class="checkout__delivery-item">
                  <div class="checkout-delivery disabled">
                    <div class="checkout-delivery__title">
                      По клику курьером, за 15-30 мин
                    </div>
                    <div class="checkout-delivery__desc">Недоступно</div>
                  </div>
                </div>
              </div>

              <!-- detail delivery and reciever info  -->
              <div class="checkout__data">
                <div class="checkout__data-item" @click="showModal = true">
                  <div class="checkout__data-info">
                    <div class="checkout__data-title">Пункт выдачи</div>
                    <div class="checkout__data-desc">
                      г. Санкт-Петербург, ул. Кантемировская, 39
                    </div>
                  </div>
                  <div class="checkout__data-arrow">
                    <Icon name="ds:icon-caret" size="8px" />
                  </div>
                </div>
                <div class="checkout__data-item">
                  <div class="checkout__data-info">
                    <div class="checkout__data-title">Получатель</div>
                    <div class="checkout__data-desc">
                      Петр Семенович +7 (342) 981-32-11
                    </div>
                  </div>
                  <div class="checkout__data-arrow">
                    <Icon name="ds:icon-caret" size="8px" />
                  </div>
                </div>
              </div>
            </section>

            <!-- delivery summary -->
            <section class="checkout__section card">
              <div class="checkout__info">
                <div class="checkout__info-title">29 янв -1 фев, в ПВЗ</div>
                <div class="checkout__info-desc">
                  <span>Пункт выдачи</span>
                  <span class="checkout__info-desc_sep"></span>
                  <span>400 гр</span>
                  <span class="checkout__info-desc_sep"></span>
                  <span>0 ₽</span>
                </div>
              </div>
            </section>

            <!-- cart -->
            <section class="checkout__section card checkout__section--cart">
              <div class="checkout__cart">
                <div class="checkout__cart-item">
                  <div class="checkout__cart-image">
                    <NuxtImg src="/images/product.jpg" alt="Product" />
                  </div>

                  <div class="checkout__cart-info">
                    <div class="checkout__cart-name">
                      Картридж СF259XL для HP LJ Pro M304, LJ Pro M404
                    </div>
                    <div class="checkout__cart-row">
                      <div class="checkout__cart-price">2010 ₽</div>
                      <div class="checkout__cart-old">2010 ₽</div>
                      <div class="checkout__cart-discount">3%</div>
                    </div>
                    <div class="checkout__cart-desc">
                      <span>2010 ₽ при покупке от 3х штук</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- customer form -->
            <section class="checkout__section card card--customer">
              <UiTabs v-model="customerType" :items="tabs">
                <template #individual>
                  <div class="checkout-form">
                    <div class="checkout-form__group">
                      <input
                        type="text"
                        class="input-field"
                        v-model="customerForm.name"
                        id="name"
                      />
                      <label
                        v-if="!customerForm.name"
                        for="name"
                        class="fake-placeholder"
                      >
                        Контактное лицо<span class="required">*</span>
                      </label>
                    </div>
                    <div class="checkout-form__group">
                      <input
                        type="text"
                        class="input-field"
                        v-model="customerForm.phone"
                      />
                      <label
                        v-if="!customerForm.phone"
                        for="phone"
                        class="fake-placeholder"
                      >
                        Телефон<span class="required">*</span>
                      </label>
                    </div>
                    <div class="checkout-form__group">
                      <input
                        type="text"
                        class="input-field"
                        v-model="customerForm.email"
                      />
                      <label
                        v-if="!customerForm.email"
                        for="email"
                        class="fake-placeholder"
                      >
                        Электронная почта<span class="required">*</span>
                      </label>
                    </div>
                    <div class="checkout-form__group">
                      <input
                        type="text"
                        class="input-field"
                        v-model="customerForm.comment"
                      />
                      <label
                        v-if="!customerForm.comment"
                        for="email"
                        class="fake-placeholder"
                      >
                        Комментарий
                      </label>
                    </div>
                  </div>
                </template>
                <template #legal>
                  <div class="checkout-form">
                    <div class="checkout-form__group">
                      <input
                        type="text"
                        class="input-field"
                        v-model="customerForm.name"
                        id="name"
                      />
                      <label
                        v-if="!customerForm.name"
                        for="name"
                        class="fake-placeholder"
                      >
                        Контактное лицо<span class="required">*</span>
                      </label>
                    </div>
                    <div class="checkout-form__group">
                      <input
                        type="text"
                        class="input-field"
                        v-model="customerForm.phone"
                      />
                      <label
                        v-if="!customerForm.phone"
                        for="phone"
                        class="fake-placeholder"
                      >
                        Телефон<span class="required">*</span>
                      </label>
                    </div>
                    <div class="checkout-form__group">
                      <input
                        type="text"
                        class="input-field"
                        v-model="customerForm.email"
                      />
                      <label
                        v-if="!customerForm.email"
                        for="email"
                        class="fake-placeholder"
                      >
                        Электронная почта<span class="required">*</span>
                      </label>
                    </div>
                    <div class="checkout-form__group">
                      <input
                        type="text"
                        class="input-field"
                        v-model="customerForm.comment"
                      />
                      <label
                        v-if="!customerForm.comment"
                        for="email"
                        class="fake-placeholder"
                      >
                        Комментарий
                      </label>
                    </div>
                  </div>
                </template>
              </UiTabs>
            </section>
          </main>

          <!-- sidebar -->
          <aside class="checkout__sidebar">
            <div class="checkout__sidebar-card card">
              <!-- payment methods -->
              <div class="checkout__payment">
                <div
                  class="checkout__payment-item"
                  :class="{ checked: selectedPayment === 'cash' }"
                  @click="changePayment('cash')"
                >
                  <div class="checkout__payment-icon">
                    <Icon name="ds:icon-payment-cash" size="20px" />
                  </div>
                  <div class="checkout__payment-title">
                    Наличными<br />при получении
                  </div>
                </div>
                <div
                  class="checkout__payment-item"
                  :class="{ checked: selectedPayment === 'card' }"
                  @click="changePayment('card')"
                >
                  <div class="checkout__payment-icon">
                    <Icon name="ds:icon-payment-card" size="20px" />
                  </div>
                  <div class="checkout__payment-title">
                    Банковской<br />картой
                  </div>
                </div>
                <div
                  class="checkout__payment-item"
                  :class="{ checked: selectedPayment === 'non-cash' }"
                  @click="changePayment('non-cash')"
                >
                  <div class="checkout__payment-icon">
                    <Icon name="ds:icon-payment-legal" size="20px" />
                  </div>
                  <div class="checkout__payment-title">
                    Безналичный<br />расчет
                  </div>
                </div>
              </div>
              <!-- order summary -->
              <div class="checkout__summary">
                <div class="checkout__summary-row">
                  <span class="checkout__summary-title">1 товар</span>
                  <span class="checkout__summary-value">2000 ₽</span>
                </div>
                <div class="checkout__summary-row">
                  <span class="checkout__summary-title">Скидка</span>
                  <span class="checkout__summary-value discount-value"
                    >-10 ₽</span
                  >
                </div>
                <div class="checkout__summary-row">
                  <span class="checkout__summary-title"
                    >Доставка и сервисы</span
                  >
                  <span class="checkout__summary-value">0 ₽</span>
                </div>
                <!-- promo -->
                <div class="checkout__promo">
                  <form
                    @submit.prevent="applyPromocode"
                    class="checkout__promo-form"
                  >
                    <div class="checkout__promo-wrapper">
                      <input
                        v-model="promoCode"
                        type="text"
                        placeholder="Промокод"
                        class="checkout__promo-input"
                      />
                      <Transition name="fade-in">
                        <button
                          type="submit"
                          class="checkout__promo-submit"
                          v-if="promoCode"
                        >
                          <Icon name="ds:icon-arrow-left" size="16px" />
                        </button>
                      </Transition>
                    </div>
                  </form>
                </div>
                <!-- total -->
                <div class="checkout__summary-row">
                  <span class="checkout__summary-title">Итого</span>
                  <span class="checkout__summary-value total-value"
                    >2010 ₽</span
                  >
                </div>
              </div>
            </div>
            <!-- submit button block -->
            <div class="checkout__order">
              <UiButton block @click="submitOrder" radius="lg">
                Оформить заказ
              </UiButton>
            </div>
          </aside>
        </div>
      </div>
      <div class="catalog-products">
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
  </div>
  <UiModal :isOpen="showModal" @close="showModal = false">
    <template #header>
      <h3>Адрес доставки</h3>
    </template>

    <div class="checkout__address">
      <div class="checkout__address-item">
        <div class="address-item">
          <div class="address-item__check">
            
          </div>
          <div class="address-item__content">
            <div class="address-item__title"></div>
            <div class="address-item__address"></div>
            <div class="address-item__info"></div>
            <div class="address-item__accessibility"></div>
          </div>
          <div class="address-item__actions"></div>
        </div>
      </div>
    </div>
  </UiModal>
</template>

<style lang="scss" scoped>
.checkout {
  margin-bottom: 40px;
  &__container {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  &__main {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__section {
    margin-bottom: 10px;
    &--cart {
      @media (max-width: 1023px) {
        order: -1;
      }
    }
  }

  &__sidebar {
    width: 365px;
    position: sticky;
    top: 150px;
    bottom: 0;
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
}

.card {
  background: #fff;
  border-radius: 16px;
  padding: 10px;
  @media (max-width: 768px) {
    background: transparent;
    padding: 0;
    border-radius: 0;
  }
  &--customer {
    max-width: 458px;
    @media (max-width: 768px) {
      max-width: none;
      margin-top: 20px;
    }
  }
  &--scroll {
    @media (max-width: 768px) {
      margin: 0 -10px;
    }
  }
}

.checkout__payment {
  display: flex;
  justify-content: space-between;
  gap: 4px;
  &-item {
    border-radius: 6px;
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: space-between;
    border: 1px solid rgba($blackColor, 0.5);
    cursor: pointer;
    flex: 1;
    min-height: 72px;
    transition: border-color 0.2s ease-in;
    &:hover,
    &.checked {
      border-color: $secondaryColor;
    }
  }
  &-title {
    font-size: 12px;
    line-height: 120%;
  }
}

.checkout__delivery {
  gap: 10px;
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    overflow-x: auto;
    /*scroll-snap-type: x mandatory;*/
    gap: 4px;
    padding: 0 10px 12px 10px;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  &-item {
    flex: 1;
    display: flex;
    @media (max-width: 768px) {
      flex: 0 0 50%;
      min-width: 50%;
      scroll-snap-align: start;
    }
  }
}

.checkout-delivery {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  padding: 10px;
  gap: 20px;
  border: 1px solid $greyColor;
  background-color: $greyColor;
  transition: border-color 0.2s ease-in;
  cursor: pointer;
  min-height: 124px;
  flex: 1;
  @media (max-width: 768px) {
    border-color: $whiteColor;
    background-color: $whiteColor;
    border-radius: 6px;
  }
  &__title {
    font-size: 18px;
    color: $greyText;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
  &__desc {
    color: $greyText;
    @media (max-width: 768px) {
      font-size: 12px;
    }
    &.highlight-color {
      color: $secondaryColor;
    }
  }
  &:hover:not(.disabled) {
    border-color: $secondaryColor;
  }
  &.checked {
    border-color: $secondaryColor;
    .checkout-delivery__title {
      color: $blackColor;
      font-weight: 500;
    }
    .checkout-delivery__desc:not(.highlight-color) {
      color: $blackColor;
    }
  }
  &.disabled {
    cursor: not-allowed;
  }
}

.checkout__data {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  @media (max-width: 768px) {
    margin-top: 0px;
    flex-direction: column;
    padding: 0 10px;
    gap: 0;
  }
  &-item {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid $borderColor;
    cursor: pointer;
  }
  &-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    @media (max-width: 768px) {
      gap: 0;
    }
  }
  &-title {
    font-size: 14px;
    color: $greyText;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  &-desc {
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
  &-arrow {
    color: $secondaryColor;
    transform: rotate(-90deg);
    display: flex;
    align-items: center;
    span {
      @media (max-width: 768px) {
        font-size: 6px;
      }
    }
  }
}

.checkout__info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 768px) {
    display: none;
  }
  &-title {
    font-weight: 500;
  }
  &-desc {
    display: flex;
    gap: 10px;
    align-items: center;
    &_sep {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: $blackColor;
    }
  }
}

.checkout__summary {
  margin-top: 20px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .checkout__summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .checkout__summary-title {
    font-size: 16px;
    font-weight: 500;
  }
  .checkout__summary-value {
    font-size: 16px;
    &.discount-value {
      color: $redText;
    }
    &.total-value {
      font-size: 20px;
      font-weight: 500;
    }
  }
}

.checkout__promo {
  position: relative;
  margin-bottom: 10px;
  &-input {
    height: 44px;
    width: 100%;
    background-color: transparent;
    border: none;
    border-radius: 0;
    padding-right: 54px;
    font-size: 16px;
    outline: none;
    border-bottom: 1px solid $borderColor;
  }
  &-submit {
    position: absolute;
    right: 0;
    top: 10px;
    bottom: 10px;
    width: 24px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $secondaryColor;
  }
}

.checkout__cart {
  &-item {
    display: flex;
    @media (max-width: 1023px) {
      gap: 10px;
    }
  }
  &-image {
    padding: 10px;
    width: 136px;
    height: 150px;
    @media (max-width: 1023px) {
      width: 80px;
      height: 100px;
      background-color: $whiteColor;
      border-radius: 6px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 10px;
    gap: 20px;
    @media (max-width: 1023px) {
      gap: 4px;
    }
  }
  &-name {
    font-size: 24px;
    font-weight: 500;
    max-width: 445px;
    line-height: 130%;
    @media (max-width: 1023px) {
      font-size: 16px;
    }
  }
  &-row {
    display: flex;
    align-items: baseline;
  }
  &-price {
    font-size: 28px;
    font-weight: 500;
    @media (max-width: 1023px) {
      font-size: 20px;
    }
  }
  &-old {
    margin-left: 6px;
    font-size: 20px;
    text-decoration: line-through;
    @media (max-width: 1023px) {
      font-size: 14px;
    }
  }
  &-discount {
    margin-left: 10px;
    color: $greenText;
    @media (max-width: 1023px) {
      font-size: 14px;
    }
  }
  &-desc {
    span {
      color: $redText;
      border-bottom: 1px dotted $redText;
      cursor: pointer;
      @media (max-width: 1023px) {
        font-size: 12px;
      }
    }
  }
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 4px;
  &__group {
    position: relative;
  }
  .input-field {
    outline: none;
    width: 100%;
    height: 50px;
    background-color: $greyColor;
    border-radius: 6px;
    border: 1px solid $greyColor;
    padding: 10px 20px;
    font-size: 14px;
    @media (max-width: 768px) {
      background-color: $whiteColor;
    }
  }
  .fake-placeholder {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #999;
    font-size: 14px;

    .required {
      color: $redText;
      margin-left: 2px;
    }
  }
}

@media (max-width: 1023px) {
  .checkout__container {
    flex-direction: column;
  }

  .checkout__sidebar {
    width: 100%;
    position: static;
  }
}
</style>
