import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import {
  collection,
  doc,
  setDoc,
} from "firebase/firestore";

export const useSignup = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  // const [imageUrl, setImageUrl] = useState("");

  const { dispatch } = useAuthContext();

  const signup = async (
    email,
    password,
    displayName,
    thumbnail
  ) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // if not a valide response
      if (!res) {
        throw new Error("Something went wrong with signup");
      }

      // upload user thumbnail
      // upload path
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;

      // storage reference
      const storageRef = ref(storage, uploadPath);
      const img = await uploadBytes(storageRef, thumbnail);
      const imageUrl = await getDownloadURL(img.ref);

      // update display name
      await updateProfile(res.user, {
        displayName,
        photoURL: imageUrl,
      });

      // ----------------------
      // create a user document for username, photourl, online status
      // -----------------------------------
      const usersRef = collection(db, "users");
      // adding a field to a specefic collection
      // creating new documents inside users,
      // amd the id of the document is the user's id

      await setDoc(doc(usersRef, res.user.uid), {
        online: true,
        displayName,
        photoURL: imageUrl,
      });
      await // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      setError(null);

      // await update
    } catch (err) {
      setIsPending(false);
      console.log(err.message);
      setError(err.message);
    }
  };

  return { signup, error, isPending };
};
