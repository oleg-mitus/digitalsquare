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

<style scoped lang="scss">
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
  background: transparent;
  gap: 6px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 6px;
  a {
    color: rgba(#2f2f2f, 0.5);
    text-decoration: none;
    &:hover {
      color: #2f2f2f;
    }
  }
}

.breadcrumb-separator {
  content: '';
  width: 4px;
  height: 4px;
  background-color: #2f2f2f;
  border-radius: 50%;
}

.breadcrumb-item.active span {
  color: #2f2f2f;
}
</style>
