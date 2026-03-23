<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__top-logo">
          <NuxtLink to="/">
            <img src="~/assets/images/logo.png" alt="logo" />
          </NuxtLink>
        </div>
        <div class="footer__top-socials">
          <Icon name="my-icon:youtube" />
        </div>
      </div>
      <div class="footer-grid">
        <div class="footer-col"></div>
        <div class="footer-col"></div>
        <div class="footer-col"></div>
      </div>
      <div class="footer__bottom">
        <div class="footer__bottom-copyright">
          Copyright (c) 2005-{{ new Date().getFullYear() }} Цифровой квадрат
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  border-radius: 10px 10px 0 0;
  background-color: #303F42;
  padding: 20px 0;

  &__top {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .container {
    padding: 0 40px;
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
  }
}
.footer-bottom {
  margin-top: 40px;
  text-align: center;
  border-top: 1px solid #444;
  padding-top: 20px;
  font-size: 0.9rem;
  color: #888;
}
</style>
