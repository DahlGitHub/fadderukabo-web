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

    {
      /*
  useEffect(() => {
    const userLoggedIn = async () => {
      if (!auth.currentUser) {
        router.push('/login');
        return;
      }

      const authorizedEmailsRef = collection(db, 'allowedEmails');
      const authorizedEmailsQuery = query(authorizedEmailsRef, where('email', '==', auth.currentUser.email));

      try {
        const querySnapshot = await getDocs(authorizedEmailsQuery);
        if (querySnapshot.empty) {
          router.push('/unauthorized');
        }
      } catch (error) {
        console.error('Error checking authorized emails:', error);
      }
    };

    if (!loading) {
      userLoggedIn();
    }
  }, [auth.currentUser, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }
*/
    }
  return (

      <div>
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="max-w-screen p-4 ">{children}</div>
            </main>
          </div>
        </div>
      </div>

  );
};

{
  /*
export async function getServerSideProps (context : any) {
  const auth = await getAuth();
  const user = auth.currentUser;

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const authorizedEmailsRef = collection(db, 'allowedEmails');
  const authorizedEmailsQuery = query(authorizedEmailsRef, where('email', '==', user.email));

  try {
    const querySnapshot = await getDocs(authorizedEmailsQuery);
    if (querySnapshot.empty) {
      return {
        redirect: {
          destination: '/unauthorized',
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.error('Error checking authorized emails:', error);
  }

  return {
    props: {},
  };
  */
};

export default DashboardLayout;