import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar, Dialog, Notify } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import "./assets/main.css";
import "quasar/src/css/index.sass";
import firebaseConfig from "./firebase.config";
import App from './App.vue';
import router from './router';
import { getMessaging } from 'firebase/messaging';
import VueLazyLoad from 'vue-lazyload'
import VueLigthbox from "vue-easy-lightbox";


const app = createApp(App)

app.use(createPinia());
firebaseConfig;
getMessaging(firebaseConfig);
app.use(router);
app.use(Quasar, {
    plugins: { Dialog, Notify }, // import Quasar plugins and add here
  });
  app.use(VueLazyLoad);
  app.use(VueLigthbox);

app.mount('#app');
