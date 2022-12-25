<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Contact = defineAsyncComponent(() => import("./Contact.vue"));
</script>
<template>
    <Suspense>
        <Contact />
        <template #fallback>
            <q-linear-progress indeterminate />
        </template>
    </Suspense>
</template>