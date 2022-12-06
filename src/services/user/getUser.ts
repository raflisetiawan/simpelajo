import { doc, getDoc, getFirestore } from "firebase/firestore";

const getUser = async (uid: string) => {
  const db = getFirestore();
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  let user;
  try {
    if (docSnap.exists()) {
      user = {
        id: docSnap.id,
        createdAt: docSnap.data().createdAt,
        email: docSnap.data().email,
        emailVerified: docSnap.data().emailVerified,
        photoURL: docSnap.data().photoURL,
        role: docSnap.data().role,
        username: docSnap.data().username,
      };
      return user;
    } else {
      return "something went wrong";
    }
  } catch (error) {
    return error;
  }
};

export default getUser;
