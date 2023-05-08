import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Defines a private route to redirect unauthenticated users to login page
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)