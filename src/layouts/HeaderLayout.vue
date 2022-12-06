<script setup lang="ts">
import ToolbarNav from "./ToolbarNav.vue";
</script>
<template>
  <q-header v-if="$q.screen.gt.xs" reveal bordered class="bg-white text-black visible">
    <ToolbarNav />
  </q-header>
  <q-footer v-else bordered class="bg-white text-black">
    <ToolbarNav />
  </q-footer>
</template>
