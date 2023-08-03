'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const menuItems: {
  title: string;
  href: string;
  description: string;
  category: string;
}[] = [
  {
    title: 'Campus Bø',
    href: '/student',
    description: 'Informasjon om Universitetet i Sørøst-Norge.',
    category: 'Ny',
  },
  {
    title: 'Studentorganisasjoner',
    href: '/student#organisasjoner',
    description: 'Studentorganisasjoner på Campus Bø.',
    category: 'Ny',
  },
  {
    title: 'Ofte stilte spørsmål',
    href: '/student#faq',
    description: 'Noen av de mest stilte spørsmålene.',
    category: 'Ny',
  },
  {
    title: 'Studentlivet',
    href: '/student#studentlivet',
    description: 'Ta en liten titt på studentlivet i Bø.',
    category: 'Ny',
  },
  {
    title: 'Student Sørøst Appen',
    href: '/student/#appen',
    description: 'Studentappen for studenter i Sørøst-Norge.',
    category: 'Ny',
  },
  {
    title: 'Fadder',
    href: '/fadder',
    description: 'Fadderordningen.',
    category: 'Fadder',
  },
  {
    title: 'Trygg Fadder',
    href: '/fadder#trygg-fadder',
    description: 'Sikkert og trygt fadderopplegg.',
    category: 'Fadder',
  },
  {
    title: 'Faddergrupper',
    href: '/fadder#faddergrupper',
    description: 'Gruppe for faddere og fadderbarn.',
    category: 'Fadder',
  },
];

export function Navbar() {
  const gettingStarted = menuItems.filter(
    item => item.category === 'Fadder',
  );
  const components = menuItems.filter(item => item.category === 'Ny');

  return (
    <NavigationMenu className="font-poppins">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/program" legacyBehavior passHref>
            <NavigationMenuLink className={cn('bg-transparent p-3 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground')}>
              <span className='font-normal'>Program</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn('bg-transparent')}><span className='font-normal'>Fadder</span></NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 grid-cols-1 ">
              {gettingStarted.map(component => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn('bg-transparent')}><span className='font-normal'>Ny Student</span></NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4  grid-cols-1 ">
              {components.map(component => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <Link href={props.href!} legacyBehavior passHref scroll {...props}>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </Link>
    </li>
  );
});
ListItem.displayName = 'ListItem';
