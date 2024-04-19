import { createSlice } from "@reduxjs/toolkit";
import adminsIcon from "../assets/multiple-users.png"
import allClassesIcon from "../assets/classes.png"
import myClassesIcon from "../assets/my-classes.png"
import multipleUsersIcon from "../assets/multiple-users.png"
import myProfileIcon from "../assets/profile-icon.png"

export const navigationSlice = createSlice({
    name: "navigation",
    initialState: {
        navigation: {
            currentMenu: "default",
            currentPath: "",
            userSideMenu: [
                {
                    menuname: "All Classes",
                    path: "/",
                    icon: allClassesIcon,
                },
                {
                    menuname: "My Classes",
                    path: "/my-classes",
                    icon: myClassesIcon,
                }
            ],
            adminSideMenu: [
                {
                  menuname: "Learners",
                  path: "/",
                  icon: multipleUsersIcon,
                },
                {
                  menuname: "Classes",
                  path: "/classes",
                  icon: allClassesIcon,
                },
            ],
            userSettingsSideMenu: [
                {
                  menuname: "My profile",
                  path: "/my-profile",
                  icon: myProfileIcon,
                },
            ],
            superAdminSettingsSideMenu: [
                {
                  menuname: "Manage Admins",
                  path: "/admins",
                  icon: adminsIcon,
                },
                {
                  menuname: "My profile",
                  path: "/my-profile",
                  icon: myProfileIcon,
                },
            ]
        },
    },
    reducers: {
        setCurrentMenu: (state, action) => {
            state.navigation.currentMenu = action.payload
        },
    }    
})

export const { setCurrentMenu } = navigationSlice.actions;
