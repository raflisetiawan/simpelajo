<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getPendingDocuments } from "@/services/officers/document";

const pendingDocuments: any = ref(null);
const loadingPendingDocuments = ref(true);

onMounted(async () => {
  pendingDocuments.value = await getPendingDocuments();
  loadingPendingDocuments.value = false;
})
</script>
<template>
  <div class="container q-pa-sm">
    <div class="row justify-center">
      <div class="col-md-4 col-sm-12 col-xs-12">
        <q-card class="my-card q-ma-sm">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Pesan Warga</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="center">
            <q-btn flat class="full-width" :to="{ name: 'Contact' }">Lihat</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12">
        <q-card class="my-card q-ma-sm">
          <q-card-section class="bg-primary text-white">
            <q-badge v-if="!loadingPendingDocuments" color="red" floating>{{
                pendingDocuments.length
            }}</q-badge>
            <q-spinner v-else color="blue" size="2em" class="float-right" />
            <div class="text-h6">Dokumen warga</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="center">
            <q-btn flat class="full-width" :to="{ name: 'Documents' }">Lihat</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12">
        <q-card class="my-card q-ma-sm">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Keluhan dan aspirasi warga</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="center">
            <q-btn flat class="full-width" :to="{ name: 'Complaint' }">Lihat</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>
