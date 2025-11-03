import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import voiceQualityResults from '../../DataFiles/VoiceQualityResults.json';

const VqSummaryPage = () => {
  const summaryData = Object.keys(voiceQualityResults).flatMap(testCategory => {
    const categoryData = voiceQualityResults[testCategory];
    
    // Handle "5G Auto VoNR Enabled AMR NB VQ" structure
    if (categoryData.DUT1 && categoryData.REF) {
      const dut1UlMean = categoryData.DUT1.ul_mos_stats.mean;
      const dut1DlMean = categoryData.DUT1.dl_mos_stats.mean;
      const refUlMean = categoryData.REF.ul_mos_stats.mean;
      const refDlMean = categoryData.REF.dl_mos_stats.mean;

      const ulResult = dut1UlMean >= refUlMean ? "Pass" : "Fail";
      const dlResult = dut1DlMean >= refDlMean ? "Pass" : "Fail";

      return [
        {
          market: "Seattle",
          test: `${testCategory} UL`,
          dutValue: dut1UlMean.toFixed(2),
          refValue: refUlMean.toFixed(2),
          result: ulResult
        },
        {
          market: "Seattle",
          test: `${testCategory} DL`,
          dutValue: dut1DlMean.toFixed(2),
          refValue: refDlMean.toFixed(2),
          result: dlResult
        }
      ];
    } 
    // Handle "5G Auto VoNR Enabled AMR WB VQ", "5G Auto VoNR Disabled EVS WB VQ", "5G Auto VoNR Enabled EVS WB VQ" structure
    else if (categoryData.Base || categoryData.Mobile) {
      const results = [];
      ['Base', 'Mobile'].forEach(scenario => {
        if (categoryData[scenario]) {
          const scenarioData = categoryData[scenario];
          const dut1MosAvg = scenarioData[`${testCategory.toLowerCase().replace(/ /g, '_').replace(/vq/g, '').trim()}_dut1_${scenario.toLowerCase()}`]?.["MOS Average"];
          const refMosAvg = scenarioData[`${testCategory.toLowerCase().replace(/ /g, '_').replace(/vq/g, '').trim()}_ref_base`]?.["MOS Average"] || scenarioData[`${testCategory.toLowerCase().replace(/ /g, '_').replace(/vq/g, '').trim()}_ref1_${scenario.toLowerCase()}`]?.["MOS Average"];
          
          if (dut1MosAvg !== undefined && refMosAvg !== undefined) {
            const result = dut1MosAvg >= refMosAvg ? "Pass" : "Fail";
            results.push({
              market: "Seattle",
              test: `${testCategory} ${scenario} MOS Avg`,
              dutValue: dut1MosAvg.toFixed(2),
              refValue: refMosAvg.toFixed(2),
              result: result
            });
          }
        }
      });
      return results;
    }
    // Handle "5G Auto VoNR Disabled Audio Delay" and "5G Auto VoNR Enabled Audio Delay" structure
    else if (categoryData.DUT1 && categoryData.REF1) {
      const dut1Mean = Object.values(categoryData.DUT1)[0].mean;
      const ref1Mean = Object.values(categoryData.REF1)[0].mean;
      const result = dut1Mean <= ref1Mean ? "Pass" : "Fail"; // Assuming lower delay is better

      return [{
        market: "Seattle",
        test: `${testCategory} Mean Delay`,
        dutValue: dut1Mean.toFixed(2),
        refValue: ref1Mean.toFixed(2),
        result: result
      }];
    }
    return [];
  });

  return (
    <div className="page-content">
      <h2>Voice Quality Summary Page</h2>
      <table className="device-info-table" style={{ display: 'table' }}>
        <thead style={{ display: 'table-header-group' }}>
          <tr style={{ display: 'table-row' }}>
            <th style={{ display: 'table-cell' }}>Market</th>
            <th style={{ display: 'table-cell' }}>Test</th>
            <th style={{ display: 'table-cell' }}>DUT Value</th>
            <th style={{ display: 'table-cell' }}>REF Value</th>
            <th style={{ display: 'table-cell' }}>Result</th>
          </tr>
        </thead>
        <tbody style={{ display: 'table-row-group' }}>
          {summaryData.map((data, index) => (
            <tr key={index} style={{ display: 'table-row' }}>
              <td style={{ display: 'table-cell' }}>{data.market}</td>
              <td style={{ display: 'table-cell' }}>{data.test}</td>
              <td style={{ display: 'table-cell' }}>{data.dutValue}</td>
              <td style={{ display: 'table-cell' }}>{data.refValue}</td>
              <td style={{ display: 'table-cell', backgroundColor: data.result === 'Pass' ? 'var(--performance-pass)' : 'var(--performance-fail)' }}>{data.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VqSummaryPage;