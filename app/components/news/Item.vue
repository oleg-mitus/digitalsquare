<template>
  <div class="news-item">
    <div class="news-item__image">
      <NuxtImg src="/images/article.jpg" alt="" />
    </div>
    <div class="news-item__info">
      <div class="news-item__content">
        <div class="news-item__title">
          Почему совместимые картриджи для принтера дешевле оригинальных?
        </div>
        <div class="news-item__desc">
          Какой то текст новости Какой то текст новости Какой то текст новости
          Какой то текст новости Какой то текст новости Какой то текст новости
          Какой то текст новости Какой то текст новости
        </div>
      </div>
      <div class="news-item__date">22.07.2024</div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.news-item {
  display: flex;
  gap: 20px;
  &__image {
    width: 492px;
    height: 200px;
    border-radius: 6px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 1023px) {
      display: none;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    @media (max-width: 1023px) {
      flex-direction: column-reverse;
      justify-content: flex-start;
      gap: 6px;
    }
  }
  &__content {
    display: flex;
    gap: 20px;
    flex-direction: column;
  }
  &__title {
    font-size: 20px;
    font-weight: 500;
    max-width: 380px;
    line-height: 130%;
    @media (max-width: 1023px) {
      font-size: 18px;
    }
  }
  &__desc {
    font-size: 18px;
    font-weight: 500;
    max-width: 500px;
    line-height: 130%;
    @media (max-width: 1023px) {
      display: none;
    }
  }
  &__date {
    font-size: 14px;
    color: rgba($blackColor, 0.5);
    @media (max-width: 1023px) {
      font-size: 12px;
    }
  }
}
</style>
