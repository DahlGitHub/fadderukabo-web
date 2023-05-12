import React from 'react';

import { useState, useEffect } from "react";
import { signInWithGoogle } from "../../../firebase";
import 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from 'firebase/auth';

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
            alert("Access denied. You are not authorized to access this site.");
          })
          .catch((error) => {
            console.error("Error signing out:", error);
          });
      } else {
          alert(`Access granted. You are authorized to access this site, ${user.displayName}!`);
      }
    }
  }, [user, loading, router, auth]);

  return (
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
  );
}