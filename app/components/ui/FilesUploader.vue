<script setup lang="ts">
import { ref, onUnmounted } from "vue";

interface Props {
  maxFiles?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxFiles: 10,
});

const emit = defineEmits<{
  (e: "update:files", files: File[]): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const files = ref<File[]>([]);
const previews = ref<string[]>([]);
const isDragging = ref(false);

const handleFiles = (newFiles: FileList | File[]) => {
  const availableSlots = props.maxFiles - files.value.length;
  if (availableSlots <= 0) return;

  const filtered = Array.from(newFiles)
    .filter((file) => file.type.startsWith("image/")) // Только фото
    .slice(0, availableSlots);

  filtered.forEach((file) => {
    files.value.push(file);
    previews.value.push(URL.createObjectURL(file));
  });

  emit("update:files", files.value);
};

const onDrop = (e: DragEvent) => {
  isDragging.value = false;
  if (e.dataTransfer?.files) {
    handleFiles(e.dataTransfer.files);
  }
};

const onFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    handleFiles(target.files);
  }
};

const removeFile = (index: number) => {
  if (previews.value[index]) {
    URL.revokeObjectURL(previews.value[index]);
    files.value.splice(index, 1);
    previews.value.splice(index, 1);
    emit("update:files", files.value);
  }
};

onUnmounted(() => {
  previews.value.forEach((url) => URL.revokeObjectURL(url));
});
</script>

<template>
  <div class="uploader">
    <div
      class="uploader__dropzone"
      :class="{ 'is-dragging': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
      @click="fileInput?.click()"
    >
      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*, video/*"
        class="uploader__input"
        @change="onFileSelect"
      />
      <div>
        <Icon name="my-icon:icon-download" size="70" />
      </div>
      <p v-if="files.length < maxFiles">Загрузите не более 10 файлов</p>
      <p v-else>Лимит в {{ maxFiles }} файлов достигнут</p>
    </div>

    <div v-if="previews.length" class="uploader__previews">
      <div v-for="(url, index) in previews" :key="url" class="preview-card">
        <img :src="url" alt="Preview" />
        <button
          type="button"
          class="preview-card__remove"
          @click="removeFile(index)"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.uploader {
  &__dropzone {
    border-radius: 10px;
    padding: 40px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    background: $greyColor;
    min-height: 284px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &.is-dragging {
      border-color: #fbbf24;
      background: #fffbeb;
    }
    p {
      color: rgba(49, 49, 49, 0.5);
      margin: 0;
    }
  }

  &__input {
    display: none;
  }

  &__previews {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    gap: 12px;
    margin-top: 20px;
  }
}

.preview-card {
  position: relative;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  border: 0.5px solid #ECECEC;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__remove {
    position: absolute;
    top: 2px;
    right: 2px;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: $redColor;
      color: white;
    }
  }
}
</style>
