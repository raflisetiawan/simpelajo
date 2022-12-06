<script setup lang="ts">
import { useFormBuilderStore } from "../../stores/formBuilder";
import array_move from "../../utils/arrayMove";

const formBuilderStore = useFormBuilderStore();
const props = defineProps({
  index: Number,
});
const toTop = () => {
  const n: any = props.index;
  array_move(formBuilderStore.$state.formFields, props.index, n - 1);
};
</script>
<template>
  <q-btn icon="arrow_upward" size="sm" flat @click="toTop"></q-btn>
</template>
