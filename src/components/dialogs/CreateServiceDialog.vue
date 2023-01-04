<script setup lang="ts">
import { ref } from "vue";
import { useFormBuilderStore } from "@/stores/formBuilder"
import slugify from "slugify";
import { createService, updateService } from "@/services/admin/service";

const serviceName = ref("")
const letterNumber = ref(true);
const isServiceTitleDuplicate = ref(false)
const props: any = defineProps({
    services: Array
})

const emit = defineEmits(['updateServiceData']);

const onSubmit = async () => {
    let slug = slugify(serviceName.value, { lower: true });
    props.services.forEach((service: { data: { slug: string; }; }) => {
        if (service.data.slug == slug) {
            isServiceTitleDuplicate.value = true;
        }
    });
    if (!isServiceTitleDuplicate.value) {
        if (formBuilderStore.$state.editServiceDialog.isDialog) {
            let newSlug = slugify(formBuilderStore.$state.editServiceDialog.oldName, { lower: true });
            let newServiceName = {
                name: formBuilderStore.$state.editServiceDialog.oldName,
                slug: newSlug,
                isLetterNumber: letterNumber.value,
                updatedAt: Date.now()
            }
            await updateService(formBuilderStore.$state.editServiceDialog.id, newServiceName)
            emit('updateServiceData');
            formBuilderStore.$state.createServiceDialog = false
        } else {
            await createService(serviceName.value, slug, letterNumber.value);
            emit('updateServiceData');
            formBuilderStore.$state.createServiceDialog = false
        }
    }
}

const onCancel = () => {
    formBuilderStore.$state.createServiceDialog = false;
    formBuilderStore.$state.editServiceDialog.isDialog = false;
}

const formBuilderStore = useFormBuilderStore();
</script>
<template>
    <q-dialog v-model="formBuilderStore.$state.createServiceDialog" persistent>
        <q-card style="min-width: 350px">
            <q-form @submit="onSubmit">
                <q-card-section>
                    <div class="text-h6">Masukkan nama layanan</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input dense v-if="formBuilderStore.$state.editServiceDialog.isDialog"
                        v-model="formBuilderStore.$state.editServiceDialog.oldName"
                        @keyup="isServiceTitleDuplicate = false" :rules="[(v: any) => !!v || 'Harus diisi']"
                        bottom-slots autofocus :error="isServiceTitleDuplicate">
                        <template v-slot:error>
                            Nama sudah dipakai
                        </template>
                    </q-input>
                    <q-input dense v-else v-model="serviceName" @keyup="isServiceTitleDuplicate = false"
                        :rules="[(v: any) => !!v || 'Harus diisi']" bottom-slots autofocus
                        :error="isServiceTitleDuplicate">
                        <template v-slot:error>
                            Nama sudah dipakai
                        </template>
                    </q-input>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <q-checkbox v-model="letterNumber" label="Menggunakan nomor surat?" />
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <q-btn v-if="formBuilderStore.$state.editServiceDialog.isDialog" class="bg-primary text-white"
                        :to="{ name: 'UpdateFormById', params: { id: formBuilderStore.$state.editServiceDialog.id } }">Edit
                        Form</q-btn>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" @click="onCancel" />
                    <q-btn flat label="OK" type="submit" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>