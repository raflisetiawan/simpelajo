<script setup lang="ts">
import { ref } from 'vue';
import { useFormBuilderStore } from "@/stores/formBuilder";
import { useDialogStore } from "@/stores/dialogs";
const formBuilderStore = useFormBuilderStore();
const dialogStore = useDialogStore();

const label = ref("");
const required = ref(false);
const formBuilderStoreField: any = formBuilderStore.$state.formFields;

const onSubmit = () => {
    if (dialogStore.$state.numberFieldDialog.action == 'edit') {
        formBuilderStoreField[
            dialogStore.$state.numberFieldDialog.index
        ].label = label.value;
        formBuilderStoreField[
            dialogStore.$state.numberFieldDialog.index
        ].required = required.value;
        dialogStore.$state.numberFieldDialog.isAppear = false;
    } else {
        formBuilderStore.$state.formFields.push({
            title: label.value,
            type: "number",
            label: label.value,
            required: required.value,
        });
        dialogStore.$state.numberFieldDialog.isAppear = false;
    }
}
</script>

<template>
    <q-dialog v-model="dialogStore.$state.numberFieldDialog.isAppear" persistent>
        <q-card style="min-width: 350px">
            <q-form @submit.prevent="onSubmit">
                <q-card-section>
                    <div class="text-h6">Judul nomer input</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input @click="" dense v-model="label" autofocus :rules="[(v) => !!v || 'harus diisi']" />
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <q-toggle v-model="required" label="Harus diisi?" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" @click="dialogStore.$state.numberFieldDialog.isAppear = false" />
                    <q-btn flat label="OK" type="submit" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>