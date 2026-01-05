import React, { useState, useEffect, useContext } from 'react';
import { ReportContext } from '../../Contexts/ReportContext';
import '../../StyleScript/Restricted_Report_Style.css';
import DpHistogramComponent from './DpHistogramComponent';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../Constants/ChartColors';
import { getKpiCellColor } from '../../Utils/KpiRules';
import DynamicHeader from '../../CommonPage/DynamicHeader';

const DpMrabDetailsPage = ({ city: propCity }) => {
  const { city: globalCity, allReportData, loadCityData } = useContext(ReportContext);
  const city = propCity || globalCity;

  useEffect(() => {
    if (city) {
      loadCityData(city);
    }
  }, [city, loadCityData]);

  const reportData = allReportData[city];
  const [mrabData, setMrabData] = useState(null);

  useEffect(() => {
    const data = reportData?.dataPerformance?.['Data Performance']?.['5G AUTO DP']?.['5G VoNR MRAB Stationary'];
    if (data) {
      setMrabData(data);
    }
  }, [reportData]);

  if (!mrabData) {
    return <div className="page-content">Loading {city} MRAB data...</div>;
  }
  return (
    <div className="page-content">
      <DynamicHeader level={2}>VoNR M-RAB Stationary Test - 5G Auto - {city}</DynamicHeader>
      <h4>VoNR M-RAB Overview</h4>
      <table className="general-table-style">
        <thead>
          <tr>
            <th>Category</th>
            <th>Mean DUT Value (Mbps)</th>
            <th>Mean REF Value (Mbps)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pre Call</td>
            <td style={{ backgroundColor: getKpiCellColor('Throughput', mrabData["DUT"]["MRAB Statistics"]["Pre Call"]["Mean"], mrabData["REF"]["MRAB Statistics"]["Pre Call"]["Mean"]) }}>
              {mrabData["DUT"]["MRAB Statistics"]["Pre Call"]["Mean"].toFixed(2)}
            </td>
            <td>{mrabData["REF"]["MRAB Statistics"]["Pre Call"]["Mean"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>In Call</td>
            <td style={{ backgroundColor: getKpiCellColor('Throughput', mrabData["DUT"]["MRAB Statistics"]["In Call"]["Mean"], mrabData["REF"]["MRAB Statistics"]["In Call"]["Mean"]) }}>
              {mrabData["DUT"]["MRAB Statistics"]["In Call"]["Mean"].toFixed(2)}
            </td>
            <td>{mrabData["REF"]["MRAB Statistics"]["In Call"]["Mean"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Post Call</td>
            <td style={{ backgroundColor: getKpiCellColor('Throughput', mrabData["DUT"]["MRAB Statistics"]["Post Call"]["Mean"], mrabData["REF"]["MRAB Statistics"]["Post Call"]["Mean"]) }}>
              {mrabData["DUT"]["MRAB Statistics"]["Post Call"]["Mean"].toFixed(2)}
            </td>
            <td>{mrabData["REF"]["MRAB Statistics"]["Post Call"]["Mean"].toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <h4>VoNR M-RAB Details</h4>
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
            <td style={{ backgroundColor: getKpiCellColor('Throughput', mrabData["DUT"]["MRAB Statistics"]["Pre Call"]["Mean"], mrabData["REF"]["MRAB Statistics"]["Pre Call"]["Mean"]) }}>
              {mrabData["DUT"]["MRAB Statistics"]["Pre Call"]["Mean"].toFixed(2)}
            </td>
            <td>{mrabData["REF"]["MRAB Statistics"]["Pre Call"]["Mean"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Maximum</td>
            <td>{mrabData["DUT"]["MRAB Statistics"]["Pre Call"]["Maximum"].toFixed(2)}</td>
            <td>{mrabData["REF"]["MRAB Statistics"]["Pre Call"]["Maximum"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Minimum</td>
            <td>{mrabData["DUT"]["MRAB Statistics"]["Pre Call"]["Minimum"].toFixed(2)}</td>
            <td>{mrabData["REF"]["MRAB Statistics"]["Pre Call"]["Minimum"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Standard Deviation</td>
            <td>{mrabData["DUT"]["MRAB Statistics"]["Pre Call"]["Standard Deviation"].toFixed(2)}</td>
            <td>{mrabData["REF"]["MRAB Statistics"]["Pre Call"]["Standard Deviation"].toFixed(2)}</td>
          </tr>
          <tr>
            <td rowSpan="4">In Call</td>
            <td>Mean</td>
            <td style={{ backgroundColor: getKpiCellColor('Throughput', mrabData["DUT"]["MRAB Statistics"]["In Call"]["Mean"], mrabData["REF"]["MRAB Statistics"]["In Call"]["Mean"]) }}>
              {mrabData["DUT"]["MRAB Statistics"]["In Call"]["Mean"].toFixed(2)}
            </td>
            <td>{mrabData["REF"]["MRAB Statistics"]["In Call"]["Mean"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Maximum</td>
            <td>{mrabData["DUT"]["MRAB Statistics"]["In Call"]["Maximum"].toFixed(2)}</td>
            <td>{mrabData["REF"]["MRAB Statistics"]["In Call"]["Maximum"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Minimum</td>
            <td>{mrabData["DUT"]["MRAB Statistics"]["In Call"]["Minimum"].toFixed(2)}</td>
            <td>{mrabData["REF"]["MRAB Statistics"]["In Call"]["Minimum"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Standard Deviation</td>
            <td>{mrabData["DUT"]["MRAB Statistics"]["In Call"]["Standard Deviation"].toFixed(2)}</td>
            <td>{mrabData["REF"]["MRAB Statistics"]["In Call"]["Standard Deviation"].toFixed(2)}</td>
          </tr>
          <tr>
            <td rowSpan="4">Post Call</td>
            <td>Mean</td>
            <td style={{ backgroundColor: getKpiCellColor('Throughput', mrabData["DUT"]["MRAB Statistics"]["Post Call"]["Mean"], mrabData["REF"]["MRAB Statistics"]["Post Call"]["Mean"]) }}>
              {mrabData["DUT"]["MRAB Statistics"]["Post Call"]["Mean"].toFixed(2)}
            </td>
            <td>{mrabData["REF"]["MRAB Statistics"]["Post Call"]["Mean"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Maximum</td>
            <td>{mrabData["DUT"]["MRAB Statistics"]["Post Call"]["Maximum"].toFixed(2)}</td>
            <td>{mrabData["REF"]["MRAB Statistics"]["Post Call"]["Maximum"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Minimum</td>
            <td>{mrabData["DUT"]["MRAB Statistics"]["Post Call"]["Minimum"].toFixed(2)}</td>
            <td>{mrabData["REF"]["MRAB Statistics"]["Post Call"]["Minimum"].toFixed(2)}</td>
          </tr>
          <tr>
            <td>Standard Deviation</td>
            <td>{mrabData["DUT"]["MRAB Statistics"]["Post Call"]["Standard Deviation"].toFixed(2)}</td>
            <td>{mrabData["REF"]["MRAB Statistics"]["Post Call"]["Standard Deviation"].toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Mrab histogram, pre call, in call, post call, overall */}
      <DpHistogramComponent
        data={[
          { name: 'Pre Call', DUT: mrabData["DUT"]["MRAB Statistics"]["Pre Call"]["Mean"], REF: mrabData["REF"]["MRAB Statistics"]["Pre Call"]["Mean"] },
          { name: 'In Call', DUT: mrabData["DUT"]["MRAB Statistics"]["In Call"]["Mean"], REF: mrabData["REF"]["MRAB Statistics"]["In Call"]["Mean"] },
          { name: 'Post Call', DUT: mrabData["DUT"]["MRAB Statistics"]["Post Call"]["Mean"], REF: mrabData["REF"]["MRAB Statistics"]["Post Call"]["Mean"] },
        ]}
        title="M-RAB Throughput"
        yAxisLabel="Mean Value (Mbps)"
        barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
      />
    </div>
  );
};

export default DpMrabDetailsPage;