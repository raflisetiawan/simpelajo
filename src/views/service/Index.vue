<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import ServicesSkeleton from "@/components/skeletons/ServicesDetail.vue";

document.title = "Simpel Ajo - Layanan";

const ServicesView = defineAsyncComponent(() => import("./ServicesView.vue"));
</script>
<template>
    <Suspense>
        <ServicesView />
        <template #fallback>
            <ServicesSkeleton />
        </template>
    </Suspense>
</template>