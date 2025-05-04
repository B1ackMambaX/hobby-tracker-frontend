import { skipToken } from '@reduxjs/toolkit/query/react';
import { Navigate, Outlet } from 'react-router';
import { useRefreshTokenQuery } from '@/api/authApi.ts';
import Spinner from '@/components/spinner/Spinner.tsx';

const AuthRoute = () => {
    const token = localStorage.getItem('accessToken');
    const { isLoading, isError } = useRefreshTokenQuery(token ? undefined : skipToken);

    if (token) {
        if (isLoading) {
            return <Spinner />;
        }
        if (!isLoading && !isError) {
            return <Navigate to='/' />;
        }
    }

    return <Outlet />;
};

export default AuthRoute;