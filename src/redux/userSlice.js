import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userInfo",
    initialState: {
        userInfo: {},
    },
    reducers: {
        setUserState: (state, action) => {
            state.userInfo = action.payload
        },
        signout: (state, action) => {
            state.userInfo = {}
        },
    }    
})

export const {setUserState, signout} = userSlice.actions;

