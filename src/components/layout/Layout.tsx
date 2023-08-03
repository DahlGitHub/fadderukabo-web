import * as React from 'react';
import Footer from './Footer';
import { Navbar } from './Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { MobileNav } from '../MobileNav';
import { AlignLeft, X } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b border-gray-100 backdrop-blur bg-white/80">
        <div className="container flex h-14 items-center space-x-4 sm:justify-between sm:space-x-0">
          <Link href="/">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/USN-symbol_sort.png?alt=media&token=e72960d6-666d-4c3c-9b6a-a38d9ab25ce7"
              alt={'USN'}
              width={40}
              height={40}
            />
          </Link>
          <div className="flex flex-1 items-center space-x-4 sm:justify-end">
            <div className="flex-1 sm:grow-0">
              <nav className="hidden md:flex">
                <Navbar />
              </nav>
              <div className='flex justify-end'>
              <button
                className="flex items-center space-x-2 md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X/> : <AlignLeft/>}
              </button>
              </div>
              {showMobileMenu && <MobileNav closeMenu={() => setShowMobileMenu(false)} />}
              
            </div>
          </div>
        </div>
      </header>
      <main className="mb-auto">{children}</main>
      <Footer />
    </div>
  );
}
