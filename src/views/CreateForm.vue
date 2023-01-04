<script setup lang="ts">
import Drawer from "@/components/form-builder/Drawer.vue";
import { defineAsyncComponent } from "vue";

const Page = defineAsyncComponent(() =>
  import("@/components/form-builder/Page.vue")
)
</script>

<template>
  <Drawer />
  <Suspense>
    <Page />
    <template #fallback>
      <q-linear-progress indeterminate />
    </template>
  </Suspense>
</template>
