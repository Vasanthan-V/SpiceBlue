import React from 'react';
import { FaRegCopyright } from 'react-icons/fa';
import './style.css';

export const Footer = () => (
    <footer>
        <div className="flex space-between main-container">
            <div>Privacy Legal Notice</div>
            <div className="right-content">
                <span className="icon">
                    <FaRegCopyright />
                </span>
                2021 WHO
            </div>
        </div>
    </footer>
);
