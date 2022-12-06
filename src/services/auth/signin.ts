import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const signin = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return {
        errorCode: error.code,
        errorMessage: error.message,
        errorStatus: true
      };
    });
};

export default signin;
