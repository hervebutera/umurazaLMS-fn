import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../redux/userSlice";
import { setCurrentMenu } from "../redux/pathNavigationSlice";

const UserDropdown = (props) => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const navigation = useSelector((state) => state.navigation.navigation)

  const navigate = useNavigate();

  const Dispatch = useDispatch();
  const dropDownRef = useRef();

  const signOut = () => {
    localStorage.removeItem("rcv_token");
    Dispatch(signout());
    Dispatch(setCurrentMenu("default"))
    navigate("/login");
  };
  const navigateSettings = () => {
    if (userInfo.userrole !== "user") {
      navigate(navigation.superAdminSettingsSideMenu[0].path)
    } else {
      navigate(navigation.userSettingsSideMenu[0].path)
    }
    Dispatch(setCurrentMenu("settings"))
  }

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (
        props.userImageRefState.current &&
        props.userImageRefState.current.contains(e.target) === false
      ) {
        if (
          dropDownRef.current &&
          dropDownRef.current.contains(e.target) === false
        ) {
          return props.setDisplayDropdown(false);
        }
      }
    });
  }, []);

  return (
    <>
      {props.dropDownState && (
        <div
          className="z-50 absolute w-48 right-4 top-11 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg"
          id="dropdown-user"
          ref={dropDownRef}
        >
          <div className="px-4 py-3" role="none">
            <p className="text-sm text-gray-900 " role="none">
              {`${userInfo.firstname} ${userInfo.lastname}`}
            </p>
            <p
              className="text-sm font-medium text-gray-900 truncate "
              role="none"
            >
              {`user name: ${userInfo.username}`}
            </p>
            {userInfo.userrole !== "user" && (
              <span className="bg-blue-100 sm:hidden text-blue-800 text-xs font-medium me-2 px-2.5 py-1 rounded-lg ">
                {userInfo.userrole}
              </span>
            )}
          </div>
          <ul
            className="py-1"
            role="none"
            onClick={() => props.setDisplayDropdown(false)}
          >
            
              <li
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer content-center"
              role="menuitem"
              onClick={navigateSettings}
              >
                <img
                  src="../src/assets/settings.png"
                  className="inline-block w-4 mr-2"
                />
                Settings
              </li>
            
            <li
              onClick={signOut}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer items-center"
              role="menuitem"
            >
              <img
                src="../src/assets/logout.png"
                className="inline-block w-5 mr-1"
              />
              Sign out
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default UserDropdown;
