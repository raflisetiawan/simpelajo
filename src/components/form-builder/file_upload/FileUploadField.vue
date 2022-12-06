<script setup lang="ts">
import UpwardIcon from "../UpwardIcon.vue";
import DeleteIconField from "../DeleteIconField.vue";
import DownwardIcon from "../DownwardIcon.vue";
import { useDialogStore } from "../../../stores/dialogs"
import { useFormBuilderStore } from "../../../stores/formBuilder"
import { ref } from "vue";

const dialogStore = useDialogStore();
const formBuilderStore = useFormBuilderStore();
const model = ref([]);

defineProps({
    title: String,
    index: null,
})

const editRadioField = (index: null) => {
    dialogStore.$state.fileUploadDialog.isAppear = !dialogStore.$state.fileUploadDialog.isAppear
    dialogStore.$state.fileUploadDialog.action = "edit";
    dialogStore.$state.fileUploadDialog.index = index;
}

</script>
<template>
    <q-file v-model="model" :label="title" bottom-slots>
        <template v-slot:prepend>
            <q-icon name="cloud_upload" />
        </template>
        <template v-slot:append>
            <UpwardIcon v-if="index != 0" :index="index" />
            <DeleteIconField :index="index" />
            <DownwardIcon v-if="index != formBuilderStore.$state.formFields.length - 1" :index="index" />
            <q-btn icon="edit" flat color="green" size="sm" @click="editRadioField(index)" />
        </template>
    </q-file>
</template>