<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="['breadcrumb-item', { 'active': index === items.length - 1 }]"
      >
        <NuxtLink
          v-if="item.to && !isLast(index)"
          :to="item.to"
          :aria-current="isLast(index) ? 'page' : undefined"
        >
          {{ item.text }}
        </NuxtLink>
        <span v-else :aria-current="isLast(index) ? 'page' : undefined">
          {{ item.text }}
        </span>

        <span
          v-if="index < items.length - 1"
          class="breadcrumb-separator"
        ></span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">

interface BreadcrumbItem {
  text: string
  to?: string | Record<string, unknown>
}

const props = defineProps<{
  items: BreadcrumbItem[]
}>()

const isLast = (index: number): boolean => {
  return index === props.items.length - 1
}
</script>

<style scoped>
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
  background: transparent;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-separator {
  content: '';
  width: 4px;
  height: 4px;
  background-color: #6c757d;
  border-radius: 50%;
  margin: 0 0.75rem;
}

.breadcrumb-item.active span {
  color: #6c757d;
  font-weight: 500;
}
</style>
