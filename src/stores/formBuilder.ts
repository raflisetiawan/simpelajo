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

    setFormFields(label: string, index: any, required: boolean){
      this.formFields[index] = {
        label,
        required
      }
      console.log(this.formFields[index]);
    }
  },
});
