import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { Notify } from "quasar";

const db = getFirestore();

const insertContact = async (data: any) => {
  await addDoc(collection(db, "contacts"), {
    name: data.name,
    message: data.message,
    createdAt: Date.now(),
  });
  try {
    Notify.create({
      color: "positive",
      message: "Berhasil di kirim",
      position: "top-right",
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllContact = async () => {
  let data: any = [];
  const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  try {
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        data: doc.data(),
      });
    });
  } catch (error) {
    console.log(error);
  }
  return data;
};

export { insertContact, getAllContact };
