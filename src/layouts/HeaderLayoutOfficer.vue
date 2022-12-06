<script setup lang="ts">
import SignOutButton from "@/components/SignOutButton.vue";
</script>
<template>
  <q-header class="q-px-md bg-white text-black" bordered>
    <q-toolbar>
      <q-toolbar-title>
        <q-btn flat :to="{ name: 'Officer' }">Petugas</q-btn>
      </q-toolbar-title>
      <SignOutButton />
    </q-toolbar>
  </q-header>
</template>
