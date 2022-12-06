<script setup lang="ts">
import { useFormBuilderStore } from "../../stores/formBuilder";
const props = defineProps({
  index: null,
});

const formBuilderStore = useFormBuilderStore();

const deleteField = () => {
  formBuilderStore.$state.formFields.splice(props.index, 1);
};
</script>
<template>
  <q-btn icon="delete" dense size="sm" color="red" @click="deleteField"></q-btn>
</template>
