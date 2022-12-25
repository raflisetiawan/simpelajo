<script setup async lang="ts">
import { ref } from "vue";
import { getAllServices, filterLetter } from "@/services/admin/service";

const letters: any = ref([]);
const keyword = ref("");
const response = await getAllServices();
letters.value = response;

const filterLetters = async (e: any) => {
  if (keyword.value.length !== 0) {
    let data: any = [];
    letters.value.filter((letterName: any) => {
      const cok: any = letterName.data.name.match(keyword.value);
      if (cok !== null) data.push(cok);
    })
    data.forEach(async (d: any) => {
      letters.value = await filterLetter(d.input);
    });
  } else {
    const response = await getAllServices();
    letters.value = response;
  }
}
</script>

<template>
  <div class="container q-pa-md">
    <div class="row justify-center q-mb-md">
      <div class="col-md-6 col-xs-10 col-sm-10 text-center">
        <q-input class="text-center" @keyup="filterLetters($event)" v-model="keyword" label="Cari" dense>
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
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
