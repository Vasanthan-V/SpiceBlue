import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const IconButton = ({
    type, className, name, onClick, icon,
}) => (
    <button type={type} className={className} onClick={onClick}>
        <span className="flex flex-vert-center">{icon}</span>
        {name}
    </button>
);
IconButton.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
};
