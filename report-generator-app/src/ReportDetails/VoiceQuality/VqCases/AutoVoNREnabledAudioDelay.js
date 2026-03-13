import React, { useState, useEffect, useContext } from 'react';
import { ReportContext } from '../../../Contexts/ReportContext';
import '../../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../../CommonPage/DynamicHeader';
import PageBreak from '../../../CommonPage/PageBreak';
import { getKpiCellClass } from '../../../Utils/KpiRules';

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

  const toNA = (val) => (val !== undefined && val !== null && typeof val === 'number') ? val.toFixed(2) : "N/A";

  const averageDut = (() => {
    const vals = [dut1Data.mean, dut2Data.mean].filter(v => typeof v === 'number');
    return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : "N/A";
  })();

  const averageRef = (() => {
    const vals = [ref1Data.mean, ref2Data.mean].filter(v => typeof v === 'number');
    return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : "N/A";
  })();

  return [
    {
      metric: "Average (ms)",
      dut1: toNA(dut1Data.mean),
      dut2: toNA(dut2Data.mean),
      ref1: toNA(ref1Data.mean),
      ref2: toNA(ref2Data.mean),
      highlight: false
    },
    {
      metric: "Average of 2 Devices (ms)",
      dut: averageDut,
      ref: averageRef,
      className: getKpiCellClass('AudioDelay', averageDut, averageRef),
      highlight: true
    },
    {
      metric: "Stdev (ms)",
      dut1: toNA(dut1Data.std_dev),
      dut2: toNA(dut2Data.std_dev),
      ref1: toNA(ref1Data.std_dev),
      ref2: toNA(ref2Data.std_dev),
      highlight: false
    },
    {
      metric: "Maximum (ms)",
      dut1: toNA(dut1Data.max),
      dut2: toNA(dut2Data.max),
      ref1: toNA(ref1Data.max),
      ref2: toNA(ref2Data.max),
      highlight: false
    },
    {
      metric: "Minimum (ms)",
      dut1: toNA(dut1Data.min),
      dut2: toNA(dut2Data.min),
      ref1: toNA(ref1Data.min),
      ref2: toNA(ref2Data.min),
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

const AutoVoNREnabledAudioDelay = ({ city: propCity, firstSection = false }) => {
  const { city: globalCity, projectData, loadCityData } = useContext(ReportContext);
  const city = propCity || globalCity;
  const [vqTableData6, setVqTableData6] = useState([]);

  useEffect(() => {
    if (city) {
      loadCityData(city);
    }
  }, [city, loadCityData]);

  const reportData = projectData[city];

  useEffect(() => {
    if (reportData && reportData.voiceQuality && reportData.voiceQuality["Voice Quality"]) {
      const processedData = processAudioDelayData(reportData.voiceQuality["Voice Quality"]["5G Auto VoNR Enabled Audio Delay"]);
      setVqTableData6(processedData);
    }
  }, [reportData]);

  return (
    <PageBreak>
      {firstSection && <DynamicHeader level={1} style={{ textAlign: 'center' }}>Voice Quality Test</DynamicHeader>}
      <DynamicHeader level={2}>5G Auto VoNR Enabled Audio Delay - {city}</DynamicHeader>
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
                  <td colSpan="2" className={row.className}>{row.dut}</td>
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
    </PageBreak>
  );
};

export default AutoVoNREnabledAudioDelay;