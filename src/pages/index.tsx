import * as React from 'react';

import Layout from '@/components/layout/Layout';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from '/public/svg/vercel.svg';
import Usn from '/public/svg/usnlogo.svg';
import Ssn from '/public/svg/ssn.svg';

export default function HomePage() {
  return (
    <Layout>
      <main className="pb-16 bg-white">
        <section> 
    <div className='relative flex flex-col items-center justify-center py-12 text-center'>
      <Vercel className='text-5xl' />
      <h1 className='mt-4'>
        Next.js + Tailwind CSS + TypeScript Starter
      </h1>
      <p className='mt-2 text-sm text-gray-800'>
        A starter for Next.js, Tailwind CSS, and TypeScript with Absolute
        Import, Seo, Link component, pre-configured with Husky{' '}
      </p>
      <p className='mt-2 text-sm text-gray-700'>
      
      </p>
    </div>
  </section>
</main>

    </Layout>
  );
}