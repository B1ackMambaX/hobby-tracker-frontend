import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from '../store/slices/authSlice.ts';
import { AuthResponse } from '../types/authApi/responses.ts';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api`,
    prepareHeaders: headers => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);
    const url = typeof args === 'string' ? args : args.url;
    // Если ошибка 401 и текущий запрос не к /refresh, пробуем обновить токен
    if (url !== '/refresh' && result.error && result.error.status === 401) {
        const refreshResult = (await baseQuery('/refresh/', api, extraOptions)) as { data?: AuthResponse };

        if (refreshResult.data) {
            api.dispatch(
                setCredentials({
                    user: refreshResult.data.user,
                })
            );
            localStorage.setItem('accessToken', refreshResult.data.accessToken);
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }
    return result;
};

export default baseQueryWithAuth;