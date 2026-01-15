import React, { createContext, useState, useCallback, useMemo } from 'react';

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
    const [headers, setHeaders] = useState([]);

    const registerHeader = useCallback((header) => {
        setHeaders((prev) => {
            // Avoid duplicate registration by checking the ref
            if (prev.find((h) => h.ref === header.ref)) {
                return prev;
            }
            return [...prev, header];
        });
    }, []);

    const unregisterHeader = useCallback((ref) => {
        setHeaders((prev) => prev.filter((h) => h.ref !== ref));
    }, []);

    // Sort and number headers based on DOM position
    const numberedHeaders = useMemo(() => {
        // Filter out headers that are not in the DOM or are not visible
        const visibleHeaders = headers.filter(h => h.ref.current && h.ref.current.offsetParent !== null);

        // Sort by position in the DOM
        const sorted = [...visibleHeaders].sort((a, b) => {
            if (!a.ref.current || !b.ref.current) return 0;
            const position = a.ref.current.compareDocumentPosition(b.ref.current);
            if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
            if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
            return 0;
        });

        const counts = { h1: 0, h2: 0, h3: 0 };
        return sorted.map((header) => {
            if (header.hideInTOC) {
                return { ...header, number: '' };
            }

            let number = '';
            if (header.level === 1) {
                counts.h1++;
                counts.h2 = 0;
                counts.h3 = 0;
                number = `${counts.h1}.`;
            } else if (header.level === 2) {
                counts.h2++;
                counts.h3 = 0;
                number = `${counts.h1}.${counts.h2}`;
            } else if (header.level === 3) {
                counts.h3++;
                number = `${counts.h1}.${counts.h2}.${counts.h3}`;
            }
            return { ...header, number };
        });
    }, [headers]);

    return (
        <HeaderContext.Provider value={{ registerHeader, unregisterHeader, numberedHeaders }}>
            {children}
        </HeaderContext.Provider>
    );
};
