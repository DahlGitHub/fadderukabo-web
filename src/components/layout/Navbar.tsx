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
    title: 'Studentlivet',
    href: '/info#faq',
    description: 'Coming soon.',
    category: 'Ny',
  },
  {
    title: 'Ofte stilte spørsmål',
    href: '#student',
    description: 'Coming soon.',
    category: 'Ny',
  },
  {
    title: 'Studentorganisasjoner',
    href: '#student',
    description: 'Coming soon.',
    category: 'Ny',
  },
  {
    title: 'Student Sørøst Appen',
    href: '#student',
    description: 'Coming soon.',
    category: 'Ny',
  },
  {
    title: 'Fadder',
    href: '#component1',
    description: 'Component 1 description.',
    category: 'Fadder',
  },
  {
    title: 'Trygg Fadder',
    href: '#component2',
    description: 'Component 2 description.',
    category: 'Fadder',
  },
  {
    title: 'Faddergrupper',
    href: '#component2',
    description: 'Component 2 description.',
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
