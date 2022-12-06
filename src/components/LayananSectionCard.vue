<script setup lang="ts">
defineProps({
  layananName: String,
  layananSlug: String
});
</script>
<template>
  <div class="col-md-4 col-sm-6 col-xs-10 q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{ layananName }}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="center">
        <q-btn color="primary" :to="{ name: 'CreateFormService', params: { slug: layananSlug } }">Buat</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
