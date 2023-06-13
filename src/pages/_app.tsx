import { AppProps } from 'next/app';

import '@/styles/globals.css';
import { Toaster } from "@/components/ui/toaster";

import initAuth from '@/components/auth/initAuth';

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  
  );
}

export default MyApp;