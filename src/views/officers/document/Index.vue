<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Document = defineAsyncComponent(() => import("./Document.vue"));
</script>
<template>
    <Suspense>
        <Document />
        <template #fallback>
            <q-linear-progress indeterminate />
        </template>
    </Suspense>
</template>