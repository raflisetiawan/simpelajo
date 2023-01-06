<script setup lang="ts">
import { getFormByServiceId } from "@/services/admin/form";
import { useFormBuilderStore } from "@/stores/formBuilder";
import TextField from "./text-fields/TextField.vue";
import ParagraphField from "./paragraph/ParagraphField.vue";
import Gender from "./gender/Gender.vue";
import CheckboxField from "./checkboxes/checkboxField.vue";
import RadioField from "./radio/RadioField.vue";
import DateField from "./Date/DateField.vue";
import DropdownField from "./dropdown/DropdownField.vue";
import PhoneField from "./phone/PhoneField.vue";
import FileUploadField from "./file_upload/FileUploadField.vue";
import { getService, getAllServices } from "@/services/admin/service"
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router"
import { getAllForms } from "@/services/admin/form";
import NumberField from "../number/NumberField.vue";

const formBuilderStore = useFormBuilderStore();
formBuilderStore.$state.formFields = [{} = {}];
const loadingFormUpdate = ref(true);

const route: any = useRoute()
const service: any = ref()
const serviceName: any = ref([])
const formFields: any = ref(formBuilderStore.$state.formFields);
onMounted(async () => {
  if (route.params.id !== undefined) {
    service.value = await getService(route.params.id);
    serviceName.value.push(service.value.name);
    if (route.name == 'UpdateFormById') {
      const form: any = await getFormByServiceId(route.params.id);
      formFields.value = form.data.data;
      formBuilderStore.$state.formFields = form.data.data;
      formFields.value = formBuilderStore.$state.formFields;
      loadingFormUpdate.value = false;
    }
  } else {
    const response = await getAllServices();
    const forms: any = await getAllForms();
    const filteredService = response.filter((elem: { id: any; }) => !forms.find(({ data: { } }) => elem.id === route.params.id));
    filteredService.forEach((service: any) => {
      serviceName.value.push(service.data.name)
    })
  }
})

</script>

<template>
  <q-page class="q-form-builder-page">
    <div class="container q-ma-md">
      <div class="row">
        <div class="col">
          <div class="text-h6" v-if="route.name == 'UpdateFormById'">Edit Form</div>
          <div class="text-h6" v-else>Buat Form</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-7 col-sm-12 col-xs-12">
          <q-select v-model="formBuilderStore.$state.selectOption"
            @update:model-value="formBuilderStore.$state.notSelected = false" :options="serviceName"
            v-if="route.params.id === undefined" bottom-slots :error="formBuilderStore.$state.notSelected">
            <template v-slot:error>
              Layanan belum di pilih!!
            </template>
          </q-select>
          <q-select v-model="serviceName" :options="serviceName" v-else readonly />
          <div class="">
            <q-spinner color="primary" size="3em" class="q-ml-md q-mt-md"
              v-if="route.name == 'UpdateFormById' && loadingFormUpdate" />
          </div>
        </div>
      </div>
      <template v-for="(field, index) in formFields" :key="field.label">
        <div class="row">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <TextField v-if="field.type == 'text'" :index="index" :labelField="field.label" />
            <ParagraphField v-if="field.type == 'textarea'" :index="index" :labelField="field.label" />
            <Gender v-if="field.type == 'gender'" :index="index" />
            <CheckboxField v-if="field.type == 'checkbox'" :index="index" :titleField="field.title"
              :optionsField="field.options" />
            <RadioField v-if="field.type == 'radio'" :index="index" :title-field="field.title"
              :optionsField="field.options" :other="field.other" />
            <DateField v-if="field.type == 'date'" :index="index" :title="field.title" />
            <DropdownField v-if="field.type == 'dropdown'" :index="index" :title="field.title"
              :options-field="field.options" />
            <PhoneField v-if="field.type == 'phone'" :index="index" :labelField="field.label" />
            <FileUploadField v-if="field.type == 'file_upload'" :index="index" :title="field.title" />
            <NumberField v-if="field.type == 'number'" :index="index" :title="field.label" :label="field.label" />
          </div>
        </div>
      </template>
    </div>
  </q-page>
</template>
