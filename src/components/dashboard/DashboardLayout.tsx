import React, { ReactNode, useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Header from '../dashboard/Header';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DefaultLayoutProps) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="max-w-screen p-4 px-8 ">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
