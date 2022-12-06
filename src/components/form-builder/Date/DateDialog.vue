<script setup lang="ts">
import { useDialogStore } from '@/stores/dialogs'
import { useFormBuilderStore } from "@/stores/formBuilder"
import { ref } from "vue";

const dialogStore = useDialogStore();
const formBuilderStore = useFormBuilderStore()
const title = ref("");
const onSubmit = () => {
    if (dialogStore.$state.dateFieldDialog.action == "edit") {
        formBuilderStore.$state.formFields.splice(dialogStore.$state.dateFieldDialog.index, 1, {
            type: "date",
            title: title.value,
        })
        dialogStore.$state.dateFieldDialog.isAppear = false;
    } else {
        formBuilderStore.$state.formFields.push({
            type: "date",
            title: title.value,
        })
        dialogStore.$state.dateFieldDialog.isAppear = false;
    }
}
</script>
<template>
    <q-dialog v-model="dialogStore.$state.dateFieldDialog.isAppear" persistent>
        <q-card style="min-width: 350px">
            <q-form @submit.prevent="onSubmit">
                <q-card-section>
                    <div class="text-h6">Date</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input placeholder="Judul input" dense v-model="title" autofocus
                        :rules="[(v) => !!v || 'harus diisi']" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup
                        @click="dialogStore.$state.dateFieldDialog.isAppear = false" />
                    <q-btn flat label="OK" type="submit" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>