import Link from "next/link";
import { useEffect, useState } from "react";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { LayoutGrid, CalendarDays, Lock, LayoutTemplate, Sprout, GraduationCap } from "lucide-react";
import { useRouter } from "next/router";

const links = [
  { headTitle: 'Main', links: [
  {icon: <LayoutGrid /> , title: 'Dashboard', href: '/dashboard' },
  {icon: <CalendarDays/>, title: 'Program', href: '/dashboard/program' },
  { title: 'Groups', href: '#' },
  { title: 'List', href: '#' },
  ]},
  {headTitle: 'Sections', links: [
    { title: 'Student Life', href: '#' },
    { title: 'Student Org.', href: '#' },
    { title: 'Student Reviews', href: '#' },
  ]},
];

  
const SidebarItem = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  return (
    <div>
      {links.map((linkGroup, index) => (
        <div key={index} className="mt-5">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            {linkGroup.headTitle}
          </h2>
          <ul className="space-y-1">
            {linkGroup.links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className={`flex items-center p-2 text-sm font-semibold rounded-lg group ${
                    activeLink === link.href
                      ? 'text-gray-900 bg-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {link.icon}
                  <span className="ml-3">{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

      <ul>
        <li>
          <Link
            href="#"
            className={`flex items-center p-2 text-sm font-semibold rounded-lg group ${
              activeLink === '#'
                ? 'text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white'
                : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Lock />
            <span className="ml-3">Authorized</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarItem;