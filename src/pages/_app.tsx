import { AppProps } from 'next/app';

import '@/styles/globals.css';

import initAuth from '@/components/auth/initAuth';
import { Toaster } from '@/components/ui/toaster';
import { SSRProvider } from '@react-aria/ssr';

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <>
      <SSRProvider>
      <Component {...pageProps} />
      <Toaster />
      </SSRProvider>
    </>
  
  );
}

export default MyApp;