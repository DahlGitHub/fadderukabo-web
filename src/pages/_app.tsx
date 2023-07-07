import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { Toaster } from '@/components/ui/toaster';

import { SessionProvider } from 'next-auth/react';

export default function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <Toaster />
      </SessionProvider>
    </>
  );
}
