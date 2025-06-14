import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.ts';
import authApi from "@/api/authApi.ts";
import tripsApi from "@/api/tripsApi.ts";
import tasksApi from "@/api/taskApi.ts";
import spendsApi from "@/api/spendsApi.ts";
import tripTemplatesApi from "@/api/tripTemplateApi.ts";
import tripTemplateApi from "@/api/tripTemplateApi.ts";
import remaindersApi from "@/api/remaindersApi.ts";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [tripsApi.reducerPath]: tripsApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
        [spendsApi.reducerPath]: spendsApi.reducer,
        [remaindersApi.reducerPath]: remaindersApi.reducer,
        [tripTemplatesApi.reducerPath]: tripTemplatesApi.reducer,
        authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(authApi.middleware, tripsApi.middleware, tasksApi.middleware, spendsApi.middleware, tripTemplateApi.middleware, remaindersApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;