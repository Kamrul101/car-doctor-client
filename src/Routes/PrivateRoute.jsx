import React, { Children, useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    if(loading){
        <progress className="progress progress-error w-56"></progress>
    }
    if(user?.email){
        return children;
    }
    return <Navigate to="/login" replace></Navigate>
};

export default PrivateRoute;