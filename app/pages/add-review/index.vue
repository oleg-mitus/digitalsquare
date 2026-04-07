<template>
  <div class="page container">
    <div class="page__title">
      <h1>Мой отзыв</h1>
    </div>
    <div class="page__breadcrumbs">
      <Breadcrumbs
        :items="[
          { text: 'Главная', to: '/' },
          { text: 'Каталог', to: '/catalog/' },
          {
            text: 'Картридж СF259XL для HP LJ Pro M304, LJ Pro M404',
            to: '/product/',
          },
          { text: 'Отзыв' },
        ]"
      />
    </div>
    <div class="page__content">
      <div class="p-review">
        <div class="p-review__top">
          <div class="p-review__product">
            <div class="p-review__product-image">
              <NuxtImg src="/images/product.jpg" alt="Product" />
            </div>
            <div class="p-review__product-title">
              Картридж СF259XL для HP LJ Pro M304, LJ Pro M404
            </div>
          </div>
        </div>
        <div class="p-review__content">
          <div class="p-review__field">
            <label>Общая оценка</label>
            <div class="p-review__field-input">
              <UiRating v-model="form.rating" />
            </div>
          </div>
          <div class="p-review__field">
            <label>Добавьте фото или видео</label>
            <UiFilesUploader :max-files="10" @update:files="updateFiles" />
          </div>
          <div class="p-review__field">
            <label>Как вам товар</label>
            <input
              type="text"
              v-model="form.comment"
              placeholder="Общее впечатление"
              class="ui-input"
            />
          </div>
          <div class="p-review__field">
            <div class="p-review__anonymous">
              Сделать отзыв анонимным
              <UiSwitch v-model="form.isAnonymous" />
            </div>
          </div>
        </div>
        <div class="p-review__actions">
          <UiButton block>Отправить отзыв</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface ReviewData {
  userName: string;
  comment: string;
  rating: number;
  photos: File[];
  isAnonymous: boolean;
}

const form = reactive<ReviewData>({
  userName: "",
  comment: "",
  rating: 0,
  photos: [],
  isAnonymous: false,
});

const updateFiles = (newFiles: File[]) => {
  form.photos = newFiles;
};
</script>

<style lang="scss" scoped>
.p-review {
  display: flex;
  width: 100%;
  max-width: 750px;
  margin: 25px auto 50px;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  background: #ffffff;
  @include respond-to(tablet) {
    padding: 10px;
    max-width: none;
  }
  &__product {
    display: flex;
    gap: 10px;
    &-image {
      width: 116px;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
    &-title {
      font-size: 20px;
      font-weight: 500;
      max-width: 275px;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  &__field {
    display: flex;
    flex-direction: column;
    gap: 14px;
    label {
      font-size: 16px;
      font-weight: 500;
    }
  }
  &__anonymous {
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $greyColor;
    padding: 10px;
    border-radius: 10px;
    gap: 10px;
    color: rgba(49, 49, 49, 0.5);
  }
}
</style>
