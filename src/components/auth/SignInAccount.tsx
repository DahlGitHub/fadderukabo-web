import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState, useEffect } from 'react';
import { signInWithGoogle, db, getSessionToken, auth } from '../../../firebase';
import 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from 'next/image';
import UsnIcon from 'public/svg/usnicon.svg';
import { signOut } from 'firebase/auth';
import GoogleIcon from 'public/svg/google.svg';

export default function SignInAccont() {
  const [user, loading, error] = useAuthState(auth); // Assuming you have initialized the Firebase auth instance as `auth`
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getSessionToken(user)
        .then(sessionToken => {
          if (sessionToken) {
            toast.success('Successfully signed in.');
            window.location.reload();
            console.log(sessionToken);
          } else {
            signOut(auth)
              .then(() => {
                toast.error(
                  'Access denied. You are not authorized to access this site.',
                );
              })
              .catch(error => {
                toast.error('Error signing out:', error);
              });
          }
        })
        .catch(error => {
          toast.error('Error getting session token:', error);
        });
    }
  }, [user, loading, router]);

  return (
    <div className="flex justify-center">
      <div className="relative py-16 mt-32">
        <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
          <div className="m-auto w-8/10">
            <div className="rounded-xl bg-white shadow-md">
              <div className="p-6">
                <div className="p-2 flex justify-center">
                  <UsnIcon className="w-32 my-auto mb-5" />
                </div>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      disabled
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Admin"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      disabled
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </form>
                <div className="inline-flex items-center justify-center w-full">
                  <hr className="w-full mb-6 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700" />
                  <span className="absolute px-3 font-medium text-gray-500 -translate-x-1/2 bg-white left-1/2">
                    or
                  </span>
                </div>
                <div>
                  <button
                    className="inline-flex items-center justify-center px-5 w-48 py-2 w-full text-base font-medium text-center text-gray-600 rounded-lg border border-gray-300 focus:ring-4 focus:ring-gray-500 hover:bg-gray-50 hover:focus:ring-4 hover:border-blue-500"
                    onClick={signInWithGoogle}
                  >
                    <GoogleIcon className="w-3 h-3 mr-2" />
                    <span className="text-[13px] font-semibold">
                      Sign in with Google
                    </span>
                  </button>
                </div>

                <div className="mt-8 text-gray-600 text-center">
                  <p className="text-xs">
                    This site is protected by{' '}
                    <a href="#" className="underline">
                      Google Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a href="#" className="underline">
                      Terms of Service
                    </a>{' '}
                    apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
