import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useReducer,
  useEffect,
} from "react";
import { auth } from "../firebase/config";

export const AuthContext = createContext();

// auth reducer
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return {
        ...state,
        user: action.payload,
        authIsReady: true,
      };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  // useReducer
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });
  console.log(state);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
