import Link from "next/link";
import { useEffect, useState } from "react";
import SidebarLinkGroup from "./SidebarLinkGroup";

const links = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Program', href: '/dashboard/program' },
  { title: 'Groups', href: '#' },
  { title: 'List', href: '#' },
  { title: 'Carousel',
    sublinks: [
      { title: 'Org.', href: '#' },
      { title: 'Studentlife', href: '#' },
      { title: 'Reviews', href: '#' }
    ]
  },
  {
    title: 'Sections',
    sublinks: [
      { title: 'Org.', href: '#' },
      { title: 'Studentlife', href: '#' },
      { title: 'Reviews', href: '#' }
    ]
  },
];

  
const SidebarItem = () => {

  const storedSidebarExpanded = typeof window !== "undefined" && localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  
  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (

    <div>
      <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          {link.sublinks ? (
            <SidebarLinkGroup>
              {(handleClick, open) => (
                <>
                  <Link
                    href="#"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                    }}
                  >

                    {link.title}
                    <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                  </Link>
                  <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                      {link.sublinks.map((sublink, index) => (
                        <li key={index}>
                          <Link
                            href={sublink.href}
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                          >
                            <span className="ml-3">{sublink.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </SidebarLinkGroup>
          ) : (
           
              <Link
                href={link.href}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="ml-3">{link.title}</span>
              </Link>
          
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

    );
};

export default SidebarItem;