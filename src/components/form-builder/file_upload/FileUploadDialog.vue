<script setup lang="ts">
import { ref } from "vue";
import { useDialogStore } from "@/stores/dialogs"
import { useFormBuilderStore } from "@/stores/formBuilder"

const dialogStore = useDialogStore();
const formBuilderStore = useFormBuilderStore();
const fileUploadField = ref({
    title: "",
    size: "",
    select: null
});
const selectOptions = ref(["Gambar", "Video", "Dokumen"]);
const onSubmit = () => {
    if (dialogStore.$state.fileUploadDialog.action == "edit") {
        formBuilderStore.$state.formFields.splice(dialogStore.$state.fileUploadDialog.index, 1, {
            type: "file_upload",
            title: fileUploadField.value.title,
            size: fileUploadField.value.size,
            select: fileUploadField.value.select
        })
        dialogStore.$state.fileUploadDialog.isAppear = false;
    } else {
        formBuilderStore.$state.formFields.push({
            type: "file_upload",
            title: fileUploadField.value.title,
            size: fileUploadField.value.size,
            select: fileUploadField.value.select
        })
    }
    dialogStore.$state.fileUploadDialog.isAppear = false;
}
</script>
<template>
    <q-dialog v-model="dialogStore.$state.fileUploadDialog.isAppear" persistent>
        <q-card style="min-width: 350px">
            <q-form @submit.prevent="onSubmit">
                <q-card-section>
                    <div class="text-h6">File Upload</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input dense v-model="fileUploadField.title" autofocus placeholder="Judul input"
                        :rules="[(v) => !!v || 'Harus diisi']" />
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <q-input dense v-model="fileUploadField.size" autofocus placeholder="Maksimal Size / MB"
                        :rules="[(v) => !!v || 'Harus diisi']" type="number" />
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <q-select v-model="fileUploadField.select" :options="selectOptions" label="Format File" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="OK" v-close-popup type="submit" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>