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
                  <Icon name="ds:icon-clear" size="7px" />
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
                  <Icon name="ds:icon-clear" size="7px" />
                  Сбросить
                </div>
              </div>
              <div
                class="checkbox-group"
                v-for="brand in visibleBrands"
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
                <Icon
                  name="ds:icon-bottom"
                  size="8px"
                  :style="{ width: '8px', height: '8px' }"
                />
                {{ showAllBrands ? "Скрыть" : "Показать ещё" }}
              </button>
            </div>

            <div class="filter-section">
              <div class="filter-section__top">
                <h4>Виды</h4>
                <div class="filter-section__clear">
                  <Icon name="ds:icon-clear" size="7px" />
                  Сбросить
                </div>
              </div>
              <div
                class="checkbox-group"
                v-for="category in visibleCategories"
                :key="category.id"
              >
                <UiCheckbox
                  v-model="selectedCategories"
                  @change="applyFilters"
                  :value="category.id"
                  color="orange"
                  >{{ category.name }}</UiCheckbox
                >
                <div class="checkbox-group__counter">
                  <span>99</span>
                </div>
              </div>
              <button
                v-if="categories.length > 6"
                @click="showMoreCategories"
                class="show-more-btn"
              >
                <Icon
                  name="ds:icon-bottom"
                  size="8px"
                  :style="{ width: '8px', height: '8px' }"
                />
                {{ showAllCategories ? "Скрыть" : "Показать ещё" }}
              </button>
            </div>

            <div class="filter-section">
              <div class="filter-section__top">
                <h4>Цвета</h4>
                <div class="filter-section__clear">
                  <Icon name="ds:icon-clear" size="7px" />
                  Сбросить
                </div>
              </div>

              <div
                class="checkbox-group"
                v-for="color in visibleColors"
                :key="color.id"
              >
                <UiCheckbox
                  v-model="selectedColors"
                  @change="applyFilters"
                  :value="color.id"
                  color="orange"
                  >{{ color.name }}</UiCheckbox
                >
                <div class="checkbox-group__counter">
                  <span>99</span>
                </div>
              </div>
              <button
                v-if="colors.length > 6"
                @click="showMoreColors"
                class="show-more-btn"
              >
                <Icon
                  name="ds:icon-bottom"
                  size="8px"
                  :style="{ width: '8px', height: '8px' }"
                />
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
          <div class="catalog">
            <div class="catalog-actions">
              <div class="catalog-actions__filter">
                <div class="catalog-actions__filter-item">
                  <button class="catalog-actions__filter-button">
                    <Icon name="ds:icon-sort" size="18px" />
                  </button>
                </div>
                <div class="catalog-actions__filter-item">
                  <button class="catalog-actions__filter-button">
                    <Icon name="ds:icon-filter" size="18px" />
                  </button>
                </div>
                <div class="catalog-actions__filter-item">
                  <UiSelect
                    label="Бренд"
                    multiple
                    v-model="selectedBrands"
                    :options="
                      brands.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))
                    "
                  />
                </div>
                <div class="catalog-actions__filter-item">
                  <UiSelect
                    label="Вид"
                    multiple
                    v-model="selectedCategories"
                    :options="
                      categories.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))
                    "
                  />
                </div>
                <div class="catalog-actions__filter-item">
                  <UiSelect
                    label="Цвет"
                    multiple
                    v-model="selectedColors"
                    :options="
                      colors.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))
                    "
                  />
                </div>
              </div>
              <div class="catalog-actions__sort">
                <UiSelect
                  label="Сортировка"
                  v-model="sortOptionsValue"
                  :options="sortOptions"
                />
              </div>
            </div>
            <div class="catalog-grid">
              <div class="product-cards">
                <CatalogProduct v-for="i in 12" :key="i" />
              </div>
            </div>
            <div class="catalog-pagination">
              <UiPagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :total-items="totalItems"
                :page-size-options="[10, 20, 50, 100]"
                @update:current-page="handleUpdate"
                @update:page-size="handleUpdate"
              />
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

const sortOptions = [
  { label: "По названию", value: "name-asc" },
  { label: "Сначала дешевле", value: "price-asc" },
  { label: "Сначала дороже", value: "price-desc" },
  { label: "По популярности", value: "popular" },
];

const sortOptionsValue = ref("name-asc");

const priceRange = reactive({ min: 0, max: 10000 });
const selectedBrands = ref<string[]>([]);
const selectedCategories = ref<string[]>([]);
const selectedColors = ref<string[]>([]);

const showAllBrands = ref(false);
const showAllCategories = ref(false);
const showAllColors = ref(false);

const totalItems = ref(1000);
const currentPage = ref(1);
const pageSize = ref(9);

const handleUpdate = () => {
  console.log(
    `Загрузка страницы ${currentPage.value} с лимитом ${pageSize.value}`,
  );
};

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

const applyFilters = () => {};
</script>

<style scoped lang="scss">
.filters-and-grid {
  display: grid;
  grid-template-columns: 365px 1fr;
  gap: 30px;
  padding-bottom: 80px;
}

.filters-sidebar {
  position: relative;
}

.filters-content {
  position: sticky;
  top: 150px;
  bottom: 0;
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
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  margin-top: 10px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
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

.filters-container {
  position: sticky;
  top: 150px;
  bottom: 0;
}

.catalog-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
}

.catalog-pagination {
  margin-top: 20px;
}

.catalog-actions__filter {
  display: flex;
  gap: 10px;
}

.catalog-actions__filter-button {
  outline: none;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  &:hover {
    opacity: 0.8;
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
  margin-top: 20px;
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

@media (max-width: 1023px) {
  .filters-and-grid {
    grid-template-columns: 1fr;
  }

  .product-cards {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .filters-sidebar {
    position: fixed;
    height: 100vh;
    padding-top: 56px;
    padding-bottom: 56px;
    overflow-y: scroll;
    z-index: 9;
    background: #fff;
    top: 0;
    left: 0;
    width: 100%;
    transform: translateX(-100%);
    transition: transform 0.2s ease-in;
  }

  .filters-sidebar.is-open {
    transform: translateX(0);
  }

  .checkbox-group {
    grid-template-columns: 1fr;
  }
}
</style>
