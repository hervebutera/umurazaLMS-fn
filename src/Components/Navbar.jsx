import UserDropdown from "./UserDropdown";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const userImageRef = useRef();

  const [displayDropdown, setDisplayDropdown] = useState(false);
  
    const userInfo = useSelector((state) => state.userInfo.userInfo)
    const userInfoNotEmpty = (Object.keys(userInfo).length > 0);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
              onClick={() => props.setDisplaySidebar(!props.displaySidebar)}
            >
              <span className="sr-only">{"Open sidebar"}</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link to={userInfoNotEmpty ? "/": "/login"}>
                <div className="flex flex-col ms-2 md:me-24 text-sm text-black font-bold ">
                    <h1>Rwanda Cultural</h1>
                    <div className="flex flex-row gap-1">
                        <h2>Village</h2>
                        <h2 className="bg-darkBrown text-xs py-1 px-1.5 rounded-md text-white">
                        LMS
                        </h2>
                    </div>
                </div>
            </Link>
            
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex sm:flex-col justify-center min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {userInfo.firstname}
                  </p>
                  {(userInfo.userrole !== "user") && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg">
                        {userInfo.userrole}
                    </span>
                  )}
                  
                </div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 "
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                  onClick={() => setDisplayDropdown(!displayDropdown)}
                  ref={userImageRef}
                >
                  <span className="sr-only">{"Open user menu"}</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={userInfo.profileImageUrl || "../src/assets/user_avatar.png"}
                    alt="user photo"
                  />
                </button>
              </div>
              <UserDropdown
                dropDownState={displayDropdown}
                userImageRefState={userImageRef}
                setDisplayDropdown={setDisplayDropdown}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
