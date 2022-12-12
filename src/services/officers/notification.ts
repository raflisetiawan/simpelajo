import { collection, addDoc, getFirestore,  query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
const db = getFirestore();
const insertToken = async (token: string, userId: string) => {
   const tokenRef = await addDoc(collection(db, "notificationToken"), {
        token, userId
      });
      return tokenRef.id
}


const checkExistingToken = async (token: string, userId: string) => {
    let notificationTokenData = {
        isExist: false,
        notificationTokenId: ""
    };
    const tokenRef = collection(db, "notificationToken");
    const checkUser = query(tokenRef, where("userId", "==", userId));
    const checkUserSnapshot = await getDocs(checkUser);
    checkUserSnapshot.forEach((user: any) => {
        if(user.data().token === token){
            notificationTokenData.isExist = true
            notificationTokenData.notificationTokenId = user.id
        }
    })
    return notificationTokenData;
}

const getTokensByUserId = async(userId: string) => {
    let data: string[] = [];
    const tokenRef = collection(db, "notificationToken");
    const checkUser = query(tokenRef, where("userId", "==", userId));
    const checkUserSnapshot = await getDocs(checkUser);
    checkUserSnapshot.forEach((user: any) => {
        data.push(user.data().token);
    })

    return data;
}

const destroyNotificationToken = async(notificationTokenId: string) => {
    await deleteDoc(doc(db, "notificationToken", notificationTokenId));
    try {

    } catch (error) {
        console.log(error)
    }
}

export {insertToken, checkExistingToken, getTokensByUserId, destroyNotificationToken}