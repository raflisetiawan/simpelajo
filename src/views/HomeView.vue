<script setup lang="ts">
import HeroSection from "@/components/HeroSection.vue";
import HubungiSection from "@/components/HubungiSection.vue";
import ServicesSkeleton from "@/components/skeletons/ServicesSkeleton.vue";
import { defineAsyncComponent, onMounted } from "vue";
const LayananSection = defineAsyncComponent(() => import("@/components/LayananSection.vue"));

onMounted(() => document.title = "Simpel Ajo - Beranda");
</script>
<template>
  <main>
    <HeroSection />
    <Suspense>
      <LayananSection />
      <template #fallback>
        <ServicesSkeleton />
      </template>
    </Suspense>
    <HubungiSection />
  </main>
</template>
