<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useFormBuilderStore } from "@/stores/formBuilder";
import { useDialogStore } from "@/stores/dialogs";
const formBuilderStore = useFormBuilderStore();
const dialogStore = useDialogStore();

const label = ref("");
const required = ref(false);
const formBuilderStoreLabel: any = ref(formBuilderStore.$state.formFields);

const onSubmit = () => {
  if (dialogStore.$state.labelFieldDialog.type === "text") {
    if (dialogStore.$state.labelFieldDialog.action === "add") {
      formBuilderStore.$state.formFields.push({
        title: label.value,
        type: "text",
        label: label.value,
        required: required.value,
      });
      dialogStore.$state.labelFieldDialog.isAppear = false;
    } else {
      formBuilderStoreLabel.value[
        dialogStore.$state.labelFieldDialog.index
      ].label = label.value;
      formBuilderStoreLabel.value[
        dialogStore.$state.labelFieldDialog.index
      ].required = required.value;
      dialogStore.$state.labelFieldDialog.isAppear = false;
    }
  } else if (dialogStore.$state.labelFieldDialog.type === "phone") {
    if (dialogStore.$state.labelFieldDialog.action === "add") {
      formBuilderStore.$state.formFields.push({
        title: label.value,
        type: "phone",
        label: label.value,
        required: required.value,
      });
      dialogStore.$state.labelFieldDialog.isAppear = false;
    } else {
      formBuilderStoreLabel.value[
        dialogStore.$state.labelFieldDialog.index
      ].label = label.value;
      formBuilderStoreLabel.value[
        dialogStore.$state.labelFieldDialog.index
      ].required = required.value;
      dialogStore.$state.labelFieldDialog.isAppear = false;
    }
  }
  else {
    if (dialogStore.$state.labelFieldDialog.action === "add") {
      formBuilderStore.$state.formFields.push({
        title: label.value,
        type: "textarea",
        label: label.value,
        required: required.value,
      });
      dialogStore.$state.labelFieldDialog.isAppear = false;
    } else {
      formBuilderStoreLabel.value[
        dialogStore.$state.labelFieldDialog.index
      ].label = label.value;
      formBuilderStoreLabel.value[
        dialogStore.$state.labelFieldDialog.index
      ].required = required.value;
      dialogStore.$state.labelFieldDialog.isAppear = false;
    }
  }
};

watchEffect(() => {
  if (formBuilderStore.$state.formFields.length !== 0) {
    formBuilderStoreLabel.value = formBuilderStore.$state.formFields

  }
  // const formBuilderStoreLabel: any = ref(formBuilderStore.$state.formFields);
})
</script>

<template>
  <q-dialog v-model="dialogStore.$state.labelFieldDialog.isAppear" persistent>
    <q-card style="min-width: 350px">
      <q-form @submit.prevent="onSubmit">
        <q-card-section>
          <div class="text-h6">Judul text input</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input @click="" dense v-model="label" autofocus :rules="[(v) => !!v || 'harus diisi']" class="" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-toggle v-model="required" label="Harus diisi?" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="dialogStore.$state.labelFieldDialog.isAppear = false" />
          <q-btn flat label="OK" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
