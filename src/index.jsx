import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './_main/styles/index.css';

import App from './App';
import { Provider } from './_main/context';

ReactDOM.render(
    <Provider>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('app'),
);

module.hot.accept();
