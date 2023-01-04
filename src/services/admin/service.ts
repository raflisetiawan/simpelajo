import {
  collection,
  query,
  getDocs,
  getFirestore,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  where,
  limit,
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { getFormByServiceId, deleteForm } from "./form";
import { getLetterByServiceId } from "./letter";

const storage = getStorage();
const db = getFirestore();
const getAllServices = async () => {
  const q = query(collection(db, "services"));
  let services: any = [];
  const querySnapshot = await getDocs(q);
  try {
    querySnapshot.forEach((doc) => {
      services.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return services;
  } catch (error) {
    return error;
  }
};

const createService = async (data: any, slug: string, isLetterNumber: any) => {
  return await addDoc(collection(db, "services"), {
    name: data,
    slug,
    isLetterNumber,
    createdAt: Date.now(),
  });
};

const deleteService = async (id: string) => {
  const formData: any = await getFormByServiceId(id);
  const letter: any = await getLetterByServiceId(id);
  if (formData !== undefined) {
    if (letter !== undefined) {
      const letterRef = ref(storage, letter.data.downloadURL);
      deleteObject(letterRef).catch((error) => {
        console.log(error);
      });
      await deleteDoc(doc(db, "letters", letter.id));
    }
    await deleteForm(formData.id);
    await deleteDoc(doc(db, "services", id));
  } else {
    if (letter !== undefined) {
      const letterRef = ref(storage, letter.data.downloadURL);
      deleteObject(letterRef).catch((error) => {
        console.log(error);
      });
      await deleteDoc(doc(db, "letters", letter.id));
    }
    await deleteDoc(doc(db, "services", id));
  }
};

const updateService = async (id: string, data: any) => {
  const serviceRef = doc(db, "services", id);
  await updateDoc(serviceRef, data);
};

const getService = async (id: string) => {
  const serviceRef = doc(db, "services", id);
  const serviceSnap = await getDoc(serviceRef);

  try {
    if (serviceSnap.exists()) {
      return serviceSnap.data();
    } else {
      return "No such document!";
    }
  } catch (error) {
    return error;
  }
};

const getServiceBySlug = async (slug: string) => {
  let data;
  const q = query(collection(db, "services"), where("slug", "==", slug));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data = {
      id: doc.id,
      data: doc.data(),
    };
  });
  return data;
};

const getServicesLimitBySix = async () => {
  let data: any = [];
  const q = query(collection(db, "services"), limit(6));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return data;
};

const filterLetter = async (keyword: string) => {
  let data : any= [];
  const q = query(collection(db, "services"), where("name", "==", keyword));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      data: doc.data()
    })
  });
  return data;
}

export {
  createService,
  filterLetter,
  getAllServices,
  deleteService,
  updateService,
  getService,
  getServiceBySlug,
  getServicesLimitBySix,
};
