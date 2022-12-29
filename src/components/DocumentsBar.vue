<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useDocumentStore } from '@/stores/document';
import { filterDocuments } from "@/services/officers/document";

const documentStore = useDocumentStore();
const text = ref("");
const filterDialog = ref(false);
const status = reactive({
    isAccepted: false,
    isPending: false,
    isRejected: false
})

const filterDocumentsFromService = async () => {
    const documents = await filterDocuments(status.isAccepted, status.isPending, status.isRejected);
    if (documents !== 0) documentStore.$state.documents = documents;
    filterDialog.value = false;

}
</script>
<template>
    <div class="row justify-center q-mb-md">
        <div class="col-1 q-ml-md">
            <q-btn icon="filter_alt" flat dense @click="filterDialog = true" label="Filter">
                <q-tooltip>
                    Filter
                </q-tooltip>
            </q-btn>
        </div>
    </div>
    <q-dialog v-model="filterDialog">
        <q-card>
            <q-form @submit="filterDocumentsFromService">
                <q-card-section>
                    <div class="text-h6">Filter</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="q-pa-md">
                        <q-checkbox v-model="status.isAccepted" label="Di terima" />
                        <q-checkbox v-model="status.isPending" label="Di tunggu" />
                        <q-checkbox v-model="status.isRejected" label="Di tolak" />
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Filter" color="primary" type="submit" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>