import {pageRoutes} from "../../http/routes.ts";
import {Navigate} from "react-router-dom";
import {FC, ReactNode} from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    isAuthenticated: boolean;
}

const ProtectedRoute:FC<ProtectedRouteProps> = ({children, isAuthenticated}) => {
    if(!isAuthenticated) {
        return <Navigate to={pageRoutes.LOGIN} />;
    }
    
    return children;
};

export default ProtectedRoute;
