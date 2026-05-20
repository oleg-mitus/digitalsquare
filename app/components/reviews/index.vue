<template>
  <div class="reviews">
    <div class="reviews__left">
      <div class="reviews__mark">
        <div class="reviews__mark-num">5/5</div>
        <div class="reviews__mark-info">
          <div class="reviews__mark-stars">
            <UiRating v-model="rating" readonly variant="info" />
          </div>
          <div class="reviews__mark-desc">250 отзывов</div>
        </div>
      </div>
      <div class="reviews__desc">
        Рейтинг формируется на основе <br />
        актуальных отзывов
      </div>
      <div class="reviews__counts">
        <div
          class="reviews__counts-item"
          v-for="item in counts"
          :key="item.value"
        >
          <div class="reviews__counts-value">
            {{ item.value }}
          </div>
          <div class="reviews__counts-progress">
            <ReviewsProgressBar :value="(item.count / total) * 100" />
          </div>
        </div>
      </div>
      <div class="reviews__action">
        <div class="reviews__action-title">Есть что рассказать?</div>
        <div class="reviews__action-text">
          Оцените товар, ваш опыт будет полезен
        </div>
        <div class="reviews__action-button">
          <UiButton href="/add-review"> Добавить отзыв </UiButton>
        </div>
      </div>
    </div>
    <div class="reviews__right">
      <div class="reviews__list">
        <ReviewsItem
          v-for="review in reviews"
          v-bind="review"
          :key="review.id"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Counts {
  value: number;
  count: number;
}
const rating = ref<number>(4.4);
const total = ref<number>(250);
const counts = ref<Counts[]>([
  {
    value: 5,
    count: 120,
  },
  {
    value: 4,
    count: 40,
  },
  {
    value: 3,
    count: 30,
  },
  {
    value: 2,
    count: 20,
  },
  {
    value: 1,
    count: 40,
  },
]);

const reviews = reactive([
  {
    id: 1,
    author: "Карина",
    date: "22.01.2016",
    question: "Как узнать, подойдёт ли картридж к моему принтеру?",
    answer: `
        Чтобы узнать, подойдет ли картридж, используйте 
        модель принтера (самый надежный способ!) для поиска на сайте производителя или в магазинах, 
        посмотрите наклейки в отсеке карт или на старых картриджах. Чтобы узнать, подойдет ли картридж, используйте 
        модель принтера (самый надежный способ!) для поиска на сайте производителя или в магазинах, 
        посмотрите наклейки в отсеке карт или на старых картриджах. Чтобы узнать, подойдет ли картридж, используйте 
        модель принтера (самый надежный способ!) для поиска на сайте производителя или в магазинах, 
        посмотрите наклейки в отсеке карт или на старых картриджах
    `,
  },
  {
    id: 2,
    author: "Vasya",
    date: "22.01.2022",
    question: "Как узнать, подойдёт ли картридж к моему принтеру?",
    answer: `
        Чтобы узнать, подойдет ли картридж, используйте 
        модель принтера (самый надежный способ!) для поиска на сайте производителя или в магазинах, 
        посмотрите наклейки в отсеке карт или на старых картриджах. Чтобы узнать, подойдет ли картридж, используйте 
        модель принтера (самый надежный способ!) для поиска на сайте производителя или в магазинах, 
        посмотрите наклейки в отсеке карт или на старых картриджах. Чтобы узнать, подойдет ли картридж, используйте 
        модель принтера (самый надежный способ!) для поиска на сайте производителя или в магазинах, 
        посмотрите наклейки в отсеке карт или на старых картриджах
    `,
  },
]);
</script>

<style lang="scss" scoped>
.reviews {
  display: flex;
  gap: 20px;
  &__left {
    width: 365px;
    flex: 0 0 365px;
  }
  &__right {
    flex: 1;
  }

  &__mark {
    display: flex;
    gap: 20px;
    align-items: center;
    &-num {
      font-size: 70px;
      line-height: 1;
      font-weight: 500;
    }
    &-info {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
  &__desc {
    margin-top: 25px;
  }
  &__counts {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    &-item {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    &-value {
      font-size: 20px;
    }
    &-progress {
      flex: 1;
    }
  }
  &__action {
    margin-top: 30px;
    &-title {
      font-weight: 600;
      font-size: 20px;
    }
    &-text {
      margin-top: 10px;
    }
    &-button {
      margin-top: 20px;
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
