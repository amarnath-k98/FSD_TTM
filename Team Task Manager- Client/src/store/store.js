import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { appAPi } from "../features/applicationApi";

const store = configureStore({
    reducer: {// Add your reducers here
        [appAPi.reducerPath] : appAPi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(appAPi.middleware),
});

export default store;