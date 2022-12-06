import { collection, query, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore();

const q = query(collection(db, "users"));

const getUser = async () => {
  let users: any = [];
  let user;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    user = {
      id: doc.id,
      createdAt: doc.data().createdAt,
      email: doc.data().email,
      emailVerified: doc.data().emailVerified,
      photoURL: doc.data().photoURL,
      role: doc.data().role,
      username: doc.data().username,
    };
    users.push(user);
  });
  return users;
};

export default getUser;
