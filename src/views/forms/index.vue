<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getServiceBySlug } from "@/services/admin/service"
import { getFormByServiceId } from "@/services/admin/form"
import TextFieldForm from "@/components/forms/TextFieldForm.vue"
import { useFormStore } from "@/stores/form";
import PhoneFieldForm from "@/components/forms/PhoneFieldForm.vue";
import GenderField from "@/components/forms/GenderField.vue";
import ParagraphField from "@/components/forms/ParagraphField.vue";
import CheckboxFieldForm from "@/components/forms/CheckboxFieldForm.vue";
import MultichoiceFieldForm from "@/components/forms/MultichoiceFieldForm.vue";
import DateFieldForm from "@/components/forms/DateFieldForm.vue";
import DropdownFieldForm from "@/components/forms/DropdownFieldForm.vue";
import FileuploadFieldForm from "@/components/forms/FileuploadFieldForm.vue";
import NumberFieldForm from "@/components/forms/NumberFieldForm.vue";
import { getLetterByServiceId } from "@/services/admin/letter"
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { insertDocumentToStorage, getLetterBySlug } from "@/services/user/document";
import { useDocumentStore } from "@/stores/document";
import { formatDate, formattedToday } from "@/utils/formattedToday";
import { useDialogStore } from "@/stores/dialogs";
import SendViaDialog from "./SendViaDialog.vue";
import { useQuasar } from "quasar";
import isEmpty from "validator/lib/isEmpty";

const route: any = useRoute();
const quasar = useQuasar();
const forms: any = ref([]);
const formStore: any = useFormStore()
const loading = ref(false);
const letter: any = ref();
const documentStore = useDocumentStore();
const dialogStore = useDialogStore();
const getService: any = ref(null);

onMounted(async () => {
    loading.value = true;
    getService.value = await getServiceBySlug(route.params.slug);
    const response: any = await getFormByServiceId(getService.value.id);
    letter.value = await getLetterByServiceId(getService.value.id);
    document.title = `Simpel Ajo - ${getService.value.data.name}`;
    try {
        forms.value = response.data.data
        formStore.$state.forms = forms.value;
        loading.value = false
    } catch (error) {
        loading.value = false
    }
})

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
        let title: any = {};
        forms.value.map((form: any) => {
            title[form.title] = form.name;
        })
        title.Tanggal = formattedToday;

        if (title['Tanggal Lahir'] !== undefined) title['Tanggal Lahir'] = formatDate(title['Tanggal Lahir'])
        title["Nomor Surat"] = "{Nomor Surat}";

        if (!isEmpty(documentStore.$state.sendVia.whatsapp) && !isEmpty(documentStore.$state.sendVia.email)) {
            title.whatsapp = documentStore.$state.sendVia.whatsapp;
            title.email = documentStore.$state.sendVia.email;
        }
        else if (!isEmpty(documentStore.$state.sendVia.whatsapp)) title.whatsapp = documentStore.$state.sendVia.whatsapp;
        else if (!isEmpty(documentStore.$state.sendVia.email)) title.email = documentStore.$state.sendVia.email;
        else {
            quasar.notify({
                message: "Tidak ada via sosmed yang bisa dikirimkan dokumen",
                color: "red",
                position: "top-right"
            })
            return false;
        }
        doc.setData(title);
        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render();
        } catch (error: any) {
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
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
        await insertDocumentToStorage(out, letter.value, title)
        // Output the document using Data-URI
    });
}

const onSubmit = async () => {
    documentStore.$state.loadingButton = true;
    const letter: any = await getLetterBySlug(route.params.slug);
    await renderDoc(letter.data.downloadURL);
}

const nextSubmit = () => {
    dialogStore.$state.isSendDocument = true;
}
</script>
<template>
    <q-linear-progress indeterminate v-if="loading" />
    <div class="container q-pa-md">
        <div class="row" v-if="getService !== null">
            <div class="col-12 text-center">
                <div class="text-h6">
                    {{ getService.data.name }}
                </div>
            </div>
        </div>
        <q-form @submit="nextSubmit">
            <div class="row">
                <template v-for="(form, index) in forms">
                    <div class="col-md-7 col-sm-12 col-xs-12 q-mb-sm">
                        <TextFieldForm :index="index" :label="form.label" :required="form.required"
                            v-if="form.type == 'text'" />
                        <PhoneFieldForm :index="index" :label="form.label" :required="form.required"
                            v-if="form.type == 'phone'" />
                        <GenderField :index="index" v-if="form.type == 'gender'" />
                        <ParagraphField :index="index" :label="form.label" :required="form.required"
                            v-if="form.type == 'textarea'" />
                        <CheckboxFieldForm :index="index" v-if="form.type == 'checkbox'" :title="form.title" />
                        <MultichoiceFieldForm :index="index" v-if="form.type == 'radio'" :title="form.title"
                            selected="0" :other="form.other" />
                        <DateFieldForm :index="index" v-if="form.type == 'date'" :title="form.title" />
                        <DropdownFieldForm :index="index" v-if="form.type == 'dropdown'" :title="form.title" />
                        <FileuploadFieldForm :index="index" v-if="form.type == 'file_upload'" :size="form.size"
                            :select="form.select" :title="form.title" />
                        <NumberFieldForm :index="index" :label="form.label" :required="form.required"
                            v-if="form.type == 'number'" />
                    </div>
                </template>
                <div class="col-md-7 col-sm-12 col-xs-12 q-mb-sm q-mt-md">
                    <q-btn type="submit" :disabled="loading" color="primary">Lanjut
                    </q-btn>
                </div>
            </div>
        </q-form>
    </div>
    <SendViaDialog @onSubmitForm="onSubmit" />
</template>