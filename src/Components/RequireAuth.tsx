import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../Redux/store';

const RequireAuth = ({ children }: { children: JSX.Element }) => {

    const location = useLocation();
    const isAuth = useAppSelector(store => store.authReducer.isAuth);

    return (
        isAuth ? children : <Navigate to={'/login'} replace state={{ data: location.pathname }} />
    )
}

export default RequireAuth