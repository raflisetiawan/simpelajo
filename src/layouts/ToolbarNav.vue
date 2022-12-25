<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import ThreePoints from "@/components/ThreePoints.vue";
const router = useRouter();
const toHome = () => router.push({ name: 'Home' })
const userStore = useUserStore();
</script>
<template>
  <q-toolbar :class="
    $q.screen.lt.sm ? `container justify-evenly full-width` : `container`
  ">
    <q-toolbar-title v-if="$q.screen.gt.xs">
      <q-avatar @click="toHome" style="cursor: pointer">
        <img src="../assets/dACACA-removebg-preview.png" alt="Logo">
      </q-avatar>
    </q-toolbar-title>
    <q-space v-if="$q.screen.gt.xs" />
    <q-btn flat dense label="Beranda" :class="$q.screen.gt.xs ? `q-px-md black-text` : `black-text`"
      :to="{ name: 'Home' }" />
    <q-btn flat dense label="Layanan" :class="$q.screen.gt.xs ? `q-px-md black-text` : `black-text`"
      :to="{ name: 'Services' }" />
    <q-btn flat dense label="Keluhan" :class="$q.screen.gt.xs ? `q-px-md black-text` : `black-text`"
      :to="{ name: 'Keluhan' }" />
    <q-btn flat dense label="Hubungi" to="/#hubungi" :class="$q.screen.gt.xs ? `q-px-md black-text` : `black-text`" />
    <ThreePoints v-if="userStore.$state.user !== null" />
    <q-btn v-else icon="login" flat dense :to="{ name: 'SignIn' }"></q-btn>
    <!-- <SignOutButton v-if="userStore.$state.user !== null" /> -->
  </q-toolbar>
</template>
