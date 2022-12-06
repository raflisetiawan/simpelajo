import { defineStore } from "pinia";

export const useFormBuilderStore = defineStore("formBuilder", {
  
  state: () => ({
    formFields: [{} = {}],
    checkboxOption: [],
    isFormFieldNull: false,
    selectOption: "Pilih Layanan Administrasi",
    createServiceDialog: false,
    editServiceDialog: {
      isDialog: false,
      oldName: "",
      id: "",
    },
    notSelected: false,
  }),

  actions: {
    setTextInput(data: any) {
      const formFields: any = this.formFields
      formFields.textInput = data;
    },
  },
});
