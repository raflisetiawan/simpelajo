<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useDialogStore } from "@/stores/dialogs";
import { updateStatus } from "@/services/officers/document";

const dialogStore = useDialogStore();

const group = ref(null);

const options = [
    { label: 'Terima', value: 'accept' },
    { label: 'Pending', value: 'pending' },
    { label: 'Tolak', value: 'reject' }
];

const props = defineProps(['documentId', 'status']);
const loading = ref(false);

const onOk = async () => {
    loading.value = true;
    await updateStatus(props.documentId, group.value);
    dialogStore.$state.isStatusDialog = false;
    loading.value = false;
}

watchEffect(() => {
    if (props.status) group.value = props.status
})

</script>
<template>
    <q-dialog v-model="dialogStore.$state.isStatusDialog">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Ubah Status</div>
                <q-space />
                <q-btn icon="close" flat round dense @click="dialogStore.$state.isStatusDialog = false" />
            </q-card-section>

            <q-card-section>
                <q-option-group :options="options" type="radio" v-model="group" />
                <q-btn :loading="loading" color="primary" @click="onOk">OK</q-btn>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>