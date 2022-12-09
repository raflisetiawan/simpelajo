<script setup lang="ts">
import MainLayout from "./layouts/MainLayout.vue";
import { onMounted } from "vue";
import getCurrentUser from "./services/auth/getCurrentUser";
import ReloadPWA from "@/components/ReloadPwa.vue";
import { getMessaging, getToken, onMessage } from "firebase/messaging"
import app from "./firebase.config"
import { useQuasar } from "quasar";

const messaging = getMessaging(app);
const quasar = useQuasar();
onMounted(async () => {
  await getCurrentUser();
  document.title = "Simpel Ajo"
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log('Notification permission granted.');
  }

  const token = await getToken(messaging);
  receiveMessage();
});

const receiveMessage = () => {
  onMessage(messaging, (payload) => {
    new Notification("hai")
    quasar.notify({
      message: payload.notification?.title,
      color: "green"
    })
  })
}

</script>

<template>
  <ReloadPWA />
  <div class="flex w-full h-full justify-center items-center text-6xl">
    <MainLayout />
  </div>
</template>
