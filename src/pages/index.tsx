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
        <section> 
        <div className='relative flex flex-col items-center justify-center py-12 text-center'>
            <a href="https://www.usn.no" className="hover:text-gray-800 dark:hover:text-gray-400">
                <Usn className="text-[10rem]"/>
            </a> 
            <h1 className='mt-4 tracking-widest uppercase font-semibold text-3xl'>
                Coming Soon
            </h1>
            <p className='mt-2 text-sm text-gray-800 font-semibold uppercase text-xl tracking-widest'>
                Stay tuned
            </p>
            <p className='mt-2 text-sm text-gray-700'>
            
            </p>
        </div>
        </section>
    </Layout>
  );
}