import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";

const db = getFirestore();

const getAllComplaint = async () => {
  let data: any = [];
  const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));
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

const getComplaintById = async (id: string) => {
  const docRef = doc(db, "complaints", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export { getAllComplaint, getComplaintById };
