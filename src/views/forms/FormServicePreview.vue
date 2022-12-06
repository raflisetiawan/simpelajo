<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getServiceBySlug } from "../../services/admin/service"
import { getFormByServiceId } from "../../services/admin/form"
import TextFieldForm from "../../components/forms/TextFieldForm.vue"
import { useFormStore } from "../../stores/form";
import PhoneFieldForm from "../../components/forms/PhoneFieldForm.vue";
import GenderField from "../../components/forms/GenderField.vue";
import ParagraphField from "../../components/forms/ParagraphField.vue";
import CheckboxFieldForm from "../../components/forms/CheckboxFieldForm.vue";
import MultichoiceFieldForm from "../../components/forms/MultichoiceFieldForm.vue";
import DateFieldForm from "../../components/forms/DateFieldForm.vue";
import DropdownFieldForm from "../../components/forms/DropdownFieldForm.vue";
import FileuploadFieldForm from "../../components/forms/FileuploadFieldForm.vue";
import { getLetterByServiceId } from "../../services/admin/letter"
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { insertDocumentToStorage, getLetterBySlug } from "../../services/user/document";

const route = useRoute();
const forms = ref({})
const formStore = useFormStore()
const loading = ref(false);
const letter = ref(null)
onMounted(async () => {
    loading.value = true;
    const getService = await getServiceBySlug(route.params.slug)
    const response = await getFormByServiceId(getService.id);
    letter.value = await getLetterByServiceId(getService.id, getService);
    console.log(getService);

    try {
        forms.value = response.data.data
        formStore.$state.forms = forms.value;
        loading.value = false
    } catch (error) {
        loading.value = false
    }
})

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

const renderDoc = async (url) => {
    loadFile(url, async function (
        error,
        content
    ) {
        if (error) {
            throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
        let title = {};
        console.log(forms.value);
        forms.value.map((form) => {
            title[form.title] = form.name;
        })
        doc.setData(title);
        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render();
        } catch (error) {
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
            function replaceErrors(key, value) {
                if (value instanceof Error) {
                    return Object.getOwnPropertyNames(value).reduce(function (
                        error,
                        key
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
                    .map(function (error) {
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
        await insertDocumentToStorage(out, letter.value)
        // Output the document using Data-URI
    });
}

const onSubmit = async () => {
    const letter = await getLetterBySlug(route.params.slug);
    await renderDoc(letter.data.downloadURL);
}

</script>
<template>
    <q-linear-progress indeterminate v-if="loading" />
    <div class="container q-pa-md">
        <q-form @submit="onSubmit">
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
                    </div>
                </template>
                <div class="col-md-7 col-sm-12 col-xs-12 q-mb-sm q-mt-md">
                    <q-btn type="submit" color="primary" :disabled="loading">submit</q-btn>
                </div>
            </div>
        </q-form>
    </div>
</template>