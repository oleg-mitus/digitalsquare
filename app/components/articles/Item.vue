<template>
  <div class="article-item">
    <div class="article-item__info">
      <div class="article-item__title">
        Стоит ли переходить на совместимые картриджи для принтера: экспертное
        мнение
      </div>

      <div class="article-item__date">22.07.2024</div>
    </div>
    <div class="article-item__image">
      <NuxtImg src="/images/article.jpg" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.article-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  &__info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    line-height: 1.3;
    font-weight: 500;
    letter-spacing: -2%;
  }
  &__image {
    aspect-ratio: 1.21;
    border-radius: 6px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__title {
    font-size: 20px;
  }
  &__date {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
