import { AppProps } from 'next/app';

import '@/styles/globals.css';

import initAuth from '@/components/auth/initAuth';
import { Toaster } from '@/components/ui/toaster';

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