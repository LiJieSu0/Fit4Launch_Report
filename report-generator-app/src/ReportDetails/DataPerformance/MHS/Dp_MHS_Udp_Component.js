import React from "react";
import DpMHSUdpTable from "./Table/DpMHSUdpTable";

function Dp_MHS_Udp_Component() {
  const ulIdealThroughput = [10000, 20000];
  const dlIdealThroughput = [200000, 400000];
  const ulData = [
    // Placeholder data - replace with actual data fetching logic
    { Category: "Average", IdealThroughput: 10000, DeviceName: "DUT", Overall: "100", Site1: "90", Site2: "110" },
    { Category: "Average", IdealThroughput: 10000, DeviceName: "REF", Overall: "95", Site1: "85", Site2: "105" },
    { Category: "Average", IdealThroughput: 20000, DeviceName: "DUT", Overall: "200", Site1: "190", Site2: "210" },
    { Category: "Average", IdealThroughput: 20000, DeviceName: "REF", Overall: "195", Site1: "185", Site2: "205" },
    { Category: "Standard Deviation", IdealThroughput: 10000, DeviceName: "DUT", Overall: "5", Site1: "4", Site2: "6" },
    { Category: "Standard Deviation", IdealThroughput: 10000, DeviceName: "REF", Overall: "4", Site1: "3", Site2: "5" },
    { Category: "Standard Deviation", IdealThroughput: 20000, DeviceName: "DUT", Overall: "10", Site1: "9", Site2: "11" },
    { Category: "Standard Deviation", IdealThroughput: 20000, DeviceName: "REF", Overall: "9", Site1: "8", Site2: "10" },
    { Category: "Maximum", IdealThroughput: 10000, DeviceName: "DUT", Overall: "120", Site1: "110", Site2: "130" },
    { Category: "Maximum", IdealThroughput: 10000, DeviceName: "REF", Overall: "115", Site1: "105", Site2: "125" },
    { Category: "Maximum", IdealThroughput: 20000, DeviceName: "DUT", Overall: "240", Site1: "230", Site2: "250" },
    { Category: "Maximum", IdealThroughput: 20000, DeviceName: "REF", Overall: "235", Site1: "225", Site2: "245" },
    { Category: "Minimum", IdealThroughput: 10000, DeviceName: "DUT", Overall: "80", Site1: "70", Site2: "90" },
    { Category: "Minimum", IdealThroughput: 10000, DeviceName: "REF", Overall: "75", Site1: "65", Site2: "85" },
    { Category: "Minimum", IdealThroughput: 20000, DeviceName: "DUT", Overall: "160", Site1: "150", Site2: "170" },
    { Category: "Minimum", IdealThroughput: 20000, DeviceName: "REF", Overall: "155", Site1: "145", Site2: "165" },
  ];

  const dlData = [
    // Placeholder data - replace with actual data fetching logic
    { Category: "Average", IdealThroughput: 200000, DeviceName: "DUT", Overall: "100", Site1: "90", Site2: "110" },
    { Category: "Average", IdealThroughput: 200000, DeviceName: "REF", Overall: "95", Site1: "85", Site2: "105" },
    { Category: "Average", IdealThroughput: 400000, DeviceName: "DUT", Overall: "200", Site1: "190", Site2: "210" },
    { Category: "Average", IdealThroughput: 400000, DeviceName: "REF", Overall: "195", Site1: "185", Site2: "205" },
    { Category: "Standard Deviation", IdealThroughput: 200000, DeviceName: "DUT", Overall: "5", Site1: "4", Site2: "6" },
    { Category: "Standard Deviation", IdealThroughput: 200000, DeviceName: "REF", Overall: "4", Site1: "3", Site2: "5" },
    { Category: "Standard Deviation", IdealThroughput: 400000, DeviceName: "DUT", Overall: "10", Site1: "9", Site2: "11" },
    { Category: "Standard Deviation", IdealThroughput: 400000, DeviceName: "REF", Overall: "9", Site1: "8", Site2: "10" },
    { Category: "Maximum", IdealThroughput: 200000, DeviceName: "DUT", Overall: "120", Site1: "110", Site2: "130" },
    { Category: "Maximum", IdealThroughput: 200000, DeviceName: "REF", Overall: "115", Site1: "105", Site2: "125" },
    { Category: "Maximum", IdealThroughput: 400000, DeviceName: "DUT", Overall: "240", Site1: "230", Site2: "250" },
    { Category: "Maximum", IdealThroughput: 400000, DeviceName: "REF", Overall: "235", Site1: "225", Site2: "245" },
    { Category: "Minimum", IdealThroughput: 200000, DeviceName: "DUT", Overall: "80", Site1: "70", Site2: "90" },
    { Category: "Minimum", IdealThroughput: 200000, DeviceName: "REF", Overall: "75", Site1: "65", Site2: "85" },
    { Category: "Minimum", IdealThroughput: 400000, DeviceName: "DUT", Overall: "160", Site1: "150", Site2: "170" },
    { Category: "Minimum", IdealThroughput: 400000, DeviceName: "REF", Overall: "155", Site1: "145", Site2: "165" },
  ];

  return (
    <div className='page-content'>
      <h2>MHS-UDP Component</h2>
      <DpMHSUdpTable data={ulData} IdealThroughput={ulIdealThroughput} />
      <DpMHSUdpTable data={dlData} IdealThroughput={dlIdealThroughput} />

    </div>
  );
}

export default Dp_MHS_Udp_Component;