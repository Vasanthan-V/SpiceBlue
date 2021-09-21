import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './_main/fetchIntercept';
import {
    BASE_ROUTE,
    LIST_ROUTE,
} from './_main/routeConstants';

import { isAuth } from './Auth';
import Wrap from './Wrap';
import Login from './Login';
import ListPage from './ListPage';
import './_main/styles/index.css';

function RootApp() {
    return (
        <Wrap>
            <Switch>
                <Route exact strict path={BASE_ROUTE} component={Login} />
                <Route
                    exact
                    strict
                    path={LIST_ROUTE}
                    component={isAuth(ListPage)}
                />
            </Switch>
        </Wrap>
    );
}

RootApp.propTypes = {
    // settings: PropTypes.object,
};

export default RootApp;
