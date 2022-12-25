<script setup lang="ts">
import ThreePoints from "@/components/ThreePoints.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>
<template>
  <q-header class="q-px-md bg-white text-black" bordered>
    <q-toolbar>
      <q-toolbar-title>
        <q-btn flat :to="{ name: 'Officer' }">Petugas</q-btn>
      </q-toolbar-title>
      <ThreePoints />
    </q-toolbar>
  </q-header>
</template>
