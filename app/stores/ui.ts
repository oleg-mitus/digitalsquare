import { createGlobalState } from "@vueuse/core";
import { shallowRef, ref } from "vue";

export const useUIState = createGlobalState(() => {
  const showSearch = shallowRef<boolean>(false);
  const cartIds = ref<number[]>([]);

  const isInCart = (id: number): boolean => {
    return cartIds.value.find((item) => item === id) ? true : false;
  };

  const addToCart = (id: number): void => {
    if (!cartIds.value.find((item) => item === id)) {
      cartIds.value.push(id);
    }
  };

  return { showSearch, isInCart, addToCart };
});
