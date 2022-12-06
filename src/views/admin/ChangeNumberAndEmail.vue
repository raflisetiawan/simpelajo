<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { getNumberAndEmail, updateNumberAndEmail } from "@/services/admin/numberandemail";
import isEmail from "validator/es/lib/isEmail";

const numberAndEmail = ref();
const form = reactive({
    number: "",
    email: ""
})
const loading = ref(false);

const onSubmit = async () => {
    loading.value = true;
    await updateNumberAndEmail(numberAndEmail.value[0].id, form)
    loading.value = false;
}

onMounted(async () => {
    numberAndEmail.value = await getNumberAndEmail();
    form.number = numberAndEmail.value[0].data.number
    form.email = numberAndEmail.value[0].data.email
})
</script>
<template>
    <div class="container q-ma-md">
        <q-form @submit.prevent="onSubmit">
            <div class="row">
                <div class="col-md-7 col-sm-12 col-xs-12 q-ma-sm">
                    <q-input v-model="form.number" label="Nomor Whatsapp" type="number"
                        :rules="[(val) => !!val || 'Tidak boleh kosong']" />
                </div>
                <div class="col-md-7 col-sm-12 col-xs-12 q-ma-sm">
                    <q-input label="Email" v-model="form.email" :rules="[
                        (val) => !!val || 'Tidak boleh kosong',
                        () => isEmail(form.email) || 'Email tidak valid',
                    ]" />
                </div>
                <div class="col-md-7 col-sm-12 col-xs-12 q-ma-sm">
                    <q-btn type="submit" color="primary" :loading="loading">Edit</q-btn>
                </div>
            </div>
        </q-form>
    </div>
</template>