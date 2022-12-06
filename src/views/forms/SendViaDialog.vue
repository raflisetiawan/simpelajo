<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useDialogStore } from "@/stores/dialogs";
import { useDocumentStore } from "@/stores/document";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import { useQuasar } from "quasar";

const documentStore = useDocumentStore();
const emit = defineEmits(["onSubmitForm"]);
const whatsappCheck = ref(true);
const emailCheck = ref(false);
const quasar = useQuasar();
const onSubmit = () => {
    if (!whatsappCheck.value && !emailCheck.value) {
        quasar.notify({
            message: "Pilih salah satu via pengiriman",
            color: "red",
            position: "top-right"
        })
        documentStore.$state.loadingButton = false;
    } else {
        emit("onSubmitForm");
    }
}

watchEffect(() => {
    if (whatsappCheck.value === false) documentStore.$state.sendVia.whatsapp = "";
    else if (emailCheck.value === false) documentStore.$state.sendVia.email = "";
})

const dialogStore = useDialogStore();
</script>
<template>
    <q-dialog v-model="dialogStore.$state.isSendDocument" persistent>
        <q-card style="width: 700px; max-width: 80vw;">
            <q-form @submit="onSubmit">
                <q-card-section class=" row items-center q-pb-none">
                    <div class="text-h6">Kirim Document Via</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-card-section>
                    <q-checkbox v-model="whatsappCheck" label="Whatsapp" />
                    <q-checkbox v-model="emailCheck" label="Email" />
                </q-card-section>

                <q-card-section>
                    <q-input v-if="whatsappCheck" v-model="documentStore.$state.sendVia.whatsapp" label="Nomor Whatsapp"
                        :rules="[(v) => !!v || 'Harus diisi', (v) => isMobilePhone(v, 'id-ID') || 'Nomor tidak valid']"
                        type="number">
                        <template v-slot:prepend>
                            <q-icon name="fa-brands fa-whatsapp" />
                        </template>
                    </q-input>
                    <q-input v-if="emailCheck" v-model="documentStore.$state.sendVia.email" label="Email"
                        :rules="[(v) => !!v || 'Harus diisi', (v) => isEmail(v) || 'Email tidak valid']">
                        <template v-slot:prepend>
                            <q-icon name="fa-solid fa-envelope" />
                        </template>
                    </q-input>
                </q-card-section>
                <q-card-section>
                    <q-btn type="submit" :loading="documentStore.$state.loadingButton" color="primary">submit
                        <template v-slot:loading>
                            {{ documentStore.$state.documentProgress }}
                            <q-spinner />
                        </template>
                    </q-btn>
                </q-card-section>
            </q-form>
        </q-card>
    </q-dialog>
</template>