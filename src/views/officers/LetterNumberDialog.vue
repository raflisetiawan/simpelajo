<script setup lang="ts">
import { ref } from "vue";
import { useDialogStore } from "@/stores/dialogs";
import isLetter from "@/utils/isLetter";
import { useRoute } from "vue-router";
import { insertLetterNumber } from "@/services/officers/document";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { useDocumentStore } from "@/stores/document";

const documentStore = useDocumentStore();
const letterNumber = ref("");
const route: any = useRoute();
const dialogStore = useDialogStore();
const props = defineProps(["downloadURL", "serviceName", "letterURL", "documentData"]);

function loadFile(url: string, callback: any) {
    PizZipUtils.getBinaryContent(url, callback);
}

const renderDoc = async (url: string) => {
    loadFile(url, async function (
        error: any,
        content: any
    ) {
        if (error) {
            throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
        let newData = props.documentData;
        newData["Nomor Surat"] = letterNumber.value;
        doc.setData(newData);
        try {
            doc.render();
        } catch (error: any) {
            function replaceErrors(key: any, value: any[]) {
                if (value instanceof Error) {
                    return Object.getOwnPropertyNames(value).reduce(function (
                        error: any,
                        key: any
                    ) {
                        error[key] = value[key];
                        return error;
                    },
                        {});
                }
                return value;
            }
            console.log(JSON.stringify({ error: error }, replaceErrors));

            if (error.properties && error.properties.errors instanceof Array) {
                const errorMessages = error.properties.errors
                    .map(function (error: any) {
                        return error.properties.explanation;
                    })
                    .join("\n");
                console.log("errorMessages", errorMessages);
            }
            throw error;
        }
        const out = doc.getZip().generate({
            type: "blob",
            mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document/application/msword",
        });
        await insertLetterNumber(out, letterNumber.value, route.params.id, props.downloadURL, props.serviceName)
        // Output the document using Data-URI
    });
}


const onOk = async () => {
    await renderDoc(props.letterURL);
}
</script>
<template>
    <q-dialog v-model="dialogStore.$state.isLetterNumberDialog" persistent>
        <q-card style="min-width: 350px">
            <q-form @submit.prevent="onOk">
                <q-card-section>
                    <div class="text-h6">Masukkan Nomor Surat</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input dense v-model="letterNumber" autofocus
                        :rules="[(v) => !!v || 'harus diisi', (v) => !isLetter(v) || 'input tidak boleh mengandung karakter']">
                    </q-input>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" @click="dialogStore.$state.isLetterNumberDialog = false" />
                    <q-btn type="submit" color="primary" label="OK" style="width: 80px"
                        :loading="documentStore.$state.isLetterNumberProgress">
                        <template v-slot:loading>
                            {{ documentStore.$state.letterNumberProgress }} %
                            <q-spinner />
                        </template>
                    </q-btn>
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>