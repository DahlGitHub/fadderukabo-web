import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import { SSRProvider } from '@react-aria/ssr';
import Head from 'next/head';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SSRProvider>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-NPC2RCX0WJ"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
          gtag('config', 'G-NPC2RCX0WJ');
        `}
        </Script>
        <Head>
          <title>Fadderuka Bø</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="icon" type="image/png" href="/favicon-32x32.png" />

          <meta charSet="utf-8" />
          <meta
            name="Keywords"
            content="studiestart,fadder,usn,sørøst-norge,fadderuka,universitetet"
          />
          <meta
            name="Description"
            content="Velkommen til Fadderuka Bø ved Universitetet i Sørøst-Norge Campus Bø!"
          />
          <meta
            property="og:title"
            content="Fadderuka Bø"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.fadderukabo.no/" />
          <meta
            property="og:description"
            content="Velkommen til Fadderuka Bø ved Universitetet i Sørøst-Norge Campus Bø!"
          />
          <meta
            property="og:site_name"
            content="Fadderuka Bø"
          />
          <meta property="og:locale" content="no_NO" />
        </Head>
        <Component {...pageProps} />

        <Toaster />
      </SSRProvider>
    </>
  );
}
