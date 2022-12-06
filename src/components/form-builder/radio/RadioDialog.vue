<script setup lang="ts">
import { useDialogStore } from '@/stores/dialogs'
import { useFormBuilderStore } from "@/stores/formBuilder"
import { ref } from "vue";

const dialogStore = useDialogStore();
const formBuilderStore = useFormBuilderStore()
const title = ref("");
const otherField = ref(false);
const inputRadioOptions: any = ref([
    {
        label: "opsi1",
        value: "opsi1"
    },
]);
const addInputRadioOption = () => {
    inputRadioOptions.value.push({
        label: "opsi",
        value: "opsi"
    });
}
const onSubmit = () => {
    let data: any = [];
    inputRadioOptions.value.forEach((inputOption: { name: any; }) => {
        data.push({
            label: inputOption.name,
            value: inputOption.name,
        })
    });

    if (dialogStore.$state.radioFieldDialog.action == "edit") {
        formBuilderStore.$state.formFields.splice(dialogStore.$state.radioFieldDialog.index, 1, {
            type: "radio",
            title: title.value,
            other: otherField.value,
            options: data
        })
        dialogStore.$state.radioFieldDialog.isAppear = false;
    } else {
        formBuilderStore.$state.formFields.push({
            type: "radio",
            title: title.value,
            other: otherField.value,
            options: data
        })
        dialogStore.$state.radioFieldDialog.isAppear = false;
    }
}
</script>
<template>
    <q-dialog v-model="dialogStore.$state.radioFieldDialog.isAppear" persistent>
        <q-card style="min-width: 350px">
            <q-form @submit.prevent="onSubmit">
                <q-card-section>
                    <div class="text-h6">Multi Choice</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input placeholder="Judul input" dense v-model="title" autofocus
                        :rules="[(v) => !!v || 'harus diisi']" />
                </q-card-section>
                <q-card-section class="q-pt-none" v-for="inputRadioOption in inputRadioOptions">
                    <q-input placeholder="Nama opsi" dense v-model="inputRadioOption.name">
                        <template v-slot:prepend>
                            <q-icon name="radio_button_checked" />
                        </template>
                    </q-input>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <q-btn flat icon="add" align="center" @click="addInputRadioOption" />
                    <q-checkbox v-model="otherField" label="Add Other?" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup
                        @click="dialogStore.$state.radioFieldDialog.isAppear = false" />
                    <q-btn flat label="OK" type="submit" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>