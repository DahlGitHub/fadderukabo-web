import React, { ReactNode, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import UserContext from "../auth/UserContext";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "../sidebar/Sidebar";
import Header from "../layout/Header";
import { useRouter } from "next/router";

interface DefaultLayoutProps {
  children: ReactNode;
}




const DashboardLayout = ({ children } : DefaultLayoutProps ) => {

  const router = useRouter();
  
  const userLoggedIn = () => {
  if(!auth.currentUser) {
    router.push("/login")
  }
}

useEffect(() => {
  userLoggedIn()
}, [])

  const [user, loading, error] = useAuthState(auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <UserContext.Provider value={{ user, loading, error }}>
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      { loading ? <div>Loading...</div> 
      :

      <div className="flex h-screen overflow-hidden">
        

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
   
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
   
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
      
        </div>
  
      </div>
      }
  
    </div>
    </UserContext.Provider>
    
  );
};

export default DashboardLayout;