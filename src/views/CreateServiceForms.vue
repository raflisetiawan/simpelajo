<script setup lang="ts">
import { reactive } from "vue";

const data = reactive({
  name: "",
});
</script>

<template>
  <div class="container q-pa-md">
    <q-form>
      <div class="row">
        <div class="col-md-7 col-sm-12 col-xs-12">
          <q-input label="Nama Administrasi Layanan" v-model="data.name" />
        </div>
      </div>
    </q-form>
  </div>
</template>
