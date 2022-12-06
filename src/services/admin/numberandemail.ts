import {
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { Notify } from "quasar";

const db = getFirestore();
const updateNumberAndEmail = async (id: string, data: any) => {
  const numberAndEmailRef = doc(db, "numberAndEmail", id);
  await updateDoc(numberAndEmailRef, {
    number: data.number,
    email: data.email,
  });
  try {
    Notify.create({
      color: "positive",
      message: "Berhasil di edit",
      position: "top-right",
    });
  } catch (error) {}
};

const getNumberAndEmail = async () => {
  let data: any = [];
  const querySnapshot = await getDocs(collection(db, "numberAndEmail"));
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

export { updateNumberAndEmail, getNumberAndEmail };
