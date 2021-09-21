import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const Input = ({
    type, className, name, placeholder,
}) => (
    <input type={type} className={className} placeholder={placeholder}>
        {name}
    </input>
);
Input.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
};
