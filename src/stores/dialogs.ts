import { defineStore } from "pinia";

export const useDialogStore = defineStore("dialogs", {
  state: () => ({
    isLetterNumberDialog: false,
    isSendViaDialog: false,
    isStatusDialog: false,
    isSendDocument: false,
    labelFieldDialog: {
      isAppear: false,
      type: "",
      index: 0,
      action: "",
    },
    checkboxFieldDialog: {
      isAppear: false,
      type: "",
      index: 0,
      action: "",
    },
    radioFieldDialog: {
      isAppear: false,
      type: "",
      index: 0,
      action: "",
    },
    dateFieldDialog: {
      isAppear: false,
      type: "",
      index: 0,
      action: "",
    },
    dropdownDialog: {
      isAppear: false,
      type: "",
      index: 0,
      action: "",
    },
    fileUploadDialog: {
      isAppear: false,
      type: "",
      index: 0,
      action: "",
    },
    numberFieldDialog: {
      isAppear: false,
      type: "",
      index: 0,
      action: "",
    },
  }),
});
