import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const Button = ({
    type, className, name, onClick,
}) => (
    <button type={type} className={className} onClick={onClick}>
        {name}
    </button>
);
Button.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
};
