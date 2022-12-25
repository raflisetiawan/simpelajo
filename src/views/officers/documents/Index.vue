<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Documents = defineAsyncComponent(() => import("./Documents.vue"));
</script>

<template>
    <Suspense>
        <Documents />
        <template #fallback>
            <q-linear-progress indeterminate />
        </template>
    </Suspense>
</template>