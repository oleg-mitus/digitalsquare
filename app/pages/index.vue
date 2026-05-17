<template>
  <div class="home">
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
          <div class="news-grid">
            <NewsItem v-for="i in 3" :key="i" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  &__hero {
    width: 100%;
    height: calc(100vh - 166px + 32px);
    position: relative;
    margin-top: -16px;
    @include respond-to("lg") {
      height: calc(100dvh - $headerTopHeight - 80px + 16px);
      min-height: 400px;
      
    }
    @include respond-to("2xl") {
      height: calc(100dvh - $headerTopHeight - 90px + 16px);
    }
    &-back {
      position: absolute;
      inset: 0;
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &-front {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &-content {
      padding: 0 10px;
      max-width: 1600px;
      margin: 0 auto;
      width: 100%;
      display: flex;
      gap: 37px;
      flex-direction: column;
      color: #fff;
      @include respond-to("lg") {
        padding: 0 40px;
      }
      &_title {
        font-size: 40px;
        line-height: 1;
        font-weight: 500;
        @include respond-to("lg") {
          font-size: 48px;
        }
        @include respond-to("2xl") {
          font-size: 75px;
        }
      }
      &_desc {
        font-size: 18px;
        max-width: 710px;
        line-height: 130%;
        @include respond-to("2xl") {
          font-size: 22px;
        }
      }
    }
  }
  &__blocks {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 40px 0;

    @include respond-to("lg") {
      gap: 80px;
      padding: 80px 0;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 12px;
      @include respond-to("lg") {
        flex-wrap: nowrap;
      }
    }
    &-title {
      color: #2f2f2f;
      h3 {
        font-weight: 500;
        font-size: 24px;
        line-height: 1;
        margin: 0;
        padding: 0;
        @include respond-to("lg") {
          font-size: 32px;
        }
        @include respond-to("2xl") {
          font-size: 45px;
        }
      }
    }
    &-more {
      a {
        color: #fec93b;
        text-decoration: none;
        line-height: 1.3;
        @media (max-width: 1023px) {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
