import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import notificationList from "../helpers/notification";
import React from 'react'
export default function PrivateRouteWrapper({anonOnly, children, ...rest }) {
    const isLogedIn = useSelector(state => state.login.status === 'done')
    //TODO: сократить код ниже, нарушает DRY
    if(anonOnly){
        return (
            <Route
            {...rest}
            render={({ location }) =>
                !isLogedIn ? (children) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
        )
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLogedIn ? (children) : notificationList.unauthorized() ? null : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}