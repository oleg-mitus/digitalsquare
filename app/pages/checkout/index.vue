<script setup lang="ts">
type CustomerType = 'individual' | 'legal';
type PaymentMethod = 'cash' | 'card' | 'non-cash';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const customerType = ref<CustomerType>('individual');
const promoCode = ref('');
const selectedPayment = ref<PaymentMethod>('card');

const cartItems = ref<CartItem[]>([
  {
    id: 1,
    name: 'Смартфон Vision Pro X',
    price: 95000,
    quantity: 1,
    image: 'https://placeholder.com',
  },
  {
    id: 2,
    name: 'Беспроводные наушники AirTune',
    price: 12500,
    quantity: 2,
    image: 'https://placeholder.com',
  },
]);

// Расчеты
const totalItemsPrice = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
);
const discount = ref(5000);
const totalPrice = computed(() => totalItemsPrice.value - discount.value);

const changePayment = (payment: PaymentMethod): void => {
  selectedPayment.value = payment;
};

const submitOrder = () => {
  console.log('Заказ оформлен', {
    type: customerType.value,
    payment: selectedPayment.value,
    total: totalPrice.value,
  });
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
            <section class="checkout__section card">
              <div class="checkout__delivery">
                <div class="checkout__delivery-item">
                  <div class="checkout-delivery checked">
                    <div class="checkout-delivery__title">Пункт выдачи</div>
                    <div class="checkout-delivery__desc">
                      с 15 января бесплатно
                    </div>
                  </div>
                </div>
                <div class="checkout__delivery-item">
                  <div class="checkout-delivery checked">
                    <div class="checkout-delivery__title">Курьером</div>
                    <div class="checkout-delivery__desc">
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
              <div class="checkout__data">
                <div class="checkout__data-item">
                  <div class="checkout-data checked">
                    <div class="checkout-data__info">
                      <div class="checkout-data__title">Пункт выдачи</div>
                      <div class="checkout-data__desc">
                        г. Санкт-Петербург, ул. Кантемировская, 39
                      </div>
                    </div>
                    <div class="checkout-data__arrrow">
                      <Icon name="ds:icon-caret" />
                    </div>
                  </div>
                  <div class="checkout-data">
                    <div class="checkout-data__info">
                      <div class="checkout-data__title">Получатель</div>
                      <div class="checkout-data__desc">
                        Петр Семенович +7 (342) 981-32-11
                      </div>
                    </div>
                    <div class="checkout-data__arrrow">
                      <Icon name="ds:icon-caret" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class="checkout__section card">
              <div class="checkout-info">
                <div class="checkout-info__title">29 янв -1 фев, в ПВЗ</div>
                <div class="checkout-info__desc">29 янв -1 фев, в ПВЗ</div>
              </div>
            </section>

            <section class="checkout__section card">
              <div class="customer-toggle">
                <button
                  :class="[
                    'toggle-btn',
                    { active: customerType === 'individual' },
                  ]"
                  @click="customerType = 'individual'"
                >
                  Физическое лицо
                </button>
                <button
                  :class="['toggle-btn', { active: customerType === 'legal' }]"
                  @click="customerType = 'legal'"
                >
                  Юридическое лицо
                </button>
              </div>

              <div class="customer-form">
                <input
                  type="text"
                  placeholder="ФИО / Название компании"
                  class="input-field"
                />
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  class="input-field"
                />
                <input
                  v-if="customerType === 'legal'"
                  type="text"
                  placeholder="ИНН организации"
                  class="input-field"
                />
              </div>
            </section>

            <!-- Доставка -->

            <!-- Корзина -->
            <section class="checkout__section card">
              <h2 class="section-title">Ваш заказ</h2>
              <div class="cart-list">
                <div v-for="item in cartItems" :key="item.id" class="cart-item">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="cart-item__img"
                  />
                  <div class="cart-item__info">
                    <p class="cart-item__name">{{ item.name }}</p>
                    <p class="cart-item__qty">{{ item.quantity }} шт.</p>
                  </div>
                  <p class="cart-item__price">
                    {{ (item.price * item.quantity).toLocaleString() }} ₽
                  </p>
                </div>
              </div>
            </section>
          </main>

          <aside class="checkout__sidebar">
            <div class="checkout__sidebar-card card">
              <!-- способы оплаты -->
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
              <div class="summary-details">
                <div class="detail-row">
                  <span>1 товар</span>
                  <span>2000 ₽</span>
                </div>
                <div class="detail-row discount">
                  <span>Скидка</span>
                  <span>-10 ₽</span>
                </div>
                <div class="detail-row total">
                  <span>Доставка и сервисы</span>
                  <span>0 ₽</span>
                </div>
              </div>

              <div class="summary-section">
                <div class="promo-box">
                  <input
                    v-model="promoCode"
                    type="text"
                    placeholder="Промокод"
                    class="input-field"
                  />
                  <button class="btn-apply">Применить</button>
                </div>
              </div>
              <div class="summary-details">
                <div class="detail-row">
                  <span>Итого</span>
                  <span>2010 ₽</span>
                </div>
              </div>
            </div>
            <UiButton block @click="submitOrder"> Оформить заказ </UiButton>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkout {
  min-height: 100vh;

  &__container {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  &__main {
    flex: 1;
  }

  &__section {
    margin-bottom: 20px;
    padding: 24px;
  }

  &__sidebar {
    width: 365px;
    position: sticky;
    top: 150px;
    bottom: 0;
  }
}

.card {
  background: #fff;
  border-radius: 16px;
  padding: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

// Форма выбора лица
.customer-toggle {
  display: flex;
  background: #f0f0f2;
  padding: 4px;
  border-radius: 10px;
  margin-bottom: 20px;

  .toggle-btn {
    flex: 1;
    border: none;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;

    &.active {
      background: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
}

.customer-form {
  display: grid;
  gap: 12px;
}

// Корзина
.cart-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border: 0;
  }

  &__img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
  }

  &__info {
    flex: 1;
  }

  &__name {
    font-weight: 500;
    margin: 0;
  }

  &__qty {
    font-size: 14px;
    color: #86868b;
  }

  &__price {
    font-weight: 600;
  }
}

// Сайдбар
.summary-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  .summary-title {
    font-size: 18px;
    margin-bottom: 16px;
  }

  .summary-section {
    margin-bottom: 24px;
  }
}

.promo-box {
  display: flex;
  gap: 8px;

  .btn-apply {
    background: #f0f0f2;
    border: none;
    padding: 0 15px;
    border-radius: 8px;
    cursor: pointer;
  }
}

.summary-details {
  margin-bottom: 24px;

  .detail-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    color: #1d1d1f;

    &.discount {
      color: #eb5757;
    }

    &.total {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #eee;
      font-size: 20px;
      font-weight: 700;
    }
  }
}

.terms {
  font-size: 12px;
  color: #86868b;
  text-align: center;
  margin-top: 16px;
  line-height: 1.4;
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

// Адаптивность для планшетов
@media (max-width: 992px) {
  .checkout__container {
    flex-direction: column;
  }

  .checkout__sidebar {
    width: 100%;
    position: static;
  }
}
</style>
