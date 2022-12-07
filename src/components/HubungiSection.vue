<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { insertContact } from "../services/officers/contact"
import { getNumberAndEmail } from "../services/admin/numberandemail";
import { phone } from "phone";

const form: any = reactive({
  name: "",
  message: ""
})
const numberAndEmail: any = ref([]);
const loading = ref(false)
const phoneNumber: any = ref("");
onMounted(async () => {
  numberAndEmail.value = await getNumberAndEmail();
  phoneNumber.value = phone(numberAndEmail.value[0].data.number, { country: 'ID' }).phoneNumber;
  phoneNumber.value = phoneNumber.value.replace("+", "");
})

const onSubmit = async () => {
  loading.value = true;
  await insertContact(form);
  form.name = null;
  form.message = null;
  loading.value = false;
}
</script>
<template>
  <section id="hubungi" class="q-pa-md bg-krem">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <div class="text-h5">Hubungi Petugas</div>
        </div>
      </div>
      <q-form @submit.prevent="onSubmit">
        <div class="row q-pa-md">
          <div class="col-md-8 col-sm-10 col-xs-10">
            <q-input label="Nama" v-model="form.name" />
            <q-input label="Pesan" v-model="form.message" :rules="[val => !!val || 'Harus diisi']" />
            <q-btn :loading="loading" type="submit" class="q-mt-md" color="primary" label="Kirim" />
          </div>
        </div>
      </q-form>
      <div class="row" v-if="numberAndEmail.length !== 0">
        <div class="col-md-6 col-sm-6 col-xs-12 text-center q-py-md">
          <q-btn target="_blank" :href="`https://api.whatsapp.com/send?phone=${phoneNumber}`" size="md"
            icon="fa-brands fa-whatsapp" label="Hubungi Via Whatsapp" color="green" />
        </div>
        <div class="col-md-6 col-sm-6 col-xs-12 text-center q-py-md">
          <q-btn size="md" icon="fa-regular fa-envelope" target="_blank"
            :href="`mailto:${numberAndEmail[0].data.email}`" label="Hubungi Via Email" color="red-7" />
        </div>
      </div>
    </div>
  </section>
</template>
