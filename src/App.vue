<script setup lang="ts">
import MainLayout from "./layouts/MainLayout.vue";
import { onMounted } from "vue";
import ReloadPWA from "@/components/ReloadPwa.vue";

onMounted(async () => {
  document.title = "Simpel Ajo"
});

</script>

<template>
  <ReloadPWA />
  <div class="flex w-full h-full justify-center items-center text-6xl">
    <MainLayout />
  </div>
</template>
