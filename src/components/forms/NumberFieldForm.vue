<script setup lang="ts">
import { useFormStore } from "../../stores/form";

const props = defineProps(['label', 'index', 'required', 'modelValue']);
const formStore = useFormStore()

const requiredRules = [(v: Number) => !!v || 'Harus diisi'];
const formName: any = formStore.$state.forms[props.index];
</script>
<template>
    <q-input v-model="formName.name" :label="label" type="number" v-if="required" :rules="requiredRules">
    </q-input>
    <q-input :label="label" v-model="formName.name" type="number" v-else></q-input>
</template>