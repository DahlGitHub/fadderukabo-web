import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Separator } from './ui/separator';

const links = [
  {
    title: 'Fadderuka',
    children: [{ title: 'Program', href: '/' }],
  },
  {
    title: 'Fadder',
    children: [
      { title: 'Min Fadder', href: '/' },
      { title: 'Trygg Fadder', href: '/' },
      { title: 'Faddergrupper', href: '/' },
    ],
  },
  {
    title: 'Ny Student',
    children: [
      { title: 'Studentlivet', href: '/' },
      { title: 'Ofte stilte spørsmål', href: '/' },
      { title: 'Studentorganisasjoner', href: '/' },
      { title: 'Student Sørøst Appen', href: '/' },
    ],
  },
];

export function MobileNav() {
  return (
    <div
      className={cn(
        'fixed font-poppins inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-2 pb-32 shadow-md animate-in slide-in-from-left-80 md:hidden',
      )}
    >
      <div className="relative z-40 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        {links.map((link, index) => (
          <div key={index}>
            <>
              <span className="font-semibold text-[13px] text-purple-700">{link.title}<Separator className='my-2' /></span>
              <nav className="grid grid-flow-row auto-rows-max text-sm">
                {link.children.map(
                  (childLink, childIndex) =>
                    childLink.href && (
                      <Link
                        key={childIndex}
                        href={childLink.href}
                        className={cn(
                          'flex w-full items-center justify-between rounded-md p-2 text-sm font-medium hover:bg-slate-100',
                        )}
                      >
                        <span className="mx-2">{childLink.title}</span>
                        <ChevronRight className="text-gray-600" />
                      </Link>
                    ),
                )}
              </nav>
            </>
          </div>
        ))}
      </div>
    </div>
  );
}
