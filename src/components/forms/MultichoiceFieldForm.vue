<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useFormStore } from "../../stores/form";

const props = defineProps(['label', 'index', 'required', 'modelValue', 'title', 'other', 'selected']);
const formStore = useFormStore();
const formName: any = formStore.$state.forms[props.index];
watchEffect(() => {
    if (formName.name === undefined) {
        formName.name = formName.options[0].value
    }
})
</script>
<template>
    <div class="text-h6">{{ title }} :</div>
    <q-option-group v-model="formName.name" color="primary" selected :options="formName.options" />
    <q-input v-if="other" label="other" v-model="formName.otherText" />
</template>