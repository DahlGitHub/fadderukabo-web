import * as React from 'react';
import Footer from './Footer';
import { Navbar } from './Navbar';
import Link from 'next/link';
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {



  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-Scenter space-x-4 sm:justify-between sm:space-x-0">
          
          <Link href="/">
              <Image 
              src="https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/USN-symbol_lilla.png?alt=media&token=0ab4e9b3-3974-41f4-8d7f-41a0753bed07" 
              alt={'USN'}
              width={40}
              height={40} />
          </Link>
          <div className="flex flex-1 items-center space-x-4 sm:justify-end">
            <div className="flex-1 sm:grow-0">
              <Navbar />
            </div>
          </div>
        </div>
      </header>
        <main className="mb-auto">
          {children}
        </main>
        <Footer />
      </div>
  );
}
