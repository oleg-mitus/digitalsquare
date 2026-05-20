<template>
  <div class="review">
    <div class="review__author">
      <div class="review__author-avatar">
        <Icon name="ds:icon-user" :size="16" />
      </div>
      <div class="review__author-info">
        <div class="review__author-name">{{ author }}</div>
        <div class="review__author-date">{{ date }}</div>
      </div>
    </div>
    <div class="review__question">
      {{ question }}
    </div>
    <div class="review__answer">
      <div class="review__answer-title">Ответ продавца</div>
      <div class="review__answer-text">
        <ReviewsTruncateText :text="answer" :max-chars="250" />
      </div>
      <div class="review__answer-bottom">
        <div class="review__answer-question">Ответ полезен?</div>
        <div class="review__answer-marks">
          <UiButton iconOnly variant="yellow" icon="ds:icon-like" />
          <UiButton iconOnly variant="yellow" icon="ds:icon-dislike" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  id: number;
  author: string;
  date: string;
  question: string;
  answer: string;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.review {
  border-radius: 12px;
  background-color: $whiteColor;
  padding: 15px 10px;
  &__author {
    display: flex;
    gap: 9px;
    align-items: center;
    &-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
      color: $secondaryColor;
    }
    &-info {
      display: flex;
      flex-direction: column;
      gap: 5px;
      line-height: 1;
    }
    &-name {
      font-weight: 500;
    }
    &-date {
      color: $greyText;
      font-size: 13px;
    }
  }
  &__question {
    margin-top: 15px;
    font-size: 14px;
  }
  &__answer {
    margin-top: 18px;
    background-color: #fff9eb;
    border-radius: 6px;
    padding: 10px;
    &-title {
      font-size: 13px;
      font-weight: 600;
      color: rgba($primaryColor, 0.5);
    }
    &-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-question {
      font-size: 13px;
      font-weight: 600;
      color: rgba($primaryColor, 0.5);
    }
    &-text {
      font-size: 14px;
      margin: 20px 0;
    }
    &-marks {
      display: flex;
      gap: 6px;
      .ui-button {
        padding: 7px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        .iconify {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}
</style>
