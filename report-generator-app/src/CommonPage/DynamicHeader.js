import React, { useContext, useEffect, useRef, useState } from 'react';
import { HeaderContext } from '../Contexts/HeaderContext';

const DynamicHeader = ({ level, children, id, className, ...props }) => {
    const { registerHeader, unregisterHeader, numberedHeaders } = useContext(HeaderContext);
    const headerRef = useRef(null);
    const [number, setNumber] = useState('');

    useEffect(() => {
        const headerInfo = {
            level,
            ref: headerRef,
            text: typeof children === 'string' ? children : '',
            id: id || `header-${Math.random().toString(36).substr(2, 9)}`
        };

        registerHeader(headerInfo);

        return () => {
            unregisterHeader(headerRef);
        };
    }, [level, children, id, registerHeader, unregisterHeader]);

    useEffect(() => {
        const match = numberedHeaders.find(h => h.ref === headerRef);
        if (match) {
            setNumber(match.number);
        }
    }, [numberedHeaders]);

    const Tag = `h${level}`;

    return (
        <Tag ref={headerRef} id={id} className={className} {...props}>
            {number} {children}
        </Tag>
    );
};

export default DynamicHeader;
