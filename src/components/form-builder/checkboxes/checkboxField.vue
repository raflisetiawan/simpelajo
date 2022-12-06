<script setup lang="ts">
import { ref } from "vue";
import { useDialogStore } from "@/stores/dialogs"
import { useFormBuilderStore } from "@/stores/formBuilder"
import UpwardIcon from "../UpwardIcon.vue";
import DeleteIconField from "../DeleteIconField.vue";
import DownwardIcon from "../DownwardIcon.vue";

const dialogStore = useDialogStore();
const formBuilderStore = useFormBuilderStore();

defineProps({
  titleField: String,
  index: Number,
  optionsField: []
})
const group = ref([])

const editCheckboxField = (index: any) => {
  dialogStore.$state.checkboxFieldDialog.isAppear = !dialogStore.$state.checkboxFieldDialog.isAppear
  dialogStore.$state.checkboxFieldDialog.action = "edit";
  dialogStore.$state.checkboxFieldDialog.index = index;
}
</script>

<template>
  <div class="q-mb-sm">
    <div class="text-h6">{{ titleField }} :
      <UpwardIcon v-if="index != 0" :index="index" />
      <DeleteIconField :index="index" />
      <DownwardIcon v-if="index != formBuilderStore.$state.formFields.length - 1" :index="index" />
      <q-btn icon="edit" flat color="green" size="sm" @click="editCheckboxField(index)" />
    </div>

    <q-option-group v-model="group" :options="optionsField" type="checkbox" bottom-slots>
    </q-option-group>

  </div>
</template>
