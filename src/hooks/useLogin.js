import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch, user } = useAuthContext();
  // loging function
  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // update user online state

      const { uid } = res.user;
      const usersRef = collection(db, "users");
      await updateDoc(doc(usersRef, uid), {
        online: true,
      });
      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err);

      setError(err.message);
      setIsPending(false);
    }
  };

  return { login, isPending, error };
};
