<template>
  <div class="h-catalog" ref="linkTarget">
    <UiButton
      icon="ds:icon-catalog"
      variant="secondary"
      @click.prevent="show = !show"
      :class="{ active: show }"
      >Каталог</UiButton
    >

    <Transition name="fade-in">
      <div class="h-drop h-drop--catalog" v-if="show" ref="target">
        <div class="h-drop__content">
          <div class="h-catalog__content">
            <div class="h-catalog__content-left">
              <ul class="h-catalog__content-categories">
                <li
                  v-for="category in catalogData"
                  :key="category.id"
                  :class="[
                    'list-item',
                    { active: activeCategoryId === category.id },
                  ]"
                  @click="activeCategoryId = category.id"
                >
                  {{ category.name }}
                </li>
              </ul>
            </div>
            <div class="h-catalog__content-right">
              <ul class="h-catalog__content-subcategories">
                <li
                  v-for="sub in activeSubcategories"
                  :key="sub"
                  class="list-item sub-item"
                >
                  {{ sub }}
                  <span class="list-item__count"
                    >90 <Icon name="ds:icon-caret" class="list-item__count-caret" size="6px"
                  /></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

const catalogData: Category[] = [
  {
    id: "brands",
    name: "Бренды",
    subcategories: [
      "Фотобарабан 1",
      "Фотобарабан 2",
      "Фотобарабан 3",
      "Фотобарабан 4",
      "Фотобарабан 5",
      "Фотобарабан 6",
      "Фотобарабан 7",
    ],
  },
  {
    id: "types",
    name: "Виды",
    subcategories: [
      "Струйный 1",
      "Струйный 2",
      "Струйный 3",
      "Струйный 4",
      "Струйный 5",
      "Струйный 6",
      "Струйный 7",
    ],
  },
  {
    id: "colors",
    name: "Цвета",
    subcategories: [
      "Черный",
      "Белый",
      "Красный",
      "Синий",
      "Зеленый",
      "Желтый",
      "Серый",
    ],
  },
];

const show = ref<boolean>(false);
const target = useTemplateRef<HTMLElement>("target");
const linkTarget = useTemplateRef<HTMLElement>("linkTarget");
const activeCategoryId = ref<string | null>(catalogData[0]?.id || null);

const activeSubcategories = computed(() => {
  const selected = catalogData.find((c) => c.id === activeCategoryId.value);
  return selected ? selected.subcategories : [];
});

const closeDropdown = (): void => {
  show.value = false;
};

onClickOutside(target, () => closeDropdown(), {
  ignore: [linkTarget],
});
</script>

<style lang="scss" scoped>
.h-catalog {
  position: relative;
  &__content {
    display: flex;
    padding-top: 10px;
    &-left {
      border-right: 1px solid $borderColor;
      padding-right: 10px;
    }
    &-right {
      padding-left: 10px;
      display: flex;
      flex: 1;
    }
    &-categories {
      width: 260px;
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
      list-style: none;
      .list-item {
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 6px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 500;
        &:hover,
        &.active {
          background: $greyColor;
        }
      }
    }
    &-subcategories {
      display: flex;
      width: 100%;
      flex-direction: column;
      margin: 0;
      padding: 0;
      list-style: none;
      flex: 1;
      .list-item {
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 6px;
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        line-height: 130%;
        gap: 10px;
        &:hover {
          background: $greyColor;
        }
        &__count {
          font-size: 14px;
          color: rgba($blackColor, 0.5);
          display: flex;
          align-items: center;
          gap: 10px;
          &-caret {
            transform: rotate(-90deg);
            margin-top: -2px;
          }
        }
      }
    }
  }
}
</style>
