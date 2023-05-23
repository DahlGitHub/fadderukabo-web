import Image from "next/image";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const links = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Program', href: '/dashboard/program' },
  { title: 'Groups', href: '#' },
  { title: 'List', href: '#' },
  {
    title: 'Extra',
    sublinks: [
      { title: 'Org.', href: '#' },
      { title: 'Studentlife', href: '#' },
      { title: 'Reviews', href: '#' }
    ]
  },
];


const SidebarItems = [
    { id: 1, iconItem: "", text: "Dashboard",link: "/dashboard" },
    { id: 2, iconItem: "", text: "Events",link: "/dashboard/events" },
    { id: 3,  iconItem: "", text: "Groups",link: "/dashboard/files" },
    { id: 4, iconItem: "", text: "Org.",link: "/dashboard/contactChat" },
    { id: 5, iconItem: "", text: "Studentlife",link: "/dashboard/teams" },
    { id: 5, iconItem: "", text: "Reviews",link: "/dashboard/teams" },
    { id: 5, iconItem: "", text: "Static",link: "/dashboard/teams" },
    { id: 5, iconItem: "", text: "Fadderlist",link: "/dashboard/teams" },
  ];
const SidebarItem = () => {


  return (
<aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidenav">
    <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            {link.sublinks ? (
              <button type="button" className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls={`dropdown-${index}`} data-collapse-toggle={`dropdown-${index}`}>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">{link.title}</span>
              </button>
            ) : (
              <Link href={link.href} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ml-3">{link.title}</span>
              </Link>
            )}
            {link.sublinks && (
              <ul id={`dropdown-${index}`} className="hidden py-2 space-y-2">
                {link.sublinks.map((sublink, subIndex) => (
                  <li key={subIndex}>
                    <Link href={sublink.href} className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">{sublink.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
      <ul>
      <li>
        <Link href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                  <svg className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clip-rule="evenodd"></path></svg>
                  <span className="ml-3">Access</span>
          </Link>
      </li>
      </ul>
    </div>
  </aside>
    );
};

export default SidebarItem;