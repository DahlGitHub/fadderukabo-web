import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState, useEffect } from "react";
import { signInWithGoogle, db } from "../../../firebase";
import 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs } from "firebase/firestore";

import UsnIcon from "public/svg/usnicon.svg"

export default function SignIn() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [allowedEmails, setAllowedEmails] = useState<string[]>([]);
  const router = useRouter();


  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
  
    if (user) {
      getDocs(collection(db, 'allowedEmails'))
        .then((querySnapshot) => {
          const emails = querySnapshot.docs.map((doc) => doc.data().email);
          setAllowedEmails(emails);
        })
        .catch((error) => {
          console.error("Error getting documents:", error);
        });
  
      const userEmail = user.email;
    
      if (userEmail && !allowedEmails.includes(userEmail)) {
        // Log out the user and display an error message
        auth.signOut()
          .then(() => {
            toast.error("Access denied. You are not authorized to access this site.");
          })
          .catch((error) => {
            console.error("Error signing out:", error);
          });
      } else {
        toast.success(`Access granted. You are authorized to access this site, ${user.displayName}!`);
        router.push("./dashboard");
      }
    }
  }, [user, loading, allowedEmails, router, auth, db]);


  return (
<section className="flex justify-center">
<div className="relative py-16 mt-32">  
    <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto w-8/10">
            <div className="rounded-xl bg-white shadow-md">
                <div className="p-6">
                    <div className="p-2 flex justify-center">
                        <UsnIcon className="w-32 my-auto mb-5"/>
                    </div>
                    <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input disabled type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Admin"/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input disabled type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>

              </form>
              <div className="inline-flex items-center justify-center w-full">
              <hr className="w-full mb-6 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"/>
              <span className="absolute px-3 font-medium text-gray-500 -translate-x-1/2 bg-white left-1/2">or</span>
              </div>
                    <div>

                        <button
                      className="inline-flex items-center justify-center px-5 w-48 py-2 w-full text-base font-medium text-center text-gray-600 rounded-lg border border-gray-300 focus:ring-4 focus:ring-gray-500 hover:bg-gray-50 hover:focus:ring-4 hover:border-blue-500"
                      onClick={signInWithGoogle}
                    >
                    <img className='mr-2'
                      width={30}
                      src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                    />
                    <span className='text-[13px] font-semibold'>Sign in with Google</span>
                    </button>
                    </div>

                    <div className="mt-8 text-gray-600 text-center">
                        <p className="text-xs">This site is protected by <a href="#" className="underline">Google Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a> apply.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<ToastContainer/>
</section>

    /*
<button
                className="inline-flex items-center justify-center px-5 w-48 py-3 my-3 mx-auto w-full text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                onClick={signInWithGoogle}
              >
                <img className='mr-2'
                  width={30}
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                />
                <span className='text-[13px] font-bold'>Login with Google</span>
              </button>
*/

    
  );
}