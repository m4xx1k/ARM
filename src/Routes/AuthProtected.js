import React, {useEffect, useState} from "react";
import {Navigate, Route} from "react-router-dom";
import {setAuthorization} from "../helpers/api_helper";
import {useDispatch} from "react-redux";

import {useProfile} from "../Components/Hooks/UserHooks";

import {logoutUser} from "../slices/auth/login/thunk";
import {getLocalAccessToken, getLocalRefreshToken} from "../api/tokens";

const AuthProtected = (props) => {
    console.log(1)
    const dispatch = useDispatch();
    const access = getLocalAccessToken()
    const refresh = getLocalRefreshToken()
    if (!access || !refresh) {
        dispatch(logoutUser())
        return <Navigate to={{pathname: "/login", state: {from: props.location}}}/>
    } else return <>{props.children}</>;
};

const AccessRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                return (<> <Component {...props} /> </>);
            }}
        />
    );
};

export {AuthProtected, AccessRoute};
