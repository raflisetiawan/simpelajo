<script setup lang="ts">
import getUser from "@/services/user/getUsers";
import { onMounted, ref } from "vue";

const userLength = ref(0);

onMounted(async () => {
  const response = await getUser();
  userLength.value = response.length;
});
</script>

<template>
  <div class="container q-ma-md">
    <div class="row">
      <div class="col-md-4">
        <q-card class="q-pa-md q-ma-md">
          <div class="text-h6">Jumlah User : {{ userLength }}</div>
          <q-separator />
          <q-btn class="q-my-md" color="primary" :to="{ name: 'ManageUser' }">Detail</q-btn>
        </q-card>
      </div>
      <div class="col-md-4">
        <q-card class="q-pa-md q-ma-md">
          <div class="text-h6">Buat Layanan Administrasi Baru</div>
          <q-separator />
          <q-btn class="q-my-md" color="primary" :to="{ name: 'AllServices' }">Detail</q-btn>
        </q-card>
      </div>
      <div class="col-md-4">
        <q-card class="q-pa-md q-ma-md">
          <div class="text-h6">Buat peran baru</div>
          <q-separator />
          <q-btn class="q-my-md" color="primary" disabled>Buat</q-btn>
        </q-card>
      </div>
      <div class="col-md-4">
        <q-card class="q-pa-md q-ma-md">
          <div class="text-h6">Buat Form Baru</div>
          <q-separator />
          <q-btn class="q-my-md" color="primary">Lihat</q-btn>
          <q-btn class="q-my-md float-right" color="primary" :to="{ name: 'CreateForm' }">Buat</q-btn>
        </q-card>
      </div>
      <div class="col-md-4">
        <q-card class="q-pa-md q-ma-md">
          <div class="text-h6">Edit Nomer Whatsapp dan email</div>
          <p>Pada halaman beranda</p>
          <q-separator />
          <q-btn class="q-my-md" color="primary" :to="{ name: 'NumberAndEmail' }">edit</q-btn>
        </q-card>
      </div>
    </div>
  </div>
</template>
