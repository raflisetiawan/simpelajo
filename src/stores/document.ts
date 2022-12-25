import { defineStore } from "pinia";

export const useDocumentStore = defineStore("document", {
  state: () => ({
    documentId: "",
    documentProgress: "",
    loadingButton: false,
    letterNumberProgress: 0,
    isLetterNumberProgress: false,
    sendVia: {
      whatsapp: "",
      email: "",
    },
    documents: [
      {
        id: "",
        data: {
          serviceName: "",
          createdAt: "",
          status: ""
        }
      }
    ]
  }),
});
