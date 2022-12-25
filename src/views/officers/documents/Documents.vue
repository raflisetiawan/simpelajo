<script setup lang="ts" async>
import { getAllDocument } from "@/services/officers/document";
import timeSince from "@/utils/timeSince";
import DocumentsBar from "@/components/DocumentsBar.vue";
import { useDocumentStore } from "@/stores/document";
import { ref } from "vue";

const documentStore = useDocumentStore();
const documents: any = ref(null);
documents.value = await getAllDocument();
documentStore.$state.documents = documents.value;
</script>

<template>
    <div class="container q-pa-md">
        <DocumentsBar />
        <div class="row">
            <template v-for="document in documentStore.$state.documents" :key="document.id">
                <div class="col-md-4 col-sm-12 col-xs-12">
                    <q-card bordered class="q-ma-sm">
                        <q-card-section>
                            <div class="text-h6">{{ document.data.serviceName }}</div>
                            <p>{{ timeSince(document.data.createdAt) }} ago</p>
                            <p>status: {{ document.data.status }}</p>
                        </q-card-section>

                        <q-separator />

                        <q-card-section>
                            <q-btn color="primary" class="full-width"
                                :to="{ name: 'Document', params: { id: document.id } }">
                                Lihat
                            </q-btn>
                        </q-card-section>
                    </q-card>
                </div>
            </template>
        </div>
    </div>
</template>