/* eslint-disable func-names */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { BASE_ROUTE } from '../_main/routeConstants';

export default function(Children) {
    return (props) => {
        let auth = false;
        if (localStorage.logoutToken !== undefined) {
            auth = true;
        }
        if (auth) {
            return <Children {...props} />;
        }
        return <Redirect to={BASE_ROUTE} />;
    };
}
