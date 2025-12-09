import React, { useState, useEffect, useRef } from 'react';

const ContentsIndexPage = () => {
  const [headings, setHeadings] = useState([]);
  const contentsRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (contentsRef.current) {
        const allHeadings = Array.from(document.querySelectorAll('h1, h2'));
        const contentsIndexPageElement = contentsRef.current;

        // Filter out headings that are children of ContentsIndexPage, DeviceInfoPage, CoverPage, or ReportHeader components
        const headingsOutsideContentsPage = allHeadings.filter(heading =>
          !contentsIndexPageElement.contains(heading) &&
          !heading.closest('.device-info-page') &&
          !heading.closest('.cover-page-component') &&
          !heading.closest('.report-header-component')
        );

        const extractedHeadings = headingsOutsideContentsPage.map((heading, index) => {
          // Ensure each heading has a unique ID for linking
          if (!heading.id) {
            heading.id = `section-${heading.textContent.replace(/\s+/g, '-').toLowerCase()}-${index}`;
          }

          // Calculate indentation level based on numerical prefix
          const match = heading.textContent.match(/^(\d+(\.\d+)*)\s/);
          let level = 0;
          if (match && match[1]) {
            level = match[1].split('.').length - 1;
          }

          return {
            id: heading.id,
            text: heading.textContent,
            level: level,
          };
        });
        setHeadings(extractedHeadings);
      }
    }, 100); // Delay by 100ms

    return () => clearTimeout(timer); // Cleanup the timer
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="contents-index-page" ref={contentsRef}>
      <div className="page-content">
        <h2 id="table-of-contents">Table of Contents</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {headings.length > 0 ? (
            headings.map((heading) => (
              <li key={heading.id} style={{ paddingLeft: `${heading.level * 20}px`, marginTop:5, marginBottom:5, fontSize:20}}>
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