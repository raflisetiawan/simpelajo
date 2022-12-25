<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDrawerStore } from "@/stores/drawer";
import ThreePoints from "@/components/ThreePoints.vue";

const drawerStore = useDrawerStore();
const route = useRoute();

const toggleShowDrawer = () => {
  drawerStore.$state.isShowUp = !drawerStore.$state.isShowUp
}
</script>

<template>
  <q-header class="q-px-md bg-white text-black" bordered>
    <q-toolbar>
      <q-toolbar-title>
        <q-btn label="Admin" flat :to="{ name: 'Admin' }" />
        <q-btn icon="arrow_forward" v-if="route.name === 'CreateForm'" flat class="q-ml-md" @click="toggleShowDrawer">
        </q-btn>
        <q-btn icon="arrow_forward" v-else-if="route.name === 'CreateFormById'" flat class="q-ml-md"
          @click="toggleShowDrawer">
        </q-btn>
      </q-toolbar-title>
      <ThreePoints />
    </q-toolbar>
  </q-header>
</template>
