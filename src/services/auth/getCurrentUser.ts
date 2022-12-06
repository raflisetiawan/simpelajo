import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "../../stores/user";
import getUser from "../user/getUser";

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      async (user) => {
        removeListener();
        resolve(user);
        if (user !== null) {
          const userStore = useUserStore();
          const getUserData = await getUser(user.uid);
          userStore.$state.user = getUserData;
        }
      },
      reject
    );
  });
};

export default getCurrentUser;
