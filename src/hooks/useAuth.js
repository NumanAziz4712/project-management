import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(
      "useAuthContext must be inside an AuthContextProvider"
    );
  }

  return context;
};
