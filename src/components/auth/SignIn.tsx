import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from "react";
import { signInWithGoogle } from "../../../firebase";
import 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from 'firebase/auth';

import UsnIcon from "public/svg/usnicon.svg"

export default function SignIn() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }

    if (user) {
      const allowedEmails = ['fadderstyretbo@gmail.com'];
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
      }
    }
  }, [user, loading, router, auth]);

  return (
<section className="bg-white dark:bg-gray-900 flex justify-center">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">


          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                  <img className="rounded-lg sm:rounded-none sm:rounded-l-lg w-48" src="https://cdn.discordapp.com/attachments/1085273618763751434/1107094973926621294/rsz_6460246e1f0b7.png" alt="Jese Avatar"/>
              </a>
              <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <span>Dashboard</span>
                  </h3>
                  <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Jese drives the technical strategy.</p>
                  <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                  <div className="flex space-x-4 sm:mt-0">
                  <button
                className="inline-flex items-center justify-center px-5 w-48 py-2 w-full text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                onClick={signInWithGoogle}
              >
                <img className='mr-2'
                  width={30}
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                />
                <span className='text-[13px] font-bold'>Login with Google</span>
              </button>
                  </div>
              </div>
          </div> 
  </div>
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