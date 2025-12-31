import * as React from 'react';
import Image from 'next/image';
import FooterItems from '../FooterItems';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 font-poppins">
      <FooterItems />
        <div className='py-2 text-xs text-center'>
          Copyright @ 2023 <Link href="https://www.linkedin.com/in/dahladrian/" className='hover:underline' target='_blank'>Adrian Dahl</Link> 
        </div>
        <hr className="my-2 border-gray-200" />
        <div className="pt-3 flex items-center space-x-2">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/usnfadderuka.firebasestorage.app/o/Images%2FUSN-symbol_sort.png?alt=media&token=1f3e24b0-7d87-4c36-aad5-55eab52d308f"
            alt={'USN'}
            width={25}
            height={25}
          />
          <span className='text-sm'>Universitetet i Sørøst-Norge</span>
        </div>
      </div>
    </footer>
  );
}
