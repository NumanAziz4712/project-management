import { signOut } from "firebase/auth";
import {
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      // update online status of the user
      // once we signout. we make the online state false
      const { uid } = user;
      const usersRef = collection(db, "users");
      await updateDoc(doc(usersRef, uid), {
        online: false,
      });

      await signOut(auth);

      // dispatch logout function
      dispatch({ type: "LOGOUT" });

      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { logout, isPending, error };
};
