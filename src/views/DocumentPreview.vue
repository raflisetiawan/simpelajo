<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getDocumentById } from '../services/user/document';

const route: any = useRoute();
const router = useRouter();
const documentData: any = ref(null);

onMounted(async () => {
  documentData.value = await getDocumentById(route.params.id);
  document.title = `Simpel Ajo - Download`
})

function download(dataurl: any, filename: string) {
  const link = document.createElement("a");
  link.href = dataurl;
  link.download = filename;
  link.click();
}

const downloadDocument = async () => {
  download(documentData.value.downloadURL, "p.docx");
}

const hasHistory = () => { return window.history.length > 2 }
</script>
<template>
  <div class="container q-pa-md full-width text-center">
    <div class="row text-center" v-if="documentData != null">
      <div class="full-width text-center">
        <iframe class="iframe-placeholder text-center" :width="$q.screen.lt.md ? 300 : 600" height="800"
          :src="`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(documentData.downloadURL)}`"
          frameborder='0'>
          Loading...
        </iframe>
      </div>
    </div>
    <hr>
    <div class="text-center">
      <q-btn flat @click="hasHistory()
      ? router.go(-1)
      : router.push({ name: 'Services' })" class="q-mx-lg">Edit Lagi</q-btn>
      <q-btn color="primary" class="q-mx-lg" @click="downloadDocument">Download</q-btn>
    </div>
  </div>
</template>

<style>
.iframe-placeholder {
  background: url('../assets/Rolling-1s-100px.svg') 0px 0px no-repeat;
}
</style>