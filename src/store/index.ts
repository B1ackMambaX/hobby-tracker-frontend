import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.ts';
import authApi from "@/api/authApi.ts";
import tripsApi from "@/api/tripsApi.ts";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [tripsApi.reducerPath]: tripsApi.reducer,
        authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(authApi.middleware, tripsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;