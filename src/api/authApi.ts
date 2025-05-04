import {Dispatch} from '@reduxjs/toolkit';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {logout, setCredentials} from '../store/slices/authSlice.ts';
import {LoginUserRequest, RegisterUserRequest} from '../types/authApi/requests.ts';
import {AuthResponse, LogoutResponse} from '../types/authApi/responses.ts';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const updateUserInfo = async (queryFulfilled: Promise<{ data: AuthResponse }>, dispatch: Dispatch) => {
    try {
        const {data} = await queryFulfilled;
        dispatch(setCredentials({user: data.user}));
        localStorage.setItem('accessToken', data.accessToken);
    } catch (error) {
        console.log(error);
    }
};

const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['Auth', 'Users'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/api/auth`,
        credentials: 'include',
    }),
    endpoints: builder => ({
        registerUser: builder.mutation<AuthResponse, RegisterUserRequest>({
            query: body => ({
                url: '/register',
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                await updateUserInfo(queryFulfilled, dispatch);
            },
            invalidatesTags: ['Auth', 'Users'],
        }),
        loginUser: builder.mutation<AuthResponse, LoginUserRequest>({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                await updateUserInfo(queryFulfilled, dispatch);
            },
            invalidatesTags: ['Auth', 'Users'],
        }),
        logoutUser: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth', 'Users'],
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                await queryFulfilled;
                dispatch(logout());
            },
        }),
        refreshToken: builder.query<AuthResponse, void>({
            query: () => '/refresh',
            providesTags: ['Auth'],
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                await updateUserInfo(queryFulfilled, dispatch);
            },
        }),
    }),
});

export const {useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useRefreshTokenQuery} =
    authApi;

export default authApi;