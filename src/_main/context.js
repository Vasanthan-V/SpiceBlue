import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import rootReducer from './rootReducer';
import initialState from './initialState';

const Context = createContext();

export const GetContext = () => useContext(Context);

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    return (
        <Context.Provider
            value={{
                dispatch,
                state,
            }}
        >
            {children}
        </Context.Provider>
    );
};

Provider.propTypes = {
    children: PropTypes.object,
};
