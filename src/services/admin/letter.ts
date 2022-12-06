import {
  collection,
  addDoc,
  getFirestore,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useLetterStore } from "../../stores/letter";
import { v4 as uuidv4 } from "uuid";

const storage = getStorage();
const db = getFirestore();

const insertLetter = async (file: any, service: any) => {
  const storageRef = ref(
    storage,
    `letters/${service.data.name}_${uuidv4()}.docx`
  );
  const uploadTask = uploadBytesResumable(storageRef, file);
  const letterStore = useLetterStore();
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      letterStore.$state.letterUploadProgress = `${progress} %`;
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          console.log(error.code);
          break;
        case "storage/canceled":
          console.log(error.code);
          break;
        case "storage/unknown":
          console.log(error.code);
          break;
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await addDoc(collection(db, "letters"), {
          serviceId: service.id,
          serviceName: service.data.name,
          fileName: file.name,
          createdAt: Date.now(),
          downloadURL,
        });
        letterStore.$state.loadingUploadFile = false;
        letterStore.$state.isUploadLetterDialog = false;
        letterStore.$state.componentKey += 1;
      });
    }
  );
};

const getLetterByServiceId = async (serviceId: string) => {
  const letterRef = collection(db, "letters");
  const q = query(letterRef, where("serviceId", "==", serviceId));

  const querySnapshot = await getDocs(q);
  let data: any = [];
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return data[0];
};

const getServiceHasNotLetter = async (id: string) => {
  const q = query(collection(db, "letters"), where("serviceId", "==", id));
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

export { insertLetter, getLetterByServiceId, getServiceHasNotLetter };
