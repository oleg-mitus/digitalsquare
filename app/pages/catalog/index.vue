<template>
  <div class="products-page">
    <div class="container">
      <div class="page__title">
        <h2>Каталог</h2>
      </div>
      <div class="filters-and-grid">
        <aside class="filters-sidebar">
          <div class="filters-container">
            <div class="filter-section">
              <div class="filter-section__top">
                <h4>Цена ₽</h4>
                <div class="filter-section__clear">
                  <Icon name="my-icon:icon-clear" size="7px" />
                  Сбросить
                </div>
              </div>

              <div class="price-filter">
                <UiPriceSlider
                  v-model="priceData"
                  :min="0"
                  :max="10000"
                  :step="100"
                />
              </div>
            </div>

            <div class="filter-section">
              <div class="filter-section__top">
                <h4>Бренды</h4>
                <div class="filter-section__clear">
                  <Icon name="my-icon:icon-clear" size="7px" />
                  Сбросить
                </div>
              </div>
              <div
                class="checkbox-group"
                v-for="brand in brands"
                :key="brand.id"
              >
                <UiCheckbox
                  v-model="selectedBrands"
                  @change="applyFilters"
                  :value="brand.id"
                  color="orange"
                  >{{ brand.name }}</UiCheckbox
                >
                <div class="checkbox-group__counter">
                  <span>99</span>
                </div>
              </div>
              <button
                v-if="brands.length > 6"
                @click="showMoreBrands"
                class="show-more-btn"
              >
                {{ showAllBrands ? "Скрыть" : "Показать ещё" }}
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
                {{ showAllCategories ? "Скрыть" : "Показать ещё" }}
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
                {{ showAllColors ? "Скрыть" : "Показать ещё" }}
              </button>
            </div>
          </div>
        </aside>

        <main class="products-grid">
          <div class="page__title">
            <h1>Картриджи</h1>
            <span>1000 товаров</span>
          </div>
          <div class="page__breadcrumbs">
            <Breadcrumbs
              :items="[
                { text: 'Главная', to: '/' },
                { text: 'Каталог', to: '/catalog/' },
                {
                  text: 'Картриджи',
                },
              ]"
            />
          </div>
          <div class="catalog-grid">
            <div class="product-cards">
              <CatalogProduct v-for="i in 8" :key="i" />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const priceData = ref<[number, number]>([1000, 7000]);

const brands = reactive([
  { id: 1, name: "Brother" },
  { id: 2, name: "Brother" },
  { id: 3, name: "Brother" },
  { id: 4, name: "Brother" },
  { id: 5, name: "Brother" },
  { id: 6, name: "Brother" },
  { id: 7, name: "Brother" },
  { id: 8, name: "Brother" },
]);

const categories = reactive([
  { id: 1, name: "Фотобарабан" },
  { id: 2, name: "Фотобарабан" },
  { id: 3, name: "Фотобарабан" },
  { id: 4, name: "Фотобарабан" },
  { id: 5, name: "Фотобарабан" },
  { id: 6, name: "Фотобарабан" },
  { id: 7, name: "Фотобарабан" },
  { id: 8, name: "Фотобарабан" },
]);

const colors = reactive([
  { id: 1, name: "Чёрный" },
  { id: 2, name: "Белый" },
  { id: 3, name: "Красный" },
  { id: 4, name: "Синий" },
  { id: 5, name: "Зелёный" },
  { id: 6, name: "Серый" },
  { id: 7, name: "Жёлтый" },
  { id: 8, name: "Розовый" },
]);

const priceRange = reactive({ min: 0, max: 10000 });
const selectedBrands = ref<string[]>([]);
const selectedCategories = ref<string[]>([]);
const selectedColors = ref<string[]>([]);

const showAllBrands = ref(false);
const showAllCategories = ref(false);
const showAllColors = ref(false);

const visibleBrands = computed(() =>
  showAllBrands.value ? brands : brands.slice(0, 6),
);

const visibleCategories = computed(() =>
  showAllCategories.value ? categories : categories.slice(0, 6),
);

const visibleColors = computed(() =>
  showAllColors.value ? colors : colors.slice(0, 6),
);

const showMoreBrands = () => {
  showAllBrands.value = !showAllBrands.value;
};

const showMoreCategories = () => {
  showAllCategories.value = !showAllCategories.value;
};

const showMoreColors = () => {
  showAllColors.value = !showAllColors.value;
};

const updatePriceFilter = () => {
  if (priceRange.min > priceRange.max) {
    priceRange.min = priceRange.max;
  }
  applyFilters();
};

const applyFilters = () => {
  // Здесь можно добавить логику для отправки фильтров на сервер
  // или обновления URL с параметрами фильтров
};
</script>

<style scoped lang="scss">
.filters-and-grid {
  display: grid;
  grid-template-columns: 365px 1fr;
  gap: 30px;
}

.filters-sidebar {
  position: sticky;
  top: 150px;
  height: calc(100dvh - 140px);
}

.filter-section {
  margin-bottom: 25px;
  border-radius: 10px;
  background: #ffffff;
  padding: 12px;
  &__top {
    display: flex;
    justify-content: space-between;
    gap: 10px;

    align-items: center;
  }
  h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 10px 0;
  }
  &__clear {
    display: flex;
    align-items: center;
    gap: 6px;
    color: rgba(#333333, 0.5);
    font-size: 14px;
    transition: color 0.2s ease-in;
    cursor: pointer;
    &:hover {
      color: $blackColor;
    }
  }
}

.checkbox-group {
  display: flex;
  gap: 10px;
  height: 45px;
  align-items: center;
  justify-content: space-between;
  &__counter {
    display: flex;
    align-items: center;
    span {
      color: rgba($greyText, 0.5);
      border: 1px solid rgba($greyText, 0.2);
      border-radius: 100px;
      padding: 0px 10px;
      font-size: 14px;
      line-height: 20px;
    }
  }
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

.products-grid {
  min-width: 0;
  .page__title {
    margin: 0;
    margin-bottom: 16px;
    display: flex;
    align-items: baseline;
    gap: 20px;
    span {
      color: $greyText;
    }
  }
}

.grid-header {
  margin-bottom: 20px;
}

.grid-header h2 {
  margin-top: 0;
  color: #333;
}

.product-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
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
