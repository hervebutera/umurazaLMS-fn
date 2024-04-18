import { createSlice } from "@reduxjs/toolkit";

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
                    icon: "../src/assets/classes.png",
                },
                {
                    menuname: "My Classes",
                    path: "/my-classes",
                    icon: "../src/assets/my-classes.png",
                }
            ],
            adminSideMenu: [
                {
                  menuname: "Learners",
                  path: "/",
                  icon: "../src/assets/multiple-users.png",
                },
                {
                  menuname: "Classes",
                  path: "/classes",
                  icon: "../src/assets/classes.png",
                },
            ],
            userSettingsSideMenu: [
                {
                  menuname: "My profile",
                  path: "/my-profile",
                  icon: "../src/assets/profile-icon.png",
                },
            ],
            superAdminSettingsSideMenu: [
                {
                  menuname: "Manage Admins",
                  path: "/admins",
                  icon: "../src/assets/multiple-users.png",
                },
                {
                  menuname: "My profile",
                  path: "/my-profile",
                  icon: "../src/assets/profile-icon.png",
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
