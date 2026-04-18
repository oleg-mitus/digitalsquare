<template>
  <div class="site-wrapper">
    <AppHeader />
    
    <main class="main-content">
      <slot />
    </main>

    <AppFooter />
    <BottomBar />
  </div>
</template>

<style lang="scss">
.site-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F3F3F3;
}

.main-content {
  flex: 1;
}
</style>
