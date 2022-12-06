import { setDoc, doc, getFirestore } from "firebase/firestore";

const db = getFirestore();
const addUser = async (user, username, userId) => {
  return await setDoc(doc(db, "users", userId), {
    username,
    email: user.email,
    emailVerified: user.emailVerified,
    createdAt: user.metadata.createdAt,
    photoURL: user.photoURL,
    role: "user",
  });
};

export default addUser;
