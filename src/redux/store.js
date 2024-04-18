import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice"
import { navigationSlice } from "./pathNavigationSlice";
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from "redux-persist";
// import storage from "redux-persist/lib/storage";

    // const persistUserConfig = {
    //   key: "root",
    //   version: 1,
    //   storage,
    // }

// storage.removeItem('persist:root')
    
// const persistedUserReducer = persistReducer(persistUserConfig, userSlice.reducer);


const store = configureStore({
    reducer: {
        userInfo: userSlice.reducer,
        navigation: navigationSlice.reducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: {
    //             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //         },
    //     }),
})

// export let persistor = persistStore(store);
export default store;
