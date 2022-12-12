import getUser from "./getUser";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore()
const redirectToRoleFeature = async (uid: string) => {
  const userData: any = await getUser(uid);
  if (userData.role === "admin") {
    return "admin";
  } else if (userData.role === "officer") {
    return "officer";
  } else {
    return "user";
  }
};

const officerRole = async () => {
  let id: string[] = [];
  const officers = query(collection(db, "users"), where("role", "==", "officer"));
  const officersSnapshot = await getDocs(officers);

  officersSnapshot.forEach((officer) => {
    id.push(officer.id);
  })
  return id;
}

export { redirectToRoleFeature, officerRole };
