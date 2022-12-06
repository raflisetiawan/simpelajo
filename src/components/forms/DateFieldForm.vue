<script setup lang="ts">
import { onMounted } from "vue";
import { useFormStore } from "../../stores/form";

const props = defineProps(['label', 'index', 'required', 'modelValue', 'title']);
const formStore = useFormStore();
const formName: any = formStore.$state.forms[props.index];
onMounted(() => {
    formName.name = "2022/02/01"
})
</script>
<template>
    <q-input filled v-model="formName.name" :label="title" :rules="['date']">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="formName.name">
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                    </q-date>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>