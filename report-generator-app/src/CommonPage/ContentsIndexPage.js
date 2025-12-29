import React, { useContext } from 'react';
import { HeaderContext } from '../Contexts/HeaderContext';

const ContentsIndexPage = () => {
  const { numberedHeaders } = useContext(HeaderContext);

  const handleLinkClick = (e, heading) => {
    e.preventDefault();
    if (heading.ref && heading.ref.current) {
      // Small offset for fixed headers or margins if needed
      // heading.ref.current.scrollIntoView({ behavior: 'smooth' });

      // Using scrollTo for more control if scroll-margin-top is used in CSS
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

  return (
    <div className="contents-index-page">
      <div className="page-content">
        <h2 id="table-of-contents">Table of Contents</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {numberedHeaders.length > 0 ? (
            numberedHeaders.map((heading, index) => (
              <li key={index} style={{ paddingLeft: `${(heading.level - 1) * 20}px`, marginTop: 5, marginBottom: 5, fontSize: 20 }}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleLinkClick(e, heading)}
                >
                  {heading.number} {heading.text}
                </a>
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
