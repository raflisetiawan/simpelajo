<script setup lang="ts">
import { useFormStore } from "../../stores/form";

const props = defineProps(['label', 'index', 'required', 'modelValue', 'title']);
const formStore = useFormStore()
const formName: any = formStore.$state.forms[props.index]
</script>
<template>
    <div class="text-h6">{{ title }} :
    </div>
    <q-option-group v-model="formName.name" :options="formName.options" type="checkbox" bottom-slots></q-option-group>
</template>