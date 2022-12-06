<script setup lang="ts">
import { useFormBuilderStore } from "../../stores/formBuilder";
import { useDialogStore } from "../../stores/dialogs";
import DeleteIconField from "../form-builder/DeleteIconField.vue";
import UpwardIcon from "../form-builder/UpwardIcon.vue";
import DownwardIcon from "../form-builder/DownwardIcon.vue";

const dialogStore = useDialogStore();
const formBuilderStore = useFormBuilderStore();
const props = defineProps(["labelField", "index"]);

const editTextFieldContents = (value: any) => {
    dialogStore.$state.numberFieldDialog.isAppear =
        !dialogStore.$state.numberFieldDialog.isAppear;
    dialogStore.$state.numberFieldDialog.action = "edit";
    dialogStore.$state.numberFieldDialog.index = value;
};

const formName: any = formBuilderStore.$state.formFields[props.index];
</script>

<template>
    <q-input v-model="formName.name" :label="labelField" @click="editTextFieldContents(index)" type="number"
        bottom-slots>
        <template v-slot:append>
            <UpwardIcon v-if="index != 0" :index="index" />
            <DeleteIconField :index="index" />
            <DownwardIcon v-if="index != formBuilderStore.$state.formFields.length - 1" :index="index" />
        </template>
    </q-input>
</template>
