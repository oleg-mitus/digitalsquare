<template>
  <div class="reviews-m">
    <div class="reviews-m__top">
      <div class="reviews-m__top-title">Отзывы</div>
      <div class="reviews-m__top-add">
        <NuxtLink to="/add-review">Оставить отзыв</NuxtLink>
      </div>
    </div>
    <div class="reviews-m__list">
      <div class="review-m">
        <div class="review-m__stars">
          <UiRating v-model="rating" readonly variant="info" />
        </div>
        <div class="review-m__text">
          Два раза заказывал на Марьино. Оба раза о том, что можно забирать
          товар, оповещала смска. Картридж работает без нареканий:не фонит, не
          пачкает. Всем доволен
        </div>
        <div class="review-m__author">
          <div class="review-m__author-name">S qooper</div>
          <div class="review-m__author-date">07.04.2014 15:56</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const rating = ref<number>(4);
</script>

<style lang="scss" scoped>
.reviews-m {
  background: #fff;
  border-radius: 6px;
  padding: 10px;
  margin: 0 -10px;
  &__top {
    display: flex;
    gap: 14px;
    &-title {
      font-weight: 500;
    }
    &-add a {
      color: rgba($blackColor, 0.6);
      font-size: 14px;
    }
  }
  &__list {
    margin-top: 5px;
  }
}

.review-m {
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__text {
    font-size: 14px;
  }
  &__author {
    display: flex;
    justify-content: space-between;
    &-name {
      font-size: 12px;
      font-weight: 500;
    }
    &-date {
      font-size: 12px;
      font-weight: 500;
      color: rgba($blackColor, 0.6);
    }
  }
}
</style>
