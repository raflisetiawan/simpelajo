<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Complaint = defineAsyncComponent(() => import("./Complaint.vue"));
</script>
<template>
    <Suspense>
        <Complaint />
        <template #fallback>
            <q-linear-progress indeterminate />
        </template>
    </Suspense>
</template>