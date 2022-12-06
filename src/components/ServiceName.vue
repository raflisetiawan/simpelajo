<script setup lang="ts">
import { ref } from 'vue';

const getService: any = ref(null);
const props = defineProps(["serviceName"]);

console.log(props.serviceName);
</script>
<template>
    <h1>Halo</h1>
</template>