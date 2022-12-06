import { getAuth, signOut } from "firebase/auth";
import { Notify } from "quasar";
import { useUserStore } from "@/stores/user";

const auth = getAuth();

const signout = async () => {
  return signOut(auth).then(() => {
    const userStore = useUserStore();
    userStore.$state.user = null;
    Notify.create({
      type: "info",
      position: "top-right",
      message: "Berhasil sign out!",
    });
  });
};

export default signout;
