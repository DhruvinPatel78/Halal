import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
    const { Component,userType, ...rest} = props;
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type")
    return (
        <Route
            {...rest}
            render={rest => {
                if (token && type) {
                    return <Component {...rest} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login"
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default PrivateRoute;
