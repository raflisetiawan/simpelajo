import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useLayananStore = defineStore("layanan", () => {
  const layanan = ref([
    { id: 1, name: "Surat keterangan tidak mampu" },
    { id: 2, name: "Surat himbauan" },
    { id: 3, name: "Surat kehilangan surat nikah" },
    { id: 4, name: "Surat keterangan ahli waris" },
    { id: 5, name: "Surat keterangan bukan penduduk" },
    { id: 6, name: "Surat keterangan domisili" },
  ]);

  return { layanan };
});
