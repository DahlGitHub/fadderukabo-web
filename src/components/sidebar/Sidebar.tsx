import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import Link from "next/link";
import { MoveLeft} from "lucide-react";
import Usn from '/public/svg/usnlogo.svg';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {


  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });



  return (
    <aside
      
      className={`absolute left-0 top-0 z-50 flex h-screen w-60 flex-col bg-white border-r overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
   
      <div className="flex items-center justify-between gap-2 px-6 ">
        
        <Link href="/">
        <Usn className="text-[5rem]"/>
        </Link>

        <button
          
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
         <MoveLeft/>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-hidden duration-300 ease-linear">
        <nav className="px-3">
          <div className="mb-6 flex flex-col gap-1.5">
              <SidebarItem/>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;