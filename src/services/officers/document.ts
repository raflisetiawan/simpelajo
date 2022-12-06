import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { Notify } from "quasar";
import { useDocumentStore } from "@/stores/document";
import { v4 as uuidv4 } from "uuid";
import { useDialogStore } from "@/stores/dialogs";
import router from "@/router";

const db = getFirestore();
const documentStore = useDocumentStore();
const dialogStore = useDialogStore();
const getAllDocument = async () => {
  let data: any = [];
  const q = query(collection(db, "documents"), orderBy("createdAt", "desc"));
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

const getDocument = async (id: string) => {
  const docRef = doc(db, "documents", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

const getPendingDocuments = async () => {
  let data: any = [];
  const q = query(
    collection(db, "documents"),
    where("status", "==", "pending")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return data;
};

const updateStatus = async (id: string, status: any) => {
  const documentRef = doc(db, "documents", id);
  await updateDoc(documentRef, {
    status,
  });
  try {
    Notify.create({
      message: "Berhasil di edit",
      color: "positive",
      position: "top-right",
    });
  } catch (error: any) {
    Notify.create({
      message: error,
      color: "red",
      position: "top-right",
    });
    console.log(error);
  }
};

const storage = getStorage();
const insertLetterNumber = async (
  file: any,
  number: any,
  id: string,
  oldDownloadURL: string,
  serviceName: string
) => {
  documentStore.$state.isLetterNumberProgress = true;
  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(
    storage,
    `user-documents/${serviceName}_${uuidv4()}.docx`
  );
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      let progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      documentStore.$state.letterNumberProgress = progress | 0;
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const documentRef = ref(storage, oldDownloadURL);
        deleteObject(documentRef)
          .then(async () => {
            const documentRef = doc(db, "documents", id);
            await updateDoc(documentRef, {
              letterNumber: number,
              downloadURL,
              updatedAt: Date.now(),
            });
            documentStore.$state.isLetterNumberProgress = false;
            dialogStore.$state.isLetterNumberDialog = false;
            router.go(0);
          })
          .catch((error) => {
            console.log(error);
            Notify.create({
              message: error,
              color: "red",
              position: "top-right",
            });
          });
      });
    }
  );
};

export {
  getAllDocument,
  getDocument,
  getPendingDocuments,
  updateStatus,
  insertLetterNumber,
};
