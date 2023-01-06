<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useDialogStore } from "@/stores/dialogs";
import { useFormBuilderStore } from "@/stores/formBuilder";
import DialogTextField from "./DialogLabel.vue";
import CheckboxDialog from "./checkboxes/CheckboxDialog.vue";
import RadioDialog from "./radio/RadioDialog.vue";
import DateDialog from "./Date/DateDialog.vue";
import DropdownDialog from "./dropdown/DropdownDialog.vue";
import FileUploadDialog from "./file_upload/FileUploadDialog.vue";
import { useRoute, useRouter } from "vue-router"
import { createForm, editForm } from "@/services/admin/form"
import { getService, getServiceBySlug } from "@/services/admin/service"
import { checkFormIsExistByServiceId } from "@/services/admin/form";
import { useQuasar } from "quasar";
import slugify from "slugify";
import NumberDialog from "@/components/number/NumberDialog.vue";
import { useDrawerStore } from "@/stores/drawer";

const route: any = useRoute()
const drawerStore = useDrawerStore();
const dialogStore = useDialogStore();
const formBuilderStore = useFormBuilderStore();
const router = useRouter()
const quasar = useQuasar()
const editLoading = ref(false);

onMounted(() => {
  formBuilderStore.$state.selectOption = "Pilih Layanan Administrasi"
  formBuilderStore.$state.isFormFieldNull = false;
})

const onClickTextButton = (value: any) => {
  if (formBuilderStore.$state.formFields === null) return formBuilderStore.$state.isFormFieldNull = true;
  dialogStore.$state.labelFieldDialog.isAppear =
    !dialogStore.$state.labelFieldDialog.isAppear;
  dialogStore.$state.labelFieldDialog.action = "add";
  dialogStore.$state.labelFieldDialog.type = value;
};
const onClickParagraphButton = (value: any) => {
  if (formBuilderStore.$state.formFields === null) return formBuilderStore.$state.isFormFieldNull = true;
  dialogStore.$state.labelFieldDialog.isAppear =
    !dialogStore.$state.labelFieldDialog.isAppear;
  dialogStore.$state.labelFieldDialog.action = "add";
  dialogStore.$state.labelFieldDialog.type = value;
};

const onClickGenderButton = () => {
  if (formBuilderStore.$state.formFields === null) return formBuilderStore.$state.isFormFieldNull = true;
  formBuilderStore.$state.formFields.push({
    type: "gender",
    title: "Jenis Kelamin",
    label: ["Laki-Laki", "Perempuan"]
  });
};

const onClickCheckBox = () => {
  if (formBuilderStore.$state.formFields === null) return formBuilderStore.$state.isFormFieldNull = true;
  dialogStore.$state.checkboxFieldDialog.isAppear =
    !dialogStore.$state.checkboxFieldDialog.isAppear;
  dialogStore.$state.checkboxFieldDialog.action = "add"
};

const onClickRadio = () => {
  if (formBuilderStore.$state.formFields === null) return formBuilderStore.$state.isFormFieldNull = true;
  dialogStore.$state.radioFieldDialog.isAppear =
    !dialogStore.$state.radioFieldDialog.isAppear;
  dialogStore.$state.radioFieldDialog.action = "add"
}

const onClickDate = () => {
  if (formBuilderStore.$state.formFields === null) return formBuilderStore.$state.isFormFieldNull = true;
  dialogStore.$state.dateFieldDialog.isAppear =
    !dialogStore.$state.dateFieldDialog.isAppear;
  dialogStore.$state.dateFieldDialog.action = "add"
}

const onClickDropdown = () => {
  if (formBuilderStore.$state.formFields === null) return formBuilderStore.$state.isFormFieldNull = true;
  dialogStore.$state.dropdownDialog.isAppear = !dialogStore.$state.dropdownDialog.isAppear
}

const onClickNumber = () => {
  dialogStore.$state.numberFieldDialog.action = "add";
  dialogStore.$state.numberFieldDialog.isAppear = !dialogStore.$state.numberFieldDialog.isAppear
}

const onClickPhone = () => {
  dialogStore.$state.labelFieldDialog.isAppear =
    !dialogStore.$state.labelFieldDialog.isAppear;
  dialogStore.$state.labelFieldDialog.action = "add";
  dialogStore.$state.labelFieldDialog.type = "phone";
}

const onClickFileUpload = () => {
  dialogStore.$state.fileUploadDialog.isAppear = !dialogStore.$state.fileUploadDialog.isAppear
}


const onSubmit = async () => {
  if (formBuilderStore.$state.formFields === null || formBuilderStore.$state.formFields.length === 0) {
    formBuilderStore.$state.isFormFieldNull = true;
    quasar.notify({
      color: "red",
      message: "Form harus diisi",
      position: "top-right"
    })
    return false;
  }
  if (route.params.id === undefined) {
    if (formBuilderStore.$state.selectOption !== "Pilih Layanan Administrasi") {
      let slug = slugify(formBuilderStore.$state.selectOption, { lower: true });
      const serviceData: any = await getServiceBySlug(slug);
      const formIsExistByServiceId = await checkFormIsExistByServiceId(serviceData.id);
      if (!formIsExistByServiceId) {
        await createForm(formBuilderStore.$state.formFields, serviceData.id)
        formBuilderStore.$state.formFields = [{}];
        router.push({ name: "CreateFormService", params: { slug } })
      }
      else {
        quasar.notify({
          color: "warning",
          message: "Form sudah ada!",
          position: "top-right"
        })
      }
    } else {
      formBuilderStore.$state.notSelected = true;
    }
  } else {
    const formIsExistByServiceId = await checkFormIsExistByServiceId(route.params.id);
    if (!formIsExistByServiceId) {
      const serviceData: any = await getService(route.params.id);
      await createForm(formBuilderStore.$state.formFields, route.params.id)
      formBuilderStore.$state.formFields = [];
      router.push({ name: "CreateFormService", params: { slug: serviceData.slug } })
    }
    else {
      quasar.notify({
        color: "warning",
        message: "Form sudah ada!",
        position: "top-right"
      })
    }
  }
}
const onUpdate = async () => {
  if (formBuilderStore.$state.formFields === null || formBuilderStore.$state.formFields.length === 0) {
    formBuilderStore.$state.isFormFieldNull = true;
    quasar.notify({
      color: "red",
      message: "Form harus diisi",
      position: "top-right"
    })
    return false;
  }
  else {
    editLoading.value = true;
    await editForm(formBuilderStore.$state.formFields, route.params.id)
    try {
      const serviceData: any = await getService(route.params.id);
      editLoading.value = false;
      formBuilderStore.$state.formFields = [{}];
      router.push({ name: "CreateFormService", params: { slug: serviceData.slug } })
    } catch (error) {
      console.log(error);
      editLoading.value = false;
    }
  }

}

</script>

<template>
  <q-drawer v-model="drawerStore.$state.isShowUp" show-if-above :width="350" :breakpoint="700" bordered class="q-ma-sm">
    <q-btn icon="text_fields" label="Text" outline @click="onClickTextButton('text')" class="q-mt-sm q-ml-sm" />
    <q-btn label="Paragraph" icon="segment" outline class="q-ml-sm q-mt-sm"
      @click="onClickParagraphButton('paragraph')" />
    <q-btn label="Jenis kelamin" icon="man" outline class="q-ml-sm q-mt-sm" @click="onClickGenderButton" />
    <q-btn label="Checkbox" outline icon="check_box" class="q-ml-sm q-mt-sm" @click="onClickCheckBox()" />
    <q-btn label="Multi choice" outline icon="radio_button_checked" class="q-ml-sm q-mt-sm" @click="onClickRadio" />
    <q-btn label="Date" outline icon="calendar_month" class="q-ml-sm q-mt-sm" @click="onClickDate" />
    <q-btn label="Dropdown" outline icon="arrow_drop_down" class="q-ml-sm q-mt-sm" @click="onClickDropdown" />
    <q-btn label="Phone" outline icon="phone" class="q-ml-sm q-mt-sm" @click="onClickPhone" />
    <q-btn label="File upload" disable outline icon="cloud_upload" class="q-ml-sm q-mt-sm" @click="onClickFileUpload" />
    <q-btn label="Number" outline icon="pin" class="q-ml-sm q-mt-sm" @click="onClickNumber" />
    <q-space />
    <q-btn label="Edit" color="primary" class="q-mt-md q-ml-sm" @click="onUpdate" :loading="editLoading"
      v-if="route.name == 'UpdateFormById'" />
    <q-btn label="Submit" v-else color="primary" class="q-mt-md q-ml-sm" @click="onSubmit" />
    <DialogTextField />
    <CheckboxDialog />
    <RadioDialog />
    <DateDialog />
    <DropdownDialog />
    <FileUploadDialog />
    <NumberDialog />
  </q-drawer>
</template>
