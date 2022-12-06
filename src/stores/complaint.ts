import { defineStore } from "pinia";

export const useComplaintStore = defineStore("complaint", {
  state: () => ({
    loading: false,
    progress: 0,
    isUploadDone: false,
  }),
});
