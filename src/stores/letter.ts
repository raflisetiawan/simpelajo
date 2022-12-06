import { defineStore } from "pinia";

export const useLetterStore = defineStore("letter", {
  state: () => ({
    isUploadLetterDialog: false,
    uploadLetterDialogService: "",
    loadingUploadFile: false,
    componentKey: 0,
    letterUploadProgress: ""
  }),
});
