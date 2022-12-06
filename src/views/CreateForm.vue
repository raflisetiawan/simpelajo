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
    <!-- component with nested async dependencies -->
    <Page />
    <template #fallback>
      <q-spinner color="primary" size="3em" />
    </template>
  </Suspense>
</template>
