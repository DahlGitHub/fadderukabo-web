import Image from "next/image";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const SidebarItems = [
    { id: 1, iconItem: "", text: "Dashboard",link: "/dashboard" },
    { id: 2, iconItem: "", text: "Events",link: "/dashboard/kanban" },
    { id: 3,  iconItem: "", text: "Groups",link: "/dashboard/files" },
    { id: 4, iconItem: "", text: "Org.",link: "/dashboard/contactChat" },
    { id: 5, iconItem: "", text: "Studentlife",link: "/dashboard/teams" },
    { id: 5, iconItem: "", text: "Reviews",link: "/dashboard/teams" },
    { id: 5, iconItem: "", text: "Static",link: "/dashboard/teams" },
    { id: 5, iconItem: "", text: "Fadderlist",link: "/dashboard/teams" },
  ];
const SidebarItem = () => {


  return (
    <div >
        <ul>
            {SidebarItems.map(({ ...item}) => {
            return (
            <li key={item.id} className="flex text-center">
                <Link href={item.link} className="flex-inline w-full p-2.5 rounded-md text-gray-700 hover:bg-gray-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600">
                    {item.iconItem}
                    <span className="block text-[10px] ">{item.text}</span>
                </Link>
            </li>
            )})}
        </ul>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
        <ul className='w-full'>
         <li className="flex text-center">
            <Link href="/dashboard/settings" className="flex-inline w-full p-2.5 rounded-md  text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600">
              
              <span className="block text-[10px] ">Access</span>
            </Link>
            
         </li>
      </ul>
    </div>
    );
};

export default SidebarItem;