import { useContext, createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { User } from "firebase/auth";

interface UserContextValue {
    // Define the properties and their types here
    user: User | null | undefined;
    loading: boolean;
    error: Error | undefined;
  }
  
  export const UserContext = createContext<UserContextValue | null>(null);