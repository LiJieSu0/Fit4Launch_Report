import React, { useContext, useEffect, useRef, useState } from 'react';
import { HeaderContext } from '../Contexts/HeaderContext';

const extractText = (children) => {
    if (typeof children === 'string' || typeof children === 'number') return String(children);
    if (Array.isArray(children)) return children.map(extractText).join('');
    if (children?.props?.children) return extractText(children.props.children);
    return '';
};

const DynamicHeader = ({ level, children, id, className, ...props }) => {
    const { registerHeader, unregisterHeader, numberedHeaders } = useContext(HeaderContext);
    const headerRef = useRef(null);
    const [number, setNumber] = useState('');

    // Generate a stable ID if none provided, ensuring it's available during render
    const headerId = React.useMemo(() => id || `header-${Math.random().toString(36).substr(2, 9)}`, [id]);

    useEffect(() => {
        const headerInfo = {
            level,
            ref: headerRef,
            text: extractText(children),
            id: headerId
        };

        registerHeader(headerInfo);

        return () => {
            unregisterHeader(headerRef);
        };
    }, [level, children, headerId, registerHeader, unregisterHeader]);

    useEffect(() => {
        const match = numberedHeaders.find(h => h.ref === headerRef);
        if (match) {
            setNumber(match.number);
        }
    }, [numberedHeaders]);

    const Tag = `h${level}`;

    return (
        <Tag ref={headerRef} id={headerId} className={className} {...props}>
            {number} {children}
        </Tag>
    );
};

export default DynamicHeader;
