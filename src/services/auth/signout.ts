import { getAuth, signOut } from "firebase/auth";
import { Notify } from "quasar";
import { useUserStore } from "@/stores/user";
import {destroyNotificationToken} from "@/services/officers/notification";
import { useNotificationStore } from "@/stores/notification";

const auth = getAuth();
const signout = async () => {
  const notificationStore = useNotificationStore();
  return signOut(auth).then(() => {
    const userStore = useUserStore();
    userStore.$state.user = null;
    destroyNotificationToken(notificationStore.$state.notificationId)
    Notify.create({
      type: "info",
      position: "top-right",
      message: "Berhasil sign out!",
    });
  });
};

export default signout;
