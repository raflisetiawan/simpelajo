import { doc, getFirestore, updateDoc } from "firebase/firestore";

const editUserRole = async (userId: string, role: string) => {
  const db = getFirestore();
  const editUserRoleRef = doc(db, "users", userId);

  await updateDoc(editUserRoleRef, {
    role: role,
  });
};

export default editUserRole;
