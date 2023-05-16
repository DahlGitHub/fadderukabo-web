import { AppProps } from 'next/app';

import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import { SSRProvider } from '@react-aria/ssr';


/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <SSRProvider>
      <Component {...pageProps} />
      <ToastContainer/>
    </SSRProvider>
  
  );
}

export default MyApp;