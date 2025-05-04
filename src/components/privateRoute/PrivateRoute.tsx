import { Navigate, Outlet } from 'react-router';
import { useRefreshTokenQuery } from '@/api/authApi.ts';
import Spinner from "@/components/spinner/Spinner.tsx";


const PrivateRoute = () => {
    const {isLoading, isError } = useRefreshTokenQuery();

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        localStorage.removeItem('accessToken');
        return <Navigate to='/login' />;
    }

    return <Outlet />;
};

export default PrivateRoute;