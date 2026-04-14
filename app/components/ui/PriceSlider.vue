<template>
  <div class="price-range">
    <div class="price-range__slider">
      <div class="slider-track" :style="trackStyle"></div>
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="minVal"
        class="range-input"
      />
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="maxVal"
        class="range-input"
      />
    </div>
    <div class="price-range__inputs">
      <div class="field">
        <input
          type="text"
          :value="formatDisplay(modelValue[0])"
          @input="handleInput($event, 0)"
          @blur="validateMin"
        />
      </div>
      <div><Icon name="my-icon:icon-minus" /></div>
      <div class="field">
        <input
          type="text"
          :value="formatDisplay(modelValue[1])"
          @input="handleInput($event, 1)"
          @blur="validateMax"
        />
      </div>
      <UiButton size="sm" :style="{ minWidth: '100px' }">Найти</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: [number, number];
  min?: number;
  max?: number;
  step?: number;
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 10000,
  step: 100,
});

const emit = defineEmits(["update:modelValue"]);

const formatDisplay = (val: number) => {
  return val.toLocaleString("ru-RU") + " ₽";
};

const parseNumber = (str: string) => {
  return parseInt(str.replace(/[^0-9]/g, "")) || 0;
};

const minVal = computed({
  get: () => props.modelValue[0],
  set: (val) =>
    emit("update:modelValue", [
      Math.min(val, props.modelValue[1]),
      props.modelValue[1],
    ]),
});

const maxVal = computed({
  get: () => props.modelValue[1],
  set: (val) =>
    emit("update:modelValue", [
      props.modelValue[0],
      Math.max(val, props.modelValue[0]),
    ]),
});

const handleInput = (e: Event, index: number) => {
  const target = e.target as HTMLInputElement;
  const num = parseNumber(target.value);

  const newValue: [number, number] = [...props.modelValue];
  newValue[index] = num;
  emit("update:modelValue", newValue);
};

const validateMin = () => {
  let val = Math.max(
    props.min,
    Math.min(props.modelValue[0], props.modelValue[1]),
  );
  emit("update:modelValue", [val, props.modelValue[1]]);
};

const validateMax = () => {
  let val = Math.min(
    props.max,
    Math.max(props.modelValue[1], props.modelValue[0]),
  );
  emit("update:modelValue", [props.modelValue[0], val]);
};

const trackStyle = computed(() => {
  const left =
    ((props.modelValue[0] - props.min) / (props.max - props.min)) * 100;
  const right =
    ((props.modelValue[1] - props.min) / (props.max - props.min)) * 100;
  return {
    left: `${left}%`,
    width: `${right - left}%`,
  };
});
</script>

<style lang="scss" scoped>
$white: #ffffff;

.price-range {
  width: 100%;
  &__inputs {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 20px;

    .field {
      flex: 1;
      display: flex;
      background: $greyColor;
      padding: 10px;
      border: 1px solid #e6e6e6;
      border-radius: 10px;
      transition: border-color 0.2s;
      font-size: 16px;

      &:focus-within {
        border-color: $blackColor;
      }
      input {
        width: 100%;
        background: none;
        border: none;
        outline: none;
        font-weight: 400;
        font-size: 16px;
        color: $blackColor;
      }
    }
  }

  &__slider {
    position: relative;
    height: 4px;
    background: #f3f3f3;
    border-radius: 2px;
    margin: 0 5px;

    .slider-track {
      position: absolute;
      height: 100%;
      background: $blackColor;
      z-index: 1;
    }

    .range-input {
      position: absolute;
      width: calc(100% + 10px);
      left: -5px;
      top: 50%;
      transform: translateY(-50%);
      appearance: none;
      background: none;
      pointer-events: none;
      z-index: 2;
      margin: 0;

      &::-webkit-slider-thumb {
        appearance: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: $blackColor;
        cursor: pointer;
        pointer-events: auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      &::-moz-range-thumb {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: $blackColor;
        cursor: pointer;
        pointer-events: auto;
      }
    }
  }
}
</style>
