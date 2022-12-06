import { collection, addDoc, getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { Notify } from "quasar";
import { useComplaintStore } from "../../stores/complaint";

const complaintStore = useComplaintStore();
const db = getFirestore();
const storage = getStorage();

const insertComplaint = async (data: any) => {
  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

  if (data.image.length !== 0) {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `complaints/${data.image.name}_${v4()}`);
    const uploadTask = uploadBytesResumable(storageRef, data.image, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        complaintStore.$state.progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
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
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(collection(db, "complaints"), {
            name: data.name,
            complaint: data.complaint,
            suggestion: data.suggestion,
            createdAt: Date.now(),
            downloadURL,
          });
          Notify.create({
            color: "positive",
            textColor: "white",
            message: "Berhasil di kirim",
            position: "top-right",
          });
          complaintStore.$state.loading = false;
          complaintStore.$state.isUploadDone = true;
        });
      }
    );
  } else {
    await addDoc(collection(db, "complaints"), {
      name: data.name,
      complaint: data.complaint,
      suggestion: data.suggestion,
      createdAt: Date.now(),
    });
    Notify.create({
      color: "positive",
      textColor: "white",
      message: "Berhasil di kirim",
      position: "top-right",
    });
    complaintStore.$state.loading = false;
    complaintStore.$state.isUploadDone = true;
  }
};

export { insertComplaint };
