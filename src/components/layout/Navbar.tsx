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

const components: {
  title: string;
  href: string;
  description: string;
  id?: string;
}[] = [
  {
    title: 'FAQ',
    href: '/',
    description:
      'Coming soon.',
    id: '',
  },
  {
    title: 'Student Sørøst',
    href: '/',
    description:
      'Coming soon.',
  },
];

export function Navbar() {
  return (
    <NavigationMenu className='font-poppins'>
      <NavigationMenuList>
      <NavigationMenuItem>
          <Link href="/program" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Program
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='text-sm font-light uppercase'>Fadder</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-col-1 gap-3 p-6 md:w-[200px] lg:w-[300px]">
              <ListItem href="/" title="Fadder">
                Coming soon.
              </ListItem>
              <ListItem href="/" title="Faddergrupper">
                Coming soon.
              </ListItem>
              <ListItem href="/" title="Trygg Fadder">
                Coming soon.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Ny Student</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-col-1 gap-3 p-6 md:w-[200px] lg:w-[300px]">
              {components.map(component => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  id={`component-${component.title
                    .toLowerCase()
                    .replace(/\s/g, '-')}`}
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
      <NavigationMenuLink asChild>
        <Link
          href={props.href ?? '#'}
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
