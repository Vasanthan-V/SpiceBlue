import React from 'react';
import { Redirect } from 'react-router-dom';

// eslint-disable-next-line func-names
export default function(Children) {
    return (props) => {
        const auth = true;
        // if (localStorage.logoutToken !== undefined) {
        //     auth = true;
        // }
        if (!auth) {
            return <Redirect to="/" />;
        }
        return <Children {...props} />;
    };
}
