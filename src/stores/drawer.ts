import { defineStore } from "pinia";

export const useDrawerStore = defineStore("drawer", {
  state: () => ({
    isShowUp: true,
  }),
});
