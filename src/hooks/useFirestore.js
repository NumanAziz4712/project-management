import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useReducer } from "react";
import { timestamp, db } from "../firebase/config";

// initial state
let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

// firedtore reducer
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };

    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const useFirestore = (c) => {
  const [response, dispatch] = useReducer(
    firestoreReducer,
    initialState
  );

  // collection ref
  const ref = collection(db, c);

  // add documents
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      // timestamp
      // creates a new firestore time state via fromDate hwich takes the current date obj
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await addDoc(ref, {
        ...doc,
        createdAt,
      });
      dispatch({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err });
    }
  };

  // delete document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      await deleteDoc(doc(ref, id));
      dispatch("DELETED_DOCUMENT");
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  // update  documents
  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const updatedDocument = await updateDoc(
        doc(ref, id),
        updates
      );
      dispatch({
        type: "UPDATED_DOCUMENT",
        payload: updatedDocument,
      });
      return updatedDocument;
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.message,
      });
      return null;
    }
  };

  // returning the docs
  return {
    addDocument,
    deleteDocument,
    response,
    updateDocument,
  };
};
