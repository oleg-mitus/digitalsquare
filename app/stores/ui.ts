import { createGlobalState } from "@vueuse/core";
import { shallowRef } from "vue";

export const useUIState = createGlobalState(() => {
  const showSearch = shallowRef<boolean>(false);

  const openSearch = (): void => {
    showSearch.value = true;
  };

  const closeSearch = (): void => {
    showSearch.value = false;
  };
  
  return { showSearch, openSearch, closeSearch };
});
