import React, { useContext } from 'react';
import { HeaderContext } from '../Contexts/HeaderContext';

const ContentsIndexPage = () => {
  const { numberedHeaders } = useContext(HeaderContext);

  return (
    <div className="contents-index-page">
      <div className="page-content">
        <h2 id="table-of-contents">Table of Contents</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {numberedHeaders.length > 0 ? (
            numberedHeaders.map((heading, index) => (
              <li key={index} style={{ paddingLeft: `${(heading.level - 1) * 20}px`, marginTop: 5, marginBottom: 5, fontSize: 20 }}>
                <a href={`#${heading.id}`}>{heading.number} {heading.text}</a>
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
