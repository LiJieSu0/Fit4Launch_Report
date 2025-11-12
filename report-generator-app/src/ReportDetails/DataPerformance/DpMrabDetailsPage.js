import React, { useState, useEffect } from 'react';
import MrabData from '../../DataFiles/SA/DpMrabResults/Mrab.json';
import '../../StyleScript/Restricted_Report_Style.css';

const DpMrabDetailsPage = () => {
  const [mrabData, setMrabData] = useState(null);

  useEffect(() => {
    setMrabData(MrabData);
  }, []);

  if (!mrabData) {
    return <div>Loading MRAB data...</div>;
  }
  return (
    //TODO add overall data
    <div className="page-content">
      <h2>VoNR MRAB Stationary test - 5G NR</h2>

      <table className="general-table-style">
        <thead>
          <tr>
            <th rowSpan="2">Category</th>
            <th rowSpan="2">Statistic</th>
            <th >DUT Value (Mbps)</th>
            <th >REF Value (Mbps)</th>
          </tr>

        </thead>
        <tbody>
          <tr>
            <td rowSpan="4">Pre Call</td>
            <td>Mean</td>
            <td>{mrabData["DUT MRAB"]["MRAB Statistics"]["Pre Call"]["Mean"].toFixed(2)}</td>
            <td>{mrabData["REF MRAB"]["MRAB Statistics"]["Pre Call"]["Mean"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Maximum</td>
            <td>{mrabData["DUT MRAB"]["MRAB Statistics"]["Pre Call"]["Maximum"].toFixed(2)}</td>
            <td>{mrabData["REF MRAB"]["MRAB Statistics"]["Pre Call"]["Maximum"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Minimum</td>
            <td>{mrabData["DUT MRAB"]["MRAB Statistics"]["Pre Call"]["Minimum"].toFixed(2)}</td>
            <td>{mrabData["REF MRAB"]["MRAB Statistics"]["Pre Call"]["Minimum"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Standard Deviation</td>
            <td>{mrabData["DUT MRAB"]["MRAB Statistics"]["Pre Call"]["Standard Deviation"].toFixed(2)}</td>
            <td>{mrabData["REF MRAB"]["MRAB Statistics"]["Pre Call"]["Standard Deviation"].toFixed(2)}</td>
          </tr>
          <tr>
            <td rowSpan="4">In Call</td>
            <td>Mean</td>
            <td>{mrabData["DUT MRAB"]["MRAB Statistics"]["In Call"]["Mean"].toFixed(2)}</td>
            <td>{mrabData["REF MRAB"]["MRAB Statistics"]["In Call"]["Mean"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Maximum</td>
            <td>{mrabData["DUT MRAB"]["MRAB Statistics"]["In Call"]["Maximum"].toFixed(2)}</td>
            <td>{mrabData["REF MRAB"]["MRAB Statistics"]["In Call"]["Maximum"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Minimum</td>
            <td>{mrabData["DUT MRAB"]["MRAB Statistics"]["In Call"]["Minimum"].toFixed(2)}</td>
            <td>{mrabData["REF MRAB"]["MRAB Statistics"]["In Call"]["Minimum"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Standard Deviation</td>
            <td>{mrabData["DUT MRAB"]["MRAB Statistics"]["In Call"]["Standard Deviation"].toFixed(2)}</td>
            <td>{mrabData["REF MRAB"]["MRAB Statistics"]["In Call"]["Standard Deviation"].toFixed(2)}</td>
          </tr>
          <tr>
            <td rowSpan="4">Post Call</td>
            <td>Mean</td>
            <td>{mrabData["DUT MRAB"]["MRAB Statistics"]["Post Call"]["Mean"].toFixed(2)}</td>
            <td>{mrabData["REF MRAB"]["MRAB Statistics"]["Post Call"]["Mean"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Maximum</td>
            <td>{mrabData["DUT MRAB"]["MRAB Statistics"]["Post Call"]["Maximum"].toFixed(2)}</td>
            <td>{mrabData["REF MRAB"]["MRAB Statistics"]["Post Call"]["Maximum"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Minimum</td>
            <td>{mrabData["DUT MRAB"]["MRAB Statistics"]["Post Call"]["Minimum"].toFixed(2)}</td>
            <td>{mrabData["REF MRAB"]["MRAB Statistics"]["Post Call"]["Minimum"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Standard Deviation</td>
            <td>{mrabData["DUT MRAB"]["MRAB Statistics"]["Post Call"]["Standard Deviation"].toFixed(2)}</td>
            <td>{mrabData["REF MRAB"]["MRAB Statistics"]["Post Call"]["Standard Deviation"].toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Mrab histogram, pre call, in call, post call, overall */}
    </div>
  );
};

export default DpMrabDetailsPage;