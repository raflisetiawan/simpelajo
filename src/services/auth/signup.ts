import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const signup = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      return { errorCode, errorMessage };
    });
};

export default signup;
