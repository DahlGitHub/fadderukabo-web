import React, { ReactNode, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { AuthContextProvider } from "../auth/AuthContext";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "../sidebar/Sidebar";
import Header from "../layout/Header";
import { useRouter } from "next/router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";


interface DefaultLayoutProps {
  children: ReactNode;
}


const DashboardLayout = ({ children }: DefaultLayoutProps) => {
  const auth = getAuth();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

      <div>
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="max-w-screen p-4 px-8 ">{children}</div>

            </main>
          </div>
        </div>
      </div>

  );
};

export default DashboardLayout;