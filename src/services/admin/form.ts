import {
  collection,
  addDoc,
  getFirestore,
  where,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";

const db = getFirestore();
const createForm = async (data: any, serviceId: string) => {
  await addDoc(collection(db, "forms"), {
    data,
    serviceId,
    createdAt: Date.now(),
  });
};

const getFormByServiceId = async (serviceId: string) => {
  let data;
  const q = query(collection(db, "forms"), where("serviceId", "==", serviceId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((form) => {
    data = {
      size: querySnapshot.size,
      id: form.id,
      data: form.data(),
    };
  });
  return data;
};

const deleteForm = async (id: string) => {
  await deleteDoc(doc(db, "forms", id));
};

const checkFormIsExistByServiceId = async (serviceId: string) => {
  const q = query(collection(db, "forms"), where("serviceId", "==", serviceId));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size === 0) return false;
  return true;
};

const getAllForms = async () => {
  const querySnapshot = await getDocs(collection(db, "forms"));
  let data: any = [];
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return data;
};

const getServiceHasNotForm = async (id: string) => {
  const q = query(collection(db, "forms"), where("serviceId", "==", id));
  const querySnapshot = await getDocs(q);
  let isTrue = false;
  querySnapshot.forEach((doc) => {
    if (doc.data() !== null) {
      isTrue = true;
    } else {
      isTrue = false;
    }
  });
  return isTrue;
};

const getServiceHasNotFormData = async (id: string) => {
  const q = query(collection(db, "forms"), where("serviceId", "==", id));
  const querySnapshot = await getDocs(q);
  let data: any = [];
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return data;
};

export {
  createForm,
  checkFormIsExistByServiceId,
  getFormByServiceId,
  deleteForm,
  getServiceHasNotFormData,
  getAllForms,
  getServiceHasNotForm,
};
