import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentMenu } from "../redux/pathNavigationSlice";

const Sidebar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const currentMenu = useSelector(
    (state) => state.navigation.navigation.currentMenu
  );
  const userSideMenu = useSelector((state) => state.navigation.navigation.userSideMenu);
  const adminSideMenu = useSelector((state) => state.navigation.navigation.adminSideMenu);
  const userSettingsSideMenu = useSelector((state) => state.navigation.navigation.userSettingsSideMenu);
  const superAdminSettingsSideMenu = useSelector((state) => state.navigation.navigation.superAdminSettingsSideMenu);
  
  const navigateToHome = () => {
    navigate("/")
    dispatch(setCurrentMenu("default"))
  }

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 px-3 transition-transform  bg-white border-r border-gray-200 
            ${
              props.displaySidebar === true && "-translate-x-full"
            }  lg:translate-x-0 `}
      aria-label="Sidebar"
    >
        {(currentMenu !== "default") && (
              <div
                  className="px-3 py-2 w-1/2 items-center hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={navigateToHome}
              >
                <img src="../src/assets/back.png" className="inline-block w-5 mr-3" />
                Home
            </div>
        )}
      <h3 className="px-3 mt-7 text-greyTextColor pb-1.5">
        {currentMenu === "settings" ? "SETTINGS" : "MANAGE"}
      </h3>
      <div className="h-full pb-4 overflow-y-auto bg-white ">
        <ul className="space-y-2 font-medium">
          {currentMenu !== "settings" &&
            (userInfo.userrole === "user"
              ? userSideMenu.map((menuItem, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={menuItem.path}
                        className={`flex items-center p-2 text-gray-900 rounded-lg ${
                          location.pathname === menuItem.path
                            ? "bg-secondLightBrown hover:bg-none"
                            : "hover:bg-gray-100"
                        } group`}
                      >
                        <img
                          src={menuItem.icon}
                          className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                          alt="icon"
                        />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          {menuItem.menuname}
                        </span>
                      </Link>
                    </li>
                  );
                })
              : adminSideMenu.map((menuItem, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={menuItem.path}
                        className={`flex items-center p-2 text-gray-900 rounded-lg ${
                          location.pathname === menuItem.path
                            ? "bg-secondLightBrown hover:bg-none"
                            : "hover:bg-gray-100"
                        } group`}
                      >
                        <img
                          src={menuItem.icon}
                          className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                          alt="icon"
                        />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          {menuItem.menuname}
                        </span>
                      </Link>
                    </li>
                  );
                }))}
          {currentMenu === "settings" &&
            (userInfo.userrole !== "super_admin"
              ? userSettingsSideMenu.map((menuItem, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={menuItem.path}
                        className={`flex items-center p-2 text-gray-900 rounded-lg ${
                          location.pathname === menuItem.path
                            ? "bg-secondLightBrown hover:bg-none"
                            : "hover:bg-gray-100"
                        } group`}
                      >
                        <img
                          src={menuItem.icon}
                          className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                          alt="icon"
                        />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          {menuItem.menuname}
                        </span>
                      </Link>
                    </li>
                  );
                })
              : superAdminSettingsSideMenu.map((menuItem, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={menuItem.path}
                        className={`flex items-center p-2 text-gray-900 rounded-lg ${
                          location.pathname === menuItem.path
                            ? "bg-secondLightBrown hover:bg-none"
                            : "hover:bg-gray-100"
                        } group`}
                      >
                        <img
                          src={menuItem.icon}
                          className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                          alt="icon"
                        />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          {menuItem.menuname}
                        </span>
                      </Link>
                    </li>
                  );
                }))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
