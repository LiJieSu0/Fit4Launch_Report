import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';

const DpMrabDetailsPage = () => {
  return (
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
            <td >4.88 Mbps</td>
            <td >26.24 Mbps</td>
          </tr>
          <tr>
            <td>Maximum</td>
            <td>24.76 Mbps</td>
            <td>143.53 Mbps</td>
          </tr>
          <tr>
            <td>Minimum</td>
            <td>1.41 Mbps</td>
            <td>1.16 Mbps</td>
          </tr>
          <tr>
            <td>Standard Deviation</td>
            <td>5.54 Mbps</td>
            <td>43.84 Mbps</td>
          </tr>
          <tr>
            <td rowSpan="4">In Call</td>
            <td>Mean</td>
            <td >3.21 Mbps</td>
            <td >5.22 Mbps</td>
          </tr>
          <tr>
            <td>Maximum</td>
            <td>6.74 Mbps</td>
            <td>21.52 Mbps</td>
          </tr>
          <tr>
            <td>Minimum</td>
            <td>1.60 Mbps</td>
            <td>1.10 Mbps</td>
          </tr>
          <tr>
            <td>Standard Deviation</td>
            <td>1.28 Mbps</td>
            <td>4.92 Mbps</td>
          </tr>
          <tr>
            <td rowSpan="4">Post Call</td>
            <td>Mean</td>
            <td >3.70 Mbps</td>
            <td >20.77 Mbps</td>
          </tr>
          <tr>
            <td>Maximum</td>
            <td>7.04 Mbps</td>
            <td>104.67 Mbps</td>
          </tr>
          <tr>
            <td>Minimum</td>
            <td>1.58 Mbps</td>
            <td>1.20 Mbps</td>
          </tr>
          <tr>
            <td>Standard Deviation</td>
            <td>1.69 Mbps</td>
            <td>32.55 Mbps</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DpMrabDetailsPage;