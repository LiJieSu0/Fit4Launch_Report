import React from "react";
import DpMHSPingTable from "./Table/DpMHSPingTable";

function Dp_MHS_Ping_Component() {
  // Placeholder for data fetching or state management
  const data = {
    average: { DUT: { Overall: 0, Good: 0, Moderate: 0 }, REF: { Overall: 0, Good: 0, Moderate: 0 } },
    std_dev: { DUT: { Overall: 0, Good: 0, Moderate: 0 }, REF: { Overall: 0, Good: 0, Moderate: 0 } },
    max: { DUT: { Overall: 0, Good: 0, Moderate: 0 }, REF: { Overall: 0, Good: 0, Moderate: 0 } },
    min: { DUT: { Overall: 0, Good: 0, Moderate: 0 }, REF: { Overall: 0, Good: 0, Moderate: 0 } },
  };

  return (
    <div className='page-content'>
      <h2>MHS-Ping Component</h2>
      <DpMHSPingTable data={data} />
    </div>
  );
}

export default Dp_MHS_Ping_Component;