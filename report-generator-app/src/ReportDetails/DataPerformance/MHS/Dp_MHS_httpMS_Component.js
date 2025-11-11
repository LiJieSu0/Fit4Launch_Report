import React from "react";
import DpMHSHttpMSTable from "./Table/DpMHSHttpMSTable";

function Dp_MHS_httpMS_Component() {
  // Placeholder for data fetching or state management
  const data = {
    Good: { DUT: { Mean: 0, "Standard Deviation": 0, Maximum: 0, Minimum: 0 }, REF: { Mean: 0, "Standard Deviation": 0, Maximum: 0, Minimum: 0 } },
    Moderate: { DUT: { Mean: 0, "Standard Deviation": 0, Maximum: 0, Minimum: 0 }, REF: { Mean: 0, "Standard Deviation": 0, Maximum: 0, Minimum: 0 } },
  };

  return (
    <div className='page-content'>
      <h2>MHS-httpMS Component</h2>
      <DpMHSHttpMSTable data={data} tableName="MHS Multi Stream HTTP Throughput" />
    </div>
  );
}

export default Dp_MHS_httpMS_Component;