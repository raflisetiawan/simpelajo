<script setup lang="ts">
import HeaderLayout from "./HeaderLayout.vue";
import FooterLayout from "./FooterLayout.vue";
import { useRoute } from "vue-router";
import HeaderLayoutOfficer from "./HeaderLayoutOfficer.vue";
import HeaderLayoutAdmin from "./HeaderLayoutAdmin.vue";
const routes = useRoute();
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <HeaderLayout v-if="routes.matched[0]?.name == 'WargaDesa'" />
    <HeaderLayoutOfficer v-else-if="routes.matched[0]?.name == `OfficerParent`" />
    <HeaderLayoutAdmin v-else-if="routes.matched[0]?.name == `AdminParent`" />
    <template v-else></template>
    <q-page-container>
      <router-view />
    </q-page-container>
    <FooterLayout v-if="routes.matched[1]?.name == 'Home'" />
  </q-layout>
</template>
