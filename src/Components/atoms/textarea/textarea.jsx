import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const Textarea = ({ rows, placeholder, className }) => <textarea rows={rows} className={className} placeholder={placeholder} />;
Textarea.propTypes = {
    className: PropTypes.string,
};
