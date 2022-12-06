<script setup lang="ts">
import { useFormStore } from "../../stores/form";

const props = defineProps(['label', 'index', 'required', 'modelValue']);
const formStore = useFormStore()

const requiredRules = [(v: Number) => !!v || 'Harus diisi']
const formName: any = formStore.$state.forms[props.index];
</script>
<template>
    <q-input type="number" v-model="formName.name" :label="label" v-if="required" :rules="requiredRules">
        <template v-slot:prepend>
            <q-icon name="call" />
        </template>
    </q-input>
    <q-input type="number" v-model="formName.name" :label="label" v-else>
        <template v-slot:prepend>
            <q-icon name="call" />
        </template>
    </q-input>
</template>