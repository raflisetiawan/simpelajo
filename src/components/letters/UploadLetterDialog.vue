<script setup lang="ts">
import { ref } from "vue";
import { useLetterStore } from "@/stores/letter"
import { insertLetter } from "@/services/admin/letter";
const letterStore = useLetterStore();
const file = ref(null);
const notValidFile = ref(false);

const onRejected = () => {
    notValidFile.value = true;
}

const onUpload = async () => {
    letterStore.$state.loadingUploadFile = true;
    await insertLetter(file.value, letterStore.$state.uploadLetterDialogService);
}
</script>

<template>
    <q-dialog v-model="letterStore.$state.isUploadLetterDialog" persistent>
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Upload Document</div>
                <q-space />
                <q-btn icon="close" flat round dense @click="letterStore.$state.isUploadLetterDialog = false" />
            </q-card-section>

            <q-card-section>
                <p>Drag dan drop dokumen atau klik di bawah ini</p>
                <q-file v-model="file" @update:model-value="notValidFile = false" class="full-width q-mb-sm"
                    label="Drag file ke sini atau klik untuk upload" accept=".docx,doc, PDF"
                    @click="notValidFile = false" filled @rejected="onRejected" bottom-slots :error="notValidFile">
                    <template v-slot:error>
                        Format File bukan document atau word
                    </template>
                </q-file>
                <div class="full-width text-center">
                    <q-btn color="primary" label="Upload File" v-if="file !== null"
                        :disable="letterStore.$state.loadingUploadFile" :loading="letterStore.$state.loadingUploadFile"
                        @click="onUpload">
                        <template v-slot:loading>
                            <q-spinner-hourglass class="on-left" />
                            {{ letterStore.$state.letterUploadProgress }}
                        </template>
                    </q-btn>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>