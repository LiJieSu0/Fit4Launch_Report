import React from 'react';

const PageBreak = ({ children, className, ...props }) => {
    return (
        <div className={`page-content ${className || ''}`} {...props}>
            {children}
        </div>
    );
};

export default PageBreak;
