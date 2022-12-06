<script setup lang="ts">
import { useFormBuilderStore } from "../../stores/formBuilder";
import array_move from "../../utils/arrayMove";

const formBuilderStore = useFormBuilderStore();
const props = defineProps({
  index: null,
});
const toBot = () => {
  array_move(formBuilderStore.$state.formFields, props.index, props.index + 1);
};
</script>

<template>
  <q-btn icon="arrow_downward" size="sm" flat @click="toBot"></q-btn>
</template>
