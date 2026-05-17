<template>
  <button
    class="bottom-bar__link"
    aria-label="Поиск"
    :class="{ active: showSearch }"
    @click="toggleSearch()"
  >
    <Icon name="ds:icon-search" size="20px" />
    <span class="bottom-bar__text">Поиск</span>
  </button>
  
</template>

<script setup lang="ts">
import { useUIState } from "~/stores/ui";

const { showSearch } = useUIState();

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
};
</script>


