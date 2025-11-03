import React, { useState, useEffect, useRef } from 'react';

const ContentsIndexPage = () => {
  const [headings, setHeadings] = useState([]);
  const contentsRef = useRef(null);

  useEffect(() => {
    if (contentsRef.current) {
      const allH2s = Array.from(document.querySelectorAll('h2'));
      const contentsIndexPageElement = contentsRef.current;

      // Filter h2s that appear after the ContentsIndexPage element
      const h2sOutsideContentsPage = allH2s.filter(h2 => !contentsIndexPageElement.contains(h2));

      // Filter h2s that appear after the ContentsIndexPage element and are not within it
      const h2sAfterContents = h2sOutsideContentsPage.filter(h2 => {
        return contentsIndexPageElement.compareDocumentPosition(h2) & Node.DOCUMENT_POSITION_FOLLOWING;
      });

      const extractedHeadings = h2sAfterContents.map((h2, index) => {
        // Ensure each h2 has a unique ID for linking
        if (!h2.id) {
          h2.id = `section-${h2.textContent.replace(/\s+/g, '-').toLowerCase()}-${index}`;
        }
        return {
          id: h2.id,
          text: h2.textContent,
        };
      });
      setHeadings(extractedHeadings);
    }
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="contents-index-page" ref={contentsRef}>
      <div className="page-content">
        <h2>Table of Contents</h2>
        <ul>
          {headings.length > 0 ? (
            headings.map((heading) => (
              <li key={heading.id}>
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            ))
          ) : (
            <li>No sections found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ContentsIndexPage;