<script setup lang="ts">
import { ref, computed } from "vue";

// Типы данных
type CustomerType = "individual" | "legal";
type PaymentMethod = "card" | "sbp" | "cash";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Состояние
const customerType = ref<CustomerType>("individual");
const promoCode = ref("");
const selectedPayment = ref<PaymentMethod>("card");

const cartItems = ref<CartItem[]>([
  {
    id: 1,
    name: "Смартфон Vision Pro X",
    price: 95000,
    quantity: 1,
    image: "https://placeholder.com",
  },
  {
    id: 2,
    name: "Беспроводные наушники AirTune",
    price: 12500,
    quantity: 2,
    image: "https://placeholder.com",
  },
]);

// Расчеты
const totalItemsPrice = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
);
const discount = ref(5000);
const totalPrice = computed(() => totalItemsPrice.value - discount.value);

const submitOrder = () => {
  console.log("Заказ оформлен", {
    type: customerType.value,
    payment: selectedPayment.value,
    total: totalPrice.value,
  });
};
</script>

<template>
  <div class="checkout">
    <div class="checkout__container">
      <!-- Левая часть: Формы и Корзина -->
      <main class="checkout__main">
        <h1 class="checkout__title">Оформление заказа</h1>

        <!-- Выбор типа лица -->
        <section class="checkout__section card">
          <div class="customer-toggle">
            <button
              :class="['toggle-btn', { active: customerType === 'individual' }]"
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
        <section class="checkout__section card">
          <h2 class="section-title">Способ доставки</h2>
          <div class="delivery-options">
            <label class="option-card">
              <input type="radio" name="delivery" checked />
              <div class="option-content">
                <span>Курьерская доставка</span>
                <small>Завтра, бесплатно</small>
              </div>
            </label>
            <label class="option-card">
              <input type="radio" name="delivery" />
              <div class="option-content">
                <span>Пункт выдачи</span>
                <small>24 апреля, бесплатно</small>
              </div>
            </label>
          </div>
        </section>

        <!-- Корзина -->
        <section class="checkout__section card">
          <h2 class="section-title">Ваш заказ</h2>
          <div class="cart-list">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <img :src="item.image" :alt="item.name" class="cart-item__img" />
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

      <!-- Правая часть: Сайдбар (Sticked) -->
      <aside class="checkout__sidebar">
        <div class="summary-card">
          <div class="summary-section">
            <h3 class="summary-title">Способ оплаты</h3>
            <select v-model="selectedPayment" class="select-field">
              <option value="card">Банковская карта</option>
              <option value="sbp">СБП (скидка 1%)</option>
              <option value="cash">При получении</option>
            </select>
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
              <span>Товары ({{ cartItems.length }})</span>
              <span>{{ totalItemsPrice.toLocaleString() }} ₽</span>
            </div>
            <div class="detail-row discount">
              <span>Скидка</span>
              <span>− {{ discount.toLocaleString() }} ₽</span>
            </div>
            <div class="detail-row total">
              <span>Итого</span>
              <span>{{ totalPrice.toLocaleString() }} ₽</span>
            </div>
          </div>

          <button class="btn-submit" @click="submitOrder">
            Оформить заказ
          </button>

          <p class="terms">
            Нажимая «Оформить», вы подтверждаете согласие с условиями оферты.
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$primary-color: #0071e3;
$bg-color: #f5f5f7;
$border-radius: 12px;

.checkout {
  background-color: $bg-color;
  min-height: 100vh;
  padding: 40px 20px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 30px;
    align-items: flex-start;
  }

  &__main {
    flex: 1;
  }

  &__title {
    margin-bottom: 24px;
    font-size: 32px;
    font-weight: 600;
  }

  &__section {
    margin-bottom: 20px;
    padding: 24px;
  }

  &__sidebar {
    width: 365px;
    position: sticky;
    top: 20px; // Отступ от верха при скролле
  }
}

.card {
  background: #fff;
  border-radius: $border-radius;
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

// Стили инпутов
.input-field,
.select-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: $primary-color;
  }
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
  border-radius: $border-radius;
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

.btn-submit {
  width: 100%;
  background: $primary-color;
  color: #fff;
  border: none;
  padding: 16px;
  border-radius: $border-radius;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
}

.terms {
  font-size: 12px;
  color: #86868b;
  text-align: center;
  margin-top: 16px;
  line-height: 1.4;
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
