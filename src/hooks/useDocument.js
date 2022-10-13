import {
  collection,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useDocument = (c, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // get the real time data
  useEffect(() => {
    const docRef = doc(collection(db, c), id);
    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        setDocument({
          ...snapshot.data(),
          id: snapshot.id,
        });
        setError(null);
      },
      (err) => {
        console.log(err);
        setError("faild to get document");
      }
    );
    return () => unsub();
  }, [c, id]);

  return { document, error };
};
