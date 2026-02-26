import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface ProtectedRouteProps {
    component: React.ComponentType;
    isAuthenticated: boolean;
    path: string;
    exact?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                return isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                );
            }}
        />
    );
};

export default ProtectedRoute;