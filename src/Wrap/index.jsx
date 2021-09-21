import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { GetContext } from '../_main/context';

function Wrap({ children, location }) {
    const { state } = GetContext();
    return (
        <div className= {"container" }>
          <div className="section">{children}</div>          
        </div>
    );
}
Wrap.propTypes = {
    children: PropTypes.object,
    location: PropTypes.object,
};

export default withRouter(Wrap);
