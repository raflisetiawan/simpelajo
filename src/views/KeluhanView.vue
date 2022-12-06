<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from "vue";
import { insertComplaint } from "../services/user/complaint";
import { useComplaintStore } from "../stores/complaint";

const complaintStore = useComplaintStore();

const forms = reactive({
  name: null,
  complaint: null,
  suggestion: null,
  image: []
})
onMounted(() => document.title = "Simpel Ajo - Keluhan dan Aspirasi");

const onSubmit = async () => {
  complaintStore.$state.loading = true;
  await insertComplaint(forms);
}

watchEffect(() => {
  if (complaintStore.$state.isUploadDone) {
    forms.name = null;
    forms.complaint = null;
    forms.suggestion = null;
    forms.image = [];
  }
})

const isRejected = ref(false);

const rejectImage = () => {
  isRejected.value = true;
}

</script>
<template>
  <div class="container q-pa-md">
    <div class="text-h5">Keluhan dan aspirasi</div>
    <q-form @submit="onSubmit">
      <div class="row">
        <div class="col-md-8 col-sm-10 col-xs-10">
          <q-input v-model="forms.name" label="Nama" hint="tidak wajib" />
        </div>
        <div class="col-md-8 col-sm-10 col-xs-10">
          <q-input lazy-rules label="Keluhan anda" v-model="forms.complaint" autogrow
            :rules="[val => !!val || 'Harus diisi']" />
        </div>
        <div class="col-md-8 col-sm-10 col-xs-10">
          <q-input lazy-rules label="Saran Kedepan" v-model="forms.suggestion" autogrow
            :rules="[val => !!val || 'Harus diisi']" />
        </div>
        <div class="col-md-8 col-sm-10 col-xs-10">
          <q-file @update:model-value="isRejected = false" accept=".jpg, .png, .jfif, jpeg, image/*"
            label="Upload Gambar" hint="tidak wajib" @rejected="rejectImage" :error="isRejected" v-model="forms.image">
            <template v-slot:prepend>
              <q-icon name="image" />
            </template>
            <template v-slot:error>
              Yang anda upload bukan gambar
            </template>
          </q-file>
        </div>
        <div class="col-md-8 q-py-md col-sm-10 col-xs-10">
          <q-btn color="primary" type="submit" :loading="complaintStore.$state.loading">Kirim
            <template v-slot:loading>
              {{ complaintStore.$state.progress }} %
            </template>
          </q-btn>
        </div>
      </div>
    </q-form>
  </div>
</template>
