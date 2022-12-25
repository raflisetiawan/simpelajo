<script setup lang="ts">
import signout from "@/services/auth/signout";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();

const signOut = () => {
  $q.dialog({
    title: "Konfirmasi",
    message: "Apakah anda yakin keluar?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    signout();
    router.push({ name: "SignIn" });
  });
};
</script>

<template>
  <div @click="signOut">
    Keluar
    <q-tooltip>
      Keluar
    </q-tooltip>
  </div>
</template>
