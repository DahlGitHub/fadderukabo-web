import { AlignLeft} from "lucide-react"
import { UserNav } from "../UserNav";

const Header = (props: {
    sidebarOpen: boolean;
    setSidebarOpen: (arg0: boolean) => void;
  
    }) => {
    return (
<header className="sticky top-0 z-10 bg-gray-100 w-full drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
  <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
    <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
      {/* <!-- Hamburger Toggle BTN --> */}
      <button
        aria-controls="sidebar"
        onClick={(e) => {
          e.stopPropagation();
          props.setSidebarOpen(!props.sidebarOpen);
        }}
        className="z-50 block rounded-sm p-1.5 lg:hidden"
      >
        <span>
          <AlignLeft/>
        </span>
      </button>
    </div>
    <div>

    </div>
    <div className="flex justify-end space-x-2 bg-gray-200">
      <UserNav />
    </div>
  </div>
</header>
    );
  };
  
  export default Header;