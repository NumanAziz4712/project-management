import { db } from "../firebase/config";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const useCollection = (c, _query, _orderby) => {
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [loading, setLoading] = useState(false);
  // create them to ref to avoid inifinte loop
  const orderby = useRef(_orderby).current;
  const q = useRef(_query).current;
  // we use use effect to get the data as soon as
  // the component mounts
  // also we provided the (collection -> c) as
  // dependency to get the data on change of (C) as well
  useEffect(() => {
    setLoading(true);
    let ref = collection(db, c);
    if (orderby) {
      ref = query(ref, orderBy(...orderby));
    }

    if (q) {
      ref = query(ref, where(...q));
    }

    // etting up an observer
    // whenever the data changes, it retursn a new snapshot of the data
    // it fires the call back function whenever
    // there is change in the data.
    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update the state
        setDocuments(results);
        setError(null);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
        setLoading(false);
      }
    );

    // unsubscribe on unamount
    return () => {
      unsubscribe();
    };
  }, [c]);

  // return
  return { documents, error, query, orderby, loading };
};
