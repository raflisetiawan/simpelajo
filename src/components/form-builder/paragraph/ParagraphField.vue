<script setup lang="ts">
import { useDialogStore } from "@/stores/dialogs";
import { useFormBuilderStore } from "@/stores/formBuilder";
import { ref } from "vue";
import DeleteIconField from "../DeleteIconField.vue";
import DownwardIcon from "../DownwardIcon.vue";
import UpwardIcon from "../UpwardIcon.vue";

const dialogStore = useDialogStore();
const formBuilderStore = useFormBuilderStore();
defineProps({
  labelField: String,
  index: Number,
});
const model = ref("");

const editParagraphFieldContents = (value: any) => {
  dialogStore.$state.labelFieldDialog.isAppear =
    !dialogStore.$state.labelFieldDialog.isAppear;
  dialogStore.$state.labelFieldDialog.action = "edit";
  dialogStore.$state.labelFieldDialog.index = value;
};
</script>

<template>
  <q-input v-model="model" type="textarea" :label="labelField" @click="editParagraphFieldContents(index)" bottom-slots>
    <template v-slot:append>
      <UpwardIcon v-if="index != 0" :index="index" />
      <DeleteIconField :index="index" />
      <DownwardIcon v-if="index != formBuilderStore.$state.formFields.length - 1" :index="index" />
    </template>
  </q-input>
</template>
