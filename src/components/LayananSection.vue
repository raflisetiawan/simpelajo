<script setup async lang="ts">
import LayananSectionCard from "./LayananSectionCard.vue";
import { getServicesLimitBySix } from "../services/admin/service";
import { ref } from "vue";

const services: any = ref([]);
services.value = await getServicesLimitBySix();

</script>
<template>
  <section id="layanan" class="q-pa-md">
    <div class="container q-mb-md">
      <div class="row">
        <div class="col-12 text-center">
          <div class="text-h5">LAYANAN ADMINISTRASI SURAT KETERANGAN</div>
        </div>
      </div>
      <div class="row justify-center">
        <template v-for="service in services" :key="service.id">
          <LayananSectionCard :layananName="service.data.name" :layananSlug="service.data.slug" />
        </template>
      </div>
      <div class=" text-center">
        <q-btn color="blue" :to="{ name: 'Services' }" flat>Lihat selengkapnya</q-btn>
      </div>
    </div>
  </section>
</template>
