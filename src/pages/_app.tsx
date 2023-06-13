import { AppProps } from 'next/app';

import '@/styles/globals.css';
import { SSRProvider } from '@react-aria/ssr';

import initAuth from '@/components/auth/initAuth';

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <>
      <SSRProvider>
      <Component {...pageProps} />
      </SSRProvider>
    </>
  
  );
}

export default MyApp;