import * as React from 'react';
import Image from 'next/image';
import FooterItems from '../FooterItems';

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <FooterItems />
        <div className='py-2 text-xs text-center'>
          Copyright @ 2023 Adrian Dahl
        </div>
        <hr className="my-2 border-gray-200" />
        <div className="pt-3 flex items-center space-x-2">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/USN-symbol_lilla.png?alt=media&token=0ab4e9b3-3974-41f4-8d7f-41a0753bed07"
            alt={'USN'}
            width={25}
            height={25}
          />
          <span className=''>Universitetet i Sørøst-Norge</span>
        </div>
      </div>
    </footer>
  );
}
