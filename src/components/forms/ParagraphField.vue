<script setup lang="ts">
import { useFormStore } from "../../stores/form";

const props = defineProps(['label', 'index', 'required', 'modelValue']);
const formStore = useFormStore()

const requiredRules = [(v: string) => !!v || 'Harus diisi']
const formName: any = formStore.$state.forms[props.index];
</script>
<template>
    <q-input type="textarea" v-model="formName.name" :label="label" v-if="required" :rules="requiredRules">
    </q-input>
    <q-input type="textarea" v-model="formName.name" :label="label" v-else>
    </q-input>
</template>