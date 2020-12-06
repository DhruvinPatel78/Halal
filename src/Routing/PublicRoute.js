import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = (props) => {
    const { Component, restricted, ...rest} = props;
    const token = localStorage.getItem("token")
    const type = localStorage.getItem("type")

    return (
        <Route {...rest} render={props => (
            token && restricted ?
                <Redirect to="/" />
                : <Component {...props} />
        )} />

    );
};

export default PublicRoute
