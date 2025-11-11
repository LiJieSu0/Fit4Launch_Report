import React from "react";
import DpMHSHttpSSTable from "./Table/DpMHSHttpSSTable";

function Dp_MHS_httpSS_Component() {
  // Placeholder for data fetching or state management
  const data = {
    Good: { DUT: { Mean: 0, "Standard Deviation": 0, Maximum: 0, Minimum: 0 }, REF: { Mean: 0, "Standard Deviation": 0, Maximum: 0, Minimum: 0 } },
    Moderate: { DUT: { Mean: 0, "Standard Deviation": 0, Maximum: 0, Minimum: 0 }, REF: { Mean: 0, "Standard Deviation": 0, Maximum: 0, Minimum: 0 } },
  };

  return (
    <div className='page-content'>
      <h2>MHS-httpSS Component</h2>
      <DpMHSHttpSSTable data={data} tableName="MHS Single Stream HTTP Throughput" />
    </div>
  );
}

export default Dp_MHS_httpSS_Component;