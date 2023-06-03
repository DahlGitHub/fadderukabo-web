
const Header = (props: {
    sidebarOpen: boolean;
    setSidebarOpen: (arg0: boolean) => void;
  
    }) => {
    return (
      <header className="sticky top-0 z-10 flex bg-gray-100 w-full drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
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
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
              </span>
            </button>
            {/* <!-- Hamburger Toggle BTN --> */}
  
          </div>
  
          <div className="hidden sm:block">
 
          </div>
  
          <div className="flex items-center gap-3 2xsm:gap-7">
            <ul className="flex items-center gap-2 2xsm:gap-4">
            Hello
            </ul>
  
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;