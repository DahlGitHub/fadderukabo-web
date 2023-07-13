import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import { SSRProvider } from '@react-aria/ssr';

export default function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <>
    <SSRProvider>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-NPC2RCX0WJ" />
        <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
          gtag('config', 'G-NPC2RCX0WJ');
        `}
        </Script>
        <Component {...pageProps} />
        
        <Toaster />
    </SSRProvider>
    </>
  );
}
