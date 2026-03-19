<template>
  <div class="site-wrapper">
    <AppHeader />
    
    <main class="main-content">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<style lang="scss">
// Глобальные стили для всей структуры
.site-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Растягиваем на всю высоту экрана
}

.main-content {
  flex: 1; // Заставляет контент занимать всё свободное место, прижимая футер книзу
}
</style>
