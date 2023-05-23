import React, { ReactNode, useState } from "react";
import Dashboard from "./Dashboard";
import { UserContext } from "../auth/UserContext";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "../sidebar/Sidebar";



const DashboardLayout = ({ children } : {children: ReactNode}) => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <UserContext.Provider value={{user, loading, error}}>

      <div className="h-screen overflow-hidden bg-primary-800 flex text-black">
      <div className=" h-screen">
        
      </div>
      <div className="flex-1">
        <main className="overflow-auto">{children}</main>
      </div>
    </div>

    </UserContext.Provider>
    
  );
};

export default DashboardLayout;