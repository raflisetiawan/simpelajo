import { defineStore } from "pinia";

export const useFormStore = defineStore("form", {
  state: () => ({
    form: {
      checkboxModel: [],
      multichoice: [],
      multichoiceOther: "",
      date: null,
      dropdownModel: "",
    },
    forms: [],
  }),
});
