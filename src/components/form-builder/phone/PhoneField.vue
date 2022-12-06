<script setup lang="ts">
import { useFormBuilderStore } from "@/stores/formBuilder";
import { useDialogStore } from "@/stores/dialogs";
import DeleteIconField from "../DeleteIconField.vue";
import UpwardIcon from "../UpwardIcon.vue";
import DownwardIcon from "../DownwardIcon.vue";
import { ref } from "vue";

const dialogStore = useDialogStore();
const formBuilderStore = useFormBuilderStore();
const props = defineProps({
    labelField: String,
    index: Number,
});

const model = ref("");

const editPhoneContents = (value: any) => {
    dialogStore.$state.labelFieldDialog.isAppear =
        !dialogStore.$state.labelFieldDialog.isAppear;
    dialogStore.$state.labelFieldDialog.action = "edit";
    dialogStore.$state.labelFieldDialog.index = value;
};
</script>

<template>
    <q-input v-model="model" :label="labelField" @click="editPhoneContents(index)" bottom-slots type="number">
        <template v-slot:prepend>
            <q-icon name="phone" />
        </template>
        <template v-slot:append>
            <UpwardIcon v-if="index != 0" :index="index" />
            <DeleteIconField :index="index" />
            <DownwardIcon v-if="index != formBuilderStore.$state.formFields.length - 1" :index="index" />
        </template>
    </q-input>
</template>
