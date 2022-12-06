<script setup lang="ts">
import { ref } from "vue"
import { useDialogStore } from "@/stores/dialogs"
import { useFormBuilderStore } from "@/stores/formBuilder"
import UpwardIcon from "../UpwardIcon.vue";
import DeleteIconField from "../DeleteIconField.vue";
import DownwardIcon from "../DownwardIcon.vue";

const props = defineProps(["titleField", "index", "optionsField", "other"])

const group = ref(props.optionsField[0].label)
const dialogStore = useDialogStore();
const formBuilderStore = useFormBuilderStore();
const model = ref("");

const editRadioField = (index: any) => {
    dialogStore.$state.radioFieldDialog.isAppear = !dialogStore.$state.radioFieldDialog.isAppear
    dialogStore.$state.radioFieldDialog.action = "edit";
    dialogStore.$state.radioFieldDialog.index = index;
}
</script>
<template>
    <div class="text-h6">{{ titleField }} :
        <UpwardIcon v-if="index != 0" :index="index" />
        <DeleteIconField :index="index" />
        <DownwardIcon v-if="index != formBuilderStore.$state.formFields.length - 1" :index="index" />
        <q-btn icon="edit" flat color="green" size="sm" @click="editRadioField(index)" />
    </div>
    <q-option-group v-model="group" color="primary" :options="optionsField" />
    <q-input v-model="model" v-if="other" label="other" />
</template>