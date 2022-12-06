<script setup lang="ts">
import { useFormStore } from "../../stores/form";

const props = defineProps(['label', 'index', 'required', 'modelValue', 'title']);
const formStore = useFormStore()
const formName: any = formStore.$state.forms[props.index];

</script>
<template>
    <q-select :label="formName.title" :rules="[(v) => !!v || 'Harus diisi']" v-model="formName.name"
        :options="formName.options" />
</template>