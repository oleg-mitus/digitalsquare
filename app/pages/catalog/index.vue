<!-- ProductsPage.vue -->
<template>
  <div class="products-page">
    <div class="container">
      <div class="filters-and-grid">
        <!-- Колонка с фильтрами -->
        <aside class="filters-sidebar">
          <div class="filters-container">
            <h3>Фильтры</h3>

            <!-- Фильтр по цене -->
            <div class="filter-section">
              <h4>Цена</h4>
              <div class="price-filter">
                <div class="slider-container">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    v-model="priceRange.min"
                    @input="updatePriceFilter"
                    class="price-slider min"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    v-model="priceRange.max"
                    @input="updatePriceFilter"
                    class="price-slider max"
                  />
                </div>
                <div class="price-inputs">
                  <input
                    type="number"
                    v-model="priceRange.min"
                    @input="updatePriceFilter"
                    placeholder="От"
                    class="price-input"
                  />
                  <input
                    type="number"
                    v-model="priceRange.max"
                    @input="updatePriceFilter"
                    placeholder="До"
                    class="price-input"
                  />
                </div>
              </div>
            </div>

            <!-- Фильтр по брендам -->
            <div class="filter-section">
              <h4>Бренды</h4>
              <div class="checkbox-group">
                <label
                  v-for="brand in brands"
                  :key="brand.id"
                  class="checkbox-label"
                >
                  <input
                    type="checkbox"
                    :value="brand.name"
                    v-model="selectedBrands"
                    @change="applyFilters"
                  />
                  {{ brand.name }}
                </label>
              </div>
              <button
                v-if="brands.length > 6"
                @click="showMoreBrands"
                class="show-more-btn"
              >
                {{ showAllBrands ? 'Скрыть' : 'Показать ещё' }}
              </button>
            </div>

            <!-- Фильтр по видам -->
            <div class="filter-section">
              <h4>Виды</h4>
              <div class="checkbox-group">
                <label
                  v-for="category in categories"
                  :key="category.id"
                  class="checkbox-label"
                >
                  <input
                    type="checkbox"
                    :value="category.name"
                    v-model="selectedCategories"
                    @change="applyFilters"
                  />
                  {{ category.name }}
                </label>
              </div>
              <button
                v-if="categories.length > 6"
                @click="showMoreCategories"
                class="show-more-btn"
              >
                {{ showAllCategories ? 'Скрыть' : 'Показать ещё' }}
              </button>
            </div>

            <!-- Фильтр по цветам -->
            <div class="filter-section">
              <h4>Цвета</h4>
              <div class="checkbox-group">
                <label
                  v-for="color in colors"
                  :key="color.id"
                  class="checkbox-label"
                >
                  <input
                    type="checkbox"
                    :value="color.name"
                    v-model="selectedColors"
                    @change="applyFilters"
                  />
                  {{ color.name }}
                </label>
              </div>
              <button
                v-if="colors.length > 6"
                @click="showMoreColors"
                class="show-more-btn"
              >
                {{ showAllColors ? 'Скрыть' : 'Показать ещё' }}
              </button>
            </div>
          </div>
        </aside>

        <!-- Колонка с товарами -->
        <main class="products-grid">
          <div class="grid-header">
            <h2>Товары</h2>
            <p>Найдено {{ filteredProducts.length }} товаров</p>
          </div>
          <div class="product-cards">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="product-card"
            >
              <img
                :src="product.image"
                :alt="product.name"
                class="product-image"
              />
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price">₽{{ product.price }}</p>
              <p class="product-brand">{{ product.brand }}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';

// Данные для фильтров
const brands = reactive([
  { id: 1, name: 'Nike' },
  { id: 2, name: 'Adidas' },
  { id: 3, name: 'Puma' },
  { id: 4, name: 'Reebok' },
  { id: 5, name: 'Under Armour' },
  { id: 6, name: 'New Balance' },
  { id: 7, name: 'Asics' },
  { id: 8, name: 'Skechers' },
]);

const categories = reactive([
  { id: 1, name: 'Кроссовки' },
  { id: 2, name: 'Туфли' },
  { id: 3, name: 'Сандалии' },
  { id: 4, name: 'Ботинки' },
  { id: 5, name: 'Кеды' },
  { id: 6, name: 'Тапочки' },
  { id: 7, name: 'Босоножки' },
  { id: 8, name: 'Сапоги' },
]);

const colors = reactive([
  { id: 1, name: 'Чёрный' },
  { id: 2, name: 'Белый' },
  { id: 3, name: 'Красный' },
  { id: 4, name: 'Синий' },
  { id: 5, name: 'Зелёный' },
  { id: 6, name: 'Серый' },
  { id: 7, name: 'Жёлтый' },
  { id: 8, name: 'Розовый' },
]);

// Состояние фильтров
const priceRange = reactive({ min: 0, max: 10000 });
const selectedBrands = ref<string[]>([]);
const selectedCategories = ref<string[]>([]);
const selectedColors = ref<string[]>([]);

// Видимость дополнительных опций
const showAllBrands = ref(false);
const showAllCategories = ref(false);
const showAllColors = ref(false);

// Товары
const products = reactive([
  {
    id: 1,
    name: 'Кроссовки Nike Air',
    price: 8999,
    brand: 'Nike',
    category: 'Кроссовки',
    color: 'Чёрный',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 2,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 3,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 4,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 5,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 6,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 2,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 2,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 2,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 2,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 2,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 2,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 2,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 2,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 2,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 2,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    id: 2,
    name: 'Кроссовки Adidas Ultraboost',
    price: 12999,
    brand: 'Adidas',
    category: 'Кроссовки',
    color: 'Белый',
    image: 'https://via.placeholder.com/200x150',
  },
  // ... другие товары
]);

// Вычисляемые свойства
const visibleBrands = computed(() =>
  showAllBrands.value ? brands : brands.slice(0, 6),
);

const visibleCategories = computed(() =>
  showAllCategories.value ? categories : categories.slice(0, 6),
);

const visibleColors = computed(() =>
  showAllColors.value ? colors : colors.slice(0, 6),
);

const filteredProducts = computed(() => {
  return products
});

// Методы для показа/скрытия дополнительных опций
const showMoreBrands = () => {
  showAllBrands.value = !showAllBrands.value;
};

const showMoreCategories = () => {
  showAllCategories.value = !showAllCategories.value;
};

const showMoreColors = () => {
  showAllColors.value = !showAllColors.value;
};

// Метод для обновления фильтра по цене
const updatePriceFilter = () => {
  // Нормализация значений: min не должно быть больше max
  if (priceRange.min > priceRange.max) {
    priceRange.min = priceRange.max;
  }
  applyFilters();
};

// Применение фильтров (можно расширить для API-запросов)
const applyFilters = () => {
  // Здесь можно добавить логику для отправки фильтров на сервер
  // или обновления URL с параметрами фильтров
};
</script>

<style scoped>
.products-page {
  font-family: Arial, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filters-and-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
}

/* Стили для sticky-колонки с фильтрами */
.filters-sidebar {
  position: sticky;
  top: 20px;
  height: calc(100vh - 40px);
  overflow-y: auto;
}

.filters-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.filter-section {
  margin-bottom: 25px;
}

.filter-section h4 {
  margin-top: 0;
  color: #333;
  font-size: 16px;
}

/* Стили для слайдера цены */
.price-filter {
  margin-top: 10px;
}

.slider-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.price-slider {
  width: 100%;
}

.price-inputs {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.price-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

/* Стили для чекбоксов */
.checkbox-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
}

.checkbox-label input {
  margin-right: 8px;
}

/* Кнопка «Показать ещё» */
.show-more-btn {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;
  padding: 5px 0;
  width: 100%;
  text-align: left;
}

.show-more-btn:hover {
  text-decoration: underline;
}

/* Основная колонка с товарами */
.products-grid {
  min-width: 0; /* Предотвращает переполнение */
}

.grid-header {
  margin-bottom: 20px;
}

.grid-header h2 {
  margin-top: 0;
  color: #333;
}

/* Сетка товаров — 3 в ряд */
.product-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  background: #fff;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
}

.product-name {
  margin: 10px 0 5px;
  font-size: 16px;
  font-weight: 500;
}

.product-price {
  color: #e44d2e;
  font-weight: bold;
  font-size: 18px;
  margin: 5px 0;
}

.product-brand {
  color: #666;
  font-size: 14px;
  margin: 0;
}

/* Адаптивность */
@media (max-width: 768px) {
  .filters-and-grid {
    grid-template-columns: 1fr;
  }

  .filters-sidebar {
    position: static;
    height: auto;
  }

  .checkbox-group {
    grid-template-columns: 1fr;
  }
}
</style>
