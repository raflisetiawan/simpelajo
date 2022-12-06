<script setup async lang="ts">
import { getServiceHasNotForm } from "@/services/admin/form";
import { getServiceHasNotLetter } from "@/services/admin/letter";
import { useLetterStore } from "@/stores/letter"

const letterStore = useLetterStore();
const props = defineProps(['serviceId', 'service']);
const serviceHasNotForm = await getServiceHasNotForm(props.serviceId);
let isServiceHasNotLetter = await getServiceHasNotLetter(props.serviceId)

const showUploadLetterDialog = () => {
    letterStore.$state.isUploadLetterDialog = true
    letterStore.$state.uploadLetterDialogService = props.service
}

</script>
<template>
    <q-btn v-if="!isServiceHasNotLetter" icon="edit_document" dense flat color="blue" class="q-ml-sm"
        @click="showUploadLetterDialog()">
        <q-tooltip>
            Buat Document
        </q-tooltip>
    </q-btn>
    <q-btn icon="note_add" dense flat class="q-ml-sm" v-if="!serviceHasNotForm" :to="{
        name: 'CreateFormById',
        params: { id: serviceId }
    }">
        <q-tooltip>
            Buat Form
        </q-tooltip>
    </q-btn>
</template>