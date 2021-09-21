import './Loader.css';
import React from 'react';
import reducer from './reducer';

function Loader() {
    return (
        <div className='loading'>
            <div className='lds-hourglass' />
        </div>
    );
}

export default Loader;
export { reducer };
