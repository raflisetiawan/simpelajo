import { precacheAndRoute } from 'workbox-precaching'
import { getMessaging } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";
import app from "./firebase.config";
declare let self: ServiceWorkerGlobalScope

self.addEventListener('push', () => {
  const messaging = getMessaging(app);
  onBackgroundMessage(messaging, (payload: any) => {
    // Customize notification here
    const notificationTitle: any = payload.notification.title;
    const notificationOptions: any = {
      body: payload.notification.body,
      // icon: "https://firebasestorage.googleapis.com/v0/b/simpelajo.appspot.com/o/dACACA-removebg-preview.png?alt=media&token=c1121164-f74d-4b66-bbf0-8b138e1d136e",
    }
    self.registration.showNotification(notificationTitle, notificationOptions);
  })
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})

precacheAndRoute(self.__WB_MANIFEST)
