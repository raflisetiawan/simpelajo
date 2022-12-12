<script setup lang="ts">
import { useDialogStore } from '@/stores/dialogs';
import { phone } from 'phone';
import { ref } from 'vue';
const dialogStore = useDialogStore();
const props = defineProps(["documentData"]);
const phoneNumber: any = ref(phone(props.documentData.whatsapp, { country: 'ID' }).phoneNumber);
if (props.documentData.whatsapp !== undefined) {
    phoneNumber.value = phoneNumber.value.replace("+", "");
}
</script>
<template>
    <q-dialog v-model="dialogStore.$state.isSendViaDialog">
        <q-card style="width: 600px; max-width: 80vw;">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Kirim atau hubungi via</div>
                <q-space />
                <q-btn icon="close" flat round dense @click="dialogStore.$state.isSendViaDialog = false" />
            </q-card-section>

            <q-card-section>
                <div class="row text-center">
                    <div class="col-6">
                        <q-btn color="green" label="Whatsapp" v-if="(documentData.whatsapp !== undefined)"
                            icon="fa-brands fa-whatsapp" target="_blank"
                            :href="`https://api.whatsapp.com/send?phone=${phoneNumber}`" />
                    </div>
                    <div class="col-6">
                        <q-btn color="red" v-if="(documentData.email !== undefined)" icon="fa-regular fa-envelope"
                            :href="`mailto:${documentData.email}`" target="_blank" label="Email" />
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>