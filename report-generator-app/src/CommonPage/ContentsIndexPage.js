import React, { useContext } from 'react';
import { HeaderContext } from '../Contexts/HeaderContext';

const ContentsIndexPage = () => {
  const { numberedHeaders } = useContext(HeaderContext);

  const ITEMS_PER_PAGE = 24; // Adjusted to 25 based on common page height

  const handleLinkClick = (e, heading) => {
    e.preventDefault();
    if (heading.ref && heading.ref.current) {
      const element = heading.ref.current;
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const top = rect.top + scrollTop - 20; // 20px buffer

      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });

      // Update URL hash
      window.history.pushState(null, null, `#${heading.id}`);
    }
  };

  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const headerChunks = chunkArray(numberedHeaders, ITEMS_PER_PAGE);

  if (headerChunks.length === 0) {
    return (
      <div className="contents-index-page">
        <div className="page-content">
          <h2 id="table-of-contents">Table of Contents</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>No sections found.</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="contents-index-page">
      {headerChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="page-content">
          {chunkIndex === 0 && <h2 id="table-of-contents">Table of Contents</h2>}
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {chunk.map((heading, index) => (
              <li key={index} style={{ paddingLeft: `${(heading.level - 1) * 20}px`, marginTop: 5, marginBottom: 5, fontSize: 18 }}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleLinkClick(e, heading)}
                >
                  {heading.number} {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ContentsIndexPage;
