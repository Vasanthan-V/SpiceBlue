import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const Select = ({
    name, fieldtype, className,
}) => (
    <select className={className}>
        <option value="" selected hidden>
            {name}
        </option>
        {fieldtype &&
            fieldtype.map(
            (item, i) => (
                <option className= "options"
                    value={item.tid}
                >
                    {item.name}
                </option>
            )
        )}
    </select>
);
Select.propTypes = {
    name: PropTypes.string,
};
