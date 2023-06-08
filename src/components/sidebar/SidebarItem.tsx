import Link from "next/link";
import { useEffect, useState } from "react";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { LayoutGrid, Calendar, Lock, LayoutTemplate, Sprout, GraduationCap, Users, List, Heart, LinkIcon, HelpCircle, ShieldCheck } from "lucide-react";
import { useRouter } from "next/router";

const links = [
  { headTitle: 'Main', links: [
  {icon: <LayoutGrid className="ml-2 h-4 w-4" /> , title: 'Dashboard', href: '/dashboard' },
  {icon: <Calendar className="ml-2 h-4 w-4"/>, title: 'Program', href: '/dashboard/program' },
  {icon: <Users className="ml-2 h-4 w-4"/> ,title: 'Groups', href: '#' },
  {icon: <List className="ml-2 h-4 w-4"/>, title: 'List', href: '#' },
  ]},
  {headTitle: 'Sections', links: [
    {icon: <LayoutTemplate className="ml-2 h-4 w-4"/>, title: 'Articles', href: '#' },
    {icon: <HelpCircle className="ml-2 h-4 w-4"/>, title: 'Questions', href: '#' },
    {icon: <Sprout className="ml-2 h-4 w-4" />, title: 'Student Life', href: '#' },
    {icon: <GraduationCap className="ml-2 h-4 w-4" />, title: 'Student Org.', href: '#' },
    {icon: <Heart className="ml-2 h-4 w-4"/>, title: 'Student Reviews', href: '#' },
  ]},
  {headTitle: 'Others', links: [
    {icon: <ShieldCheck className="ml-2 h-4 w-4"/>, title: 'Team', href: '#' },
    {icon: <LinkIcon className="ml-2 h-4 w-4"/>, title: 'Nettskjema', href: '#' },

]}];

  
const SidebarItem = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  
  return (
    <div>
      {links.map((linkGroup, groupIndex) => (
        <div key={groupIndex} className="mb-5">
          <h2 className="mb-1 px-2 font-semibold tracking-tight text-gray-700 text-xs">
            {linkGroup.headTitle}
          </h2>
          <ul className="space-y-1">
            {linkGroup.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link
                  href={link.href}
                  className={`flex items-center px-1 py-2 text-xs font-semibold rounded-lg group ${
                    activeLink === link.href
                      ? 'text-gray-50 bg-gray-950 hover:bg-gray-900 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-600 dark:text-white hover:text-gray-50 hover:bg-gray-950 dark:hover:bg-gray-700'
                  }`}
                >
                  {link.icon}
                  <span className="ml-2">{link.title}</span>
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
            href="/dashboard/authorized"
            className={`flex items-center p-2 text-xs font-semibold rounded-lg group ${
              activeLink === '/dashboard/authorized'
                ? 'text-gray-50 bg-gray-950 hover:bg-gray-900 dark:bg-gray-700 dark:text-white'
                : 'text-gray-600 dark:text-white hover:text-gray-50 hover:bg-gray-950 dark:hover:bg-gray-700'
            }`}
          >
            <Lock className="ml-2 h-4 w-4" />
            <span className="ml-2">Authorized</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarItem;