<script setup lang="ts">
import { ref } from "vue";
import { useDialogStore } from "@/stores/dialogs";
import { useFormBuilderStore } from "@/stores/formBuilder"

const dialogStore = useDialogStore();
const formBuilderStore = useFormBuilderStore()
const inputOptions: any = ref([{
    label: "opsi1",
    value: "opsi1"
}]);
const title = ref("");
const addInputOption = () => {
    inputOptions.value.push({
        label: "opsi",
        value: "opsi"
    });
};

const onSubmit = () => {
    let data: any = [];
    inputOptions.value.forEach((inputOption: { name: any; }) => {
        data.push(inputOption.name);
    });

    if (dialogStore.$state.dropdownDialog.action == "edit") {
        formBuilderStore.$state.formFields.splice(dialogStore.$state.dropdownDialog.index, 1, {
            type: "dropdown",
            title: title.value,
            options: data
        })
    } else {
        formBuilderStore.$state.formFields.push({
            type: "dropdown",
            title: title.value,
            options: data
        })
    }

};
const onClose = () => {
    inputOptions.value.pop();
}
</script>

<template>
    <q-dialog v-model="dialogStore.$state.dropdownDialog.isAppear" persistent>
        <q-card style="min-width: 350px">
            <q-form @submit.prevent="onSubmit">
                <q-card-section>
                    <div class="text-h6">Dropdown</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input dense v-model="title" placeholder="Judul Opsi" autofocus
                        :rules="[(v) => !!v || 'Harus diisi']" class="q-mb-sm" />
                    <template v-for="(inputOption, index) in inputOptions">
                        <q-input dense v-model="inputOption.name" autofocus placeholder="nama opsi" class="q-mb-sm">
                            <template v-slot:append>
                                <q-icon name="close" @click="onClose()" />
                            </template>
                        </q-input>
                    </template>
                    <q-btn flat icon="add" class="full-width" align="center" @click="addInputOption" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="OK" v-close-popup type="submit" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>
