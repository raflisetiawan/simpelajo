<script setup async lang="ts">
import { ref } from "vue";
import { getAllServices } from "@/services/admin/service";

const letters: any = ref([]);
const response = await getAllServices();
letters.value = response;
</script>

<template>
  <div class="container q-pa-md">
    <div class="row">
      <div class="col-md-4 col-sm-12 col-xs-12" v-for="letter in letters" :key="letter.id">
        <q-card class="my-card q-mx-xs q-mb-md">
          <q-card-section>
            <div class="text-h6">{{ letter.data.name }}</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="center">
            <q-btn color="primary" class="text-white"
              :to="{ name: 'CreateFormService', params: { slug: letter.data.slug } }">Buat
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>
