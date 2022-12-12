import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  collection,
  addDoc,
  getFirestore,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getServiceBySlug } from "../admin/service";
import { useDocumentStore } from "@/stores/document";
import { Notify } from "quasar";
import { useDialogStore } from "@/stores/dialogs";
import { useNotificationStore } from "@/stores/notification";
import { officerRole } from "@/services/user/checkRole";
import {getTokensByUserId} from "@/services/officers/notification";

const documentStore = useDocumentStore();
const notificationStore = useNotificationStore();
const dialogStore = useDialogStore();
const storage = getStorage();
const db = getFirestore();
/** @type {any} */
const metadata = {
  contentType:
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const insertDocumentToStorage = async (file: any, letter: any, data: any) => {
  const storageRef = ref(
    storage,
    `user-documents/${letter.data.serviceName}_${uuidv4()}.docx`
  );
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress: any = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      documentStore.$state.documentProgress = `${parseInt(progress)} %`;
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;
        // ...
        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    async () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await insertDocument(
          letter.data.serviceId,
          downloadURL,
          letter.data.serviceName,
          letter.data.fileName,
          data
        );
      });
        const officers = await officerRole()
        try {
          officers.forEach(async(officerId) => {
            const tokens = await getTokensByUserId(officerId)
            try {
              tokens.forEach(async(token) => {
                await notificationStore.pushNotification({
                  title: "Warga desa telah membuat surat",
                  body: "Klik untuk melihatnya",
                  icon: "https://firebasestorage.googleapis.com/v0/b/simpelajo.appspot.com/o/dACACA-removebg-preview.png?alt=media&token=c1121164-f74d-4b66-bbf0-8b138e1d136e"
                }, token)
              })
            } catch (error) {
              console.log(error)
            }
          })
        } catch (error) {
          console.log(error)
        }
      Notify.create({
        message:
          "Dokumen anda sudah di buat, mohon menunggu respon dari petugas",
        color: "positive",
        position: "top-right",
      });
    }
  );
};

const insertDocument = async (
  serviceId: any,
  downloadURL: any,
  serviceName: any,
  fileName: any,
  data: any
) => {
  const response = await addDoc(collection(db, "documents"), {
    downloadURL,
    serviceId,
    serviceName,
    fileName,
    createdAt: Date.now(),
    status: "pending",
    data,
  });
  documentStore.$state.documentId = response.id;
  documentStore.$state.loadingButton = false;
  dialogStore.$state.isSendDocument = false;
};

const getLetterBySlug = async (slug: string) => {
  const service: any = await getServiceBySlug(slug);
  let data;
  const q = query(
    collection(db, "letters"),
    where("serviceId", "==", service.id)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data = {
      id: doc.id,
      data: doc.data(),
    };
  });
  return data;
};

const getDocumentById = async (id: string) => {
  const docRef = doc(db, "documents", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export { insertDocumentToStorage, getLetterBySlug, getDocumentById };
