<script setup lang="ts">
import { ref } from "vue";
import { useFormBuilderStore } from "@/stores/formBuilder";
import UpwardIcon from "../UpwardIcon.vue";
import DownwardIcon from "../DownwardIcon.vue";
import DeleteIconField from "../DeleteIconField.vue";

const formBuilderStore = useFormBuilderStore();

defineProps({
  index: Number,
});

const shape = ref("Perempuan");
</script>
<template>
  Jenis Kelamin
  <q-space />
  <q-radio v-model="shape" val="Laki-Laki" label="Laki-Laki" />
  <q-radio v-model="shape" val="Perempuan" label="Perempuan">
    <UpwardIcon v-if="index != 0" :index="index" />
    <DeleteIconField :index="index" class="q-ml-sm" />
    <DownwardIcon v-if="index != formBuilderStore.$state.formFields.length - 1" :index="index" />
  </q-radio>
</template>
