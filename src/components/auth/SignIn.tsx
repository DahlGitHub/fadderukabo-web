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
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
      <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <UsnIcon className="w-8 h-8 mr-2"/>
          Universitet i Sørøst-Norge    
      </div>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Dashboard Login
                 <div>
        
        <button
          className="inline-flex items-center justify-center px-5 py-3 my-3 mx-auto w-full text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          onClick={signInWithGoogle}
        >
          <img
            width={30}
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
          />
          Login with Google
        </button>
        
    </div> 
              </h1>
            
          </div>
      </div>
  </div>
  <ToastContainer />
</section>
    
  );
}