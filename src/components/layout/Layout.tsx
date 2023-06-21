import * as React from 'react';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
<div className="mx-auto">
<div className="flex h-screen flex-col justify-between">
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
  </div>
  );
}