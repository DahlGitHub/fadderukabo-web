import React, { ReactNode, useState } from "react";
import Dashboard from "./Dashboard";
import { UserContext } from "../auth/UserContext";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";



const DashboardLayout = ({ children } : {children: ReactNode}) => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <UserContext.Provider value={{user, loading, error}}>
      <div className="min-h-screen">
      <div className="flex">

      {loading
      ? <div>
        Loading...
        </div>

      :
      
      <div className="w-full w-[calc(100vw-100px)]">
        { children }
      </div>
      
      }
      </div>
    </div>
    </UserContext.Provider>
    
  );
};

export default DashboardLayout;