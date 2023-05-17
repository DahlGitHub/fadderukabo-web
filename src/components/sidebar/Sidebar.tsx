import SidebarItem from "./SidebarItem";


const Sidebar = () => {

  
  return (
    <div className="flex h-[calc(100vh-70px)] transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
    <div className="flex flex-col items-center space-y-10 py-2.5 p-2.5">
        <div className=" rounded-md bg-white dark:bg-gray-800 ">
        <SidebarItem/>

        </div>
    </div>
    </div>
  );
};

export default Sidebar;