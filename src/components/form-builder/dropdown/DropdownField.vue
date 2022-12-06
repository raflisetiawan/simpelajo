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
    title: String,
    index: Number,
    optionsField: Array
})
const group = ref(null)

const editDropdownField = (index: any) => {
    dialogStore.$state.dropdownDialog.isAppear = !dialogStore.$state.dropdownDialog.isAppear
    dialogStore.$state.dropdownDialog.action = "edit";
    dialogStore.$state.dropdownDialog.index = index;
}
</script>

<template>
    <div class="q-mb-sm">
        <div class="text-h6">{{ title }} :
            <UpwardIcon v-if="index != 0" :index="index" />
            <DeleteIconField :index="index" />
            <DownwardIcon v-if="index != formBuilderStore.$state.formFields.length - 1" :index="index" />
            <q-btn icon="edit" flat color="green" size="sm" @click="editDropdownField(index)" />
        </div>
        <q-select v-model="group" :options="optionsField" />
    </div>
</template>
