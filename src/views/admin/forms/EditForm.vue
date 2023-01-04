<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import Drawer from "@/components/form-builder/Drawer.vue";

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
            <div>
                <q-linear-progress indeterminate />
            </div>
        </template>
    </Suspense>
</template>