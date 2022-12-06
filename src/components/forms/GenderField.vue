<script setup lang="ts">
import { onMounted } from "vue";
import { useFormStore } from "../../stores/form";

const props = defineProps(['label', 'index', 'required', 'modelValue']);
const formStore = useFormStore();
const formName: any = formStore.$state.forms[props.index];

onMounted(() => formName.name = "Laki-Laki")
</script>
<template>
    <div> Jenis Kelamin</div>
    <q-space />
    <q-radio v-model="formName.name" val="Laki-Laki" label="Laki-Laki" />
    <q-radio v-model="formName.name" val="Perempuan" label="Perempuan" />
</template>