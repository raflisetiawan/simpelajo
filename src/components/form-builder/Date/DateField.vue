<script setup lang="ts">
import { ref } from "vue";
import UpwardIcon from "../UpwardIcon.vue";
import DeleteIconField from "../DeleteIconField.vue";
import DownwardIcon from "../DownwardIcon.vue";
import { useDialogStore } from "@/stores/dialogs"
import { useFormBuilderStore } from "@/stores/formBuilder"

const dialogStore = useDialogStore();
const formBuilderStore = useFormBuilderStore();

defineProps({
    title: String,
    index: Number,
})

const editRadioField = (index: any) => {
    dialogStore.$state.dateFieldDialog.isAppear = !dialogStore.$state.dateFieldDialog.isAppear
    dialogStore.$state.dateFieldDialog.action = "edit";
    dialogStore.$state.dateFieldDialog.index = index;
}

const date = ref('2019/02/01')
</script>
<template>
    <div class="text-h6">{{ title }}</div>
    <q-input filled v-model="date" mask="date" :rules="['date']">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date">
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                    </q-date>
                </q-popup-proxy>
            </q-icon>
        </template>
        <template v-slot:prepend>
            <UpwardIcon v-if="index != 0" :index="index" />
            <DeleteIconField :index="index" />
            <DownwardIcon v-if="index != formBuilderStore.$state.formFields.length - 1" :index="index" />
            <q-btn icon="edit" flat color="green" size="sm" @click="editRadioField(index)" />
        </template>
    </q-input>
</template>