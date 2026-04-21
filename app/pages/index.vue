<template>
  <div class="home" v-if="false">
    <div class="home__hero">
      <div class="home__hero-back">
        <video
          playsinline
          loop
          muted
          autoplay
          poster="/video/poster.webp"
          preload="metadata"
        >
          <source src="/video/video.webm" type="video/webm" />
          <source src="/video/video.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="home__hero-front">
        <div class="home__hero-content">
          <div class="home__hero-content_title">Картриджи для принтеров</div>
          <div class="home__hero-content_desc">
            Картриджи для любой модели принтера — оригинал и проверенные
            совместимые, доставка по России за 1–2 дня.
          </div>
          <div class="home__hero-content_button">
            <UiButton href="/catalog">Перейти каталог</UiButton>
          </div>
        </div>
      </div>
    </div>
    <div class="home__blocks">
      <div class="home__block">
        <div class="container">
          <div class="home__blocks-top">
            <div class="home__blocks-title">
              <h3>Вы недавно смотрели</h3>
            </div>
            <div class="home__blocks-more">
              <NuxtLink to="/catalog">История просмотров</NuxtLink>
            </div>
          </div>
          <div class="catalog__grid">
            <CatalogProduct v-for="i in 8" :key="i" />
          </div>
        </div>
      </div>
      <div class="home__block">
        <div class="container">
          <div class="home__blocks-top">
            <div class="home__blocks-title">
              <h3>Полезные статьи</h3>
            </div>
            <div class="home__blocks-more">
              <NuxtLink to="/catalog">Смотреть все </NuxtLink>
            </div>
          </div>
          <div class="articles-grid">
            <ArticlesItem v-for="i in 3" :key="i" />
          </div>
        </div>
      </div>
      <div class="home__block">
        <div class="container">
          <div class="home__blocks-top">
            <div class="home__blocks-title">
              <h3>Новости</h3>
            </div>
            <div class="home__blocks-more">
              <NuxtLink to="/catalog">Смотреть все </NuxtLink>
            </div>
          </div>
          <div class="news__grid"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
