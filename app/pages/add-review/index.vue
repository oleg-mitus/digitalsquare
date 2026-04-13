<template>
  <div class="p-content container">
    <div class="p-content__title">
      <h1>Мой отзыв</h1>
    </div>
    <div class="p-content__breadcrumbs">
      <Breadcrumbs
        :items="[
          { text: 'Главная', to: '/' },
          { text: 'Каталог', to: '/catalog/' },
          { text: 'Картридж СF259XL для HP LJ Pro M304, LJ Pro M404', to: '/product/' },
          { text: 'Отзыв' },
        ]"
      />
    </div>
    <div class="p-content__wrapper">

    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
