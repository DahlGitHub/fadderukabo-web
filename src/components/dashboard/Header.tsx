import { AlignLeft } from 'lucide-react';
import { UserNav } from '../UserNav';

const Header = (props: {
  sidebarOpen: boolean;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-10 bg-white w-full border-b dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between py-2 px-4 shadow-2">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={e => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-50 block rounded-sm p-1.5 lg:hidden"
          >
            <span>
              <AlignLeft />
            </span>
          </button>
        </div>
        <div className="flex-1 text-sm">
          <span className="flex flex-row">

          </span>
        </div>
        <div className="flex justify-end space-x-2 rounded-full hover:bg-gray-200 p-1.5">
          <UserNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
