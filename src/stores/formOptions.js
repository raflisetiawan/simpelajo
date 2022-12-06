import { ref } from "vue";
import { defineStore } from "pinia";

export const useFormOptionsStore = defineStore("formOption", () => {
  const selectOptions = ref([
    "Surat Keterangan tidak mampu",
    "Surat Himbauan",
    "Surat kehilangan surat nikah",
  ]);

  const genderOptions = ref([
    {
      label: "Laki-Laki",
      value: "Laki-Laki",
    },
    {
      label: "Perempuan",
      value: "Perempuan",
    },
  ]);

  const religionOptions = ref([
    "Islam",
    "Kristen",
    "Protestan",
    "Hindu",
    "Budha",
    "Konghuchu",
  ]);

  return { selectOptions, genderOptions, religionOptions };
});
