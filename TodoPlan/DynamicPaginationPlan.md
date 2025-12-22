# Dynamic Pagination for Report Printing

To automatically distribute components into `page-content` containers based on their height, we can implement a **Dynamic Paginator**.

## Using an Array of Components

You can define all the components you want to print in an array and pass them into the `DynamicPaginator`. This makes your page structure very easy to manage and reorder.

### Example in `CoverageDetails.js`:

```javascript
import DynamicPaginator from '../../Utils/DynamicPaginator';

function CoverageDetails() {
  // ... data processing logic ...

  const printComponents = [
    <h1 key="h1">2. Coverage Test - Seattle</h1>,
    <h2 key="h2">2.1 5G VoNR Coverage Test - N25, N41, N71</h2>,
    
    // NR25 Section
    <h3 key="h3-n25-dl">5G VoNR Coverage Test NR25- DL Throughput < 1Mbps Distance (km)</h3>,
    <CoverageTestTable key="table-n25-dl" tableData={NR25_DL.slice(0, -1)} status={NR25_DL.at(-1)} />,
    <CoverageMap key="map-n25-dl" ... />,

    // Manual Spacer example
    <div key="spacer-1" style={{ height: '20px' }} />,

    // NR41 Section (Forced to new page example)
    <h3 key="h3-n41-dl" forceNewPage={true}>5G VoNR Coverage Test NR41- DL Throughput < 1Mbps Distance (km)</h3>,
    <CoverageTestTable key="table-n41-dl" ... />,
    // ... more components ...
  ];

  return (
    <DynamicPaginator>
      {printComponents}
    </DynamicPaginator>
  );
}
```

---

## Detailed Implementation: `DynamicPaginator.js`

```javascript
import React, { useState, useLayoutEffect, useRef } from 'react';

const PAGE_HEIGHT_LIMIT = 890; // A4 height limit in pixels

const DynamicPaginator = ({ children }) => {
  const [pages, setPages] = useState([]);
  const [isMeasuring, setIsMeasuring] = useState(true);
  const containerRef = useRef(null);

  // Convert children to array if it's not already
  const childrenArray = React.Children.toArray(children);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const elements = Array.from(containerRef.current.children);
      const measuredPages = [];
      let currentPage = [];
      let currentHeight = 0;

      elements.forEach((el, index) => {
        const height = el.offsetHeight;
        // Check for custom forceNewPage prop on the component
        const forceNewPage = childrenArray[index].props?.forceNewPage;
        
        if ((currentHeight + height > PAGE_HEIGHT_LIMIT || forceNewPage) && currentPage.length > 0) {
          measuredPages.push(currentPage);
          currentPage = [];
          currentHeight = 0;
        }

        currentPage.push(childrenArray[index]);
        currentHeight += height;
      });

      if (currentPage.length > 0) {
        measuredPages.push(currentPage);
      }

      setPages(measuredPages);
      setIsMeasuring(false);
    }
  }, [children]);

  if (isMeasuring) {
    // Hidden measuring container
    return (
      <div ref={containerRef} style={{ visibility: 'hidden', position: 'absolute', top: 0, left: '-9999px', width: '100vw' }}>
        {childrenArray}
      </div>
    );
  }

  return (
    <>
      {pages.map((pageContent, idx) => (
        <div key={idx} className="page-content">
          {pageContent}
        </div>
      ))}
    </>
  );
};

export default DynamicPaginator;
```

---

## Manual Control & Fine-tuning Summary

| Action | Method |
| :--- | :--- |
| **Add New Component** | Just push a new element into the `printComponents` array. |
| **Adjust Spacing** | Add a `<div key="..." style={{ height: '20px' }} />` to the array. |
| **Force New Page** | Add `forceNewPage={true}` prop to the component in the array. |
| **Reorder** | Change the order of elements in the `printComponents` array. |

> [!IMPORTANT]
> - Ensure every element in the array has a unique `key`.
> - If a single component is taller than 890px, it will overflow the page. In that case, you might need to split that component into smaller parts.
