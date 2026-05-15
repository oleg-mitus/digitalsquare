<template>
  <div class="page container">
    <div class="page__title">
      <h1>Статьи</h1>
    </div>
    <div class="page__breadcrumbs">
      <Breadcrumbs
        :items="[{ text: 'Главная', to: '/' }, { text: 'Статьи' }]"
      />
    </div>
    <div class="page__content">
      <div class="page__content-container">
        <div class="articles-grid">
          <ArticlesItem v-for="i in 12" :key="i" />
        </div>
        <UiPagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total-items="totalItems"
          :page-size-options="[9, 18, 36, 72]"
          :showInfo="false"
          @update:current-page="handleUpdate"
          @update:page-size="handleUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const totalItems = ref(1000);
const currentPage = ref(1);
const pageSize = ref(9);

const handleUpdate = () => {
  console.log(
    `Загрузка страницы ${currentPage.value} с лимитом ${pageSize.value}`,
  );
};
</script>
