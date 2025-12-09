import React, { useState, useEffect } from 'react';
import '../../../StyleScript/Restricted_Report_Style.css';

const processAudioDelayData = (audioDelayData) => {
  if (!audioDelayData || !audioDelayData.DUT1 || !audioDelayData.REF1 || !audioDelayData.DUT2 || !audioDelayData.REF2) {
    return [];
  }

  const dut1Key = Object.keys(audioDelayData.DUT1)[0];
  const ref1Key = Object.keys(audioDelayData.REF1)[0];
  const dut2Key = Object.keys(audioDelayData.DUT2)[0];
  const ref2Key = Object.keys(audioDelayData.REF2)[0];

  const dut1Data = audioDelayData.DUT1[dut1Key];
  const ref1Data = audioDelayData.REF1[ref1Key];
  const dut2Data = audioDelayData.DUT2[dut2Key];
  const ref2Data = audioDelayData.REF2[ref2Key];

  const averageDut = ((dut1Data.mean + dut2Data.mean) / 2).toFixed(2);
  const averageRef = ((ref1Data.mean + ref2Data.mean) / 2).toFixed(2);

  return [
    {
      metric: "Average (ms)",
      dut1: dut1Data.mean.toFixed(2),
      dut2: dut2Data.mean.toFixed(2),
      ref1: ref1Data.mean.toFixed(2),
      ref2: ref2Data.mean.toFixed(2),
      highlight: false
    },
    {
      metric: "Average of 2 Devices (ms)",
      dut: averageDut,
      ref: averageRef,
      highlight: true
    },
    {
      metric: "Stdev (ms)",
      dut1: dut1Data.std_dev.toFixed(2),
      dut2: dut2Data.std_dev.toFixed(2),
      ref1: ref1Data.std_dev.toFixed(2),
      ref2: ref2Data.std_dev.toFixed(2),
      highlight: false
    },
    {
      metric: "Maximum (ms)",
      dut1: dut1Data.max.toFixed(2),
      dut2: dut2Data.max.toFixed(2),
      ref1: ref1Data.max.toFixed(2),
      ref2: ref2Data.max.toFixed(2),
      highlight: false
    },
    {
      metric: "Minimum (ms)",
      dut1: dut1Data.min.toFixed(2),
      dut2: dut2Data.min.toFixed(2),
      ref1: ref1Data.min.toFixed(2),
      ref2: ref2Data.min.toFixed(2),
      highlight: false
    },
    {
      metric: "Count",
      dut1: dut1Data.occurrences.toString(),
      dut2: dut2Data.occurrences.toString(),
      ref1: ref1Data.occurrences.toString(),
      ref2: ref2Data.occurrences.toString(),
      highlight: false
    }
  ];
};

const AutoVoNREnabledAudioDelay = () => {
  const [vqTableData6, setVqTableData6] = useState([]);

  useEffect(() => {
    fetch('/AnalyzeResults/Seattle/voice_quality_results.json')
      .then(response => response.json())
      .then(data => {
        const processedData = processAudioDelayData(data["Voice Quality"]["5G Auto VoNR Enabled Audio Delay"]);
        setVqTableData6(processedData);
      })
      .catch(error => console.error("Error fetching voice quality data:", error));
  }, []);

  return (
    <div className="page-content">
      <h2>2.6 Auto VoNR Enabled Audio Delay</h2>
      <div id='2.6'></div>
      <table className="general-table-style vq-details-table">
        <thead>
          <tr>
            <th rowSpan="2"></th>
            <th colSpan="4">KPI FOR AUDIO DELAY</th>
          </tr>
          <tr>
            <th>DUT 1</th>
            <th>DUT 2</th>
            <th>REF 1</th>
            <th>REF 2</th>
          </tr>
        </thead>
        <tbody>
          {vqTableData6.map((row, index) => (
            <tr key={index} className={row.highlight ? 'highlight-row' : ''}>
              <td>{row.metric}</td>
              {row.metric === "Average of 2 Devices (ms)" ? (
                <>
                  <td colSpan="2" className='bg-performance-pass'>{row.dut}</td>
                  <td colSpan="2">{row.ref}</td>
                </>
              ) : (
                <>
                  <td>{row.dut1}</td>
                  <td>{row.dut2}</td>
                  <td>{row.ref1}</td>
                  <td>{row.ref2}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AutoVoNREnabledAudioDelay;