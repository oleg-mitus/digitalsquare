<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>О магазине</h4>
          <p>Лучшие товары по доступным ценам с доставкой по всей стране.</p>
        </div>
        <div class="footer-col">
          <h4>Помощь</h4>
          <NuxtLink to="/checkout">Оплата и доставка</NuxtLink>
          <NuxtLink to="/reviews">Обратная связь</NuxtLink>
        </div>
        <div class="footer-col">
          <h4>Контакты</h4>
          <p>8 (800) 555-35-35</p>
          <p>info@example.com</p>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; {{ new Date().getFullYear() }} Nuxt4 Shop. Все права защищены.
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-bottom {
  margin-top: 40px;
  text-align: center;
  border-top: 1px solid #444;
  padding-top: 20px;
  font-size: 0.9rem;
  color: #888;
}
</style>
