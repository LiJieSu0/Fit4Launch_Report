import React, { useContext, useEffect } from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import { HeaderContext } from '../../Contexts/HeaderContext';
import { ReportContext } from '../../Contexts/ReportContext';
import PageBreak from '../../CommonPage/PageBreak';
import { getKpiCellClass, getWorstKpiClass } from '../../Utils/KpiRules';

const VqSummaryPage = () => {
  const { numberedHeaders } = useContext(HeaderContext);
  const { projectData, loadCityData } = useContext(ReportContext);
  const markets = ['Seattle', 'New York'];

  useEffect(() => {
    markets.forEach(market => loadCityData(market));
  }, [loadCityData]);

  const getDynamicLink = (testCase, market) => {
    const searchText = `${testCase} - ${market}`.toLowerCase();
    const header = numberedHeaders.find(h => h.text.toLowerCase().includes(searchText));
    return header ? `#${header.id}` : '#';
  };

  const getFormattedValue = (data, path) => {
    let value = data;
    for (const key of path) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return null;
      }
    }
    return value;
  };

  const calculateSummaryColor = (testCase, market) => {
    const reportData = projectData[market];
    if (!reportData || !reportData.voiceQuality || !reportData.voiceQuality["Voice Quality"]) return '';

    const vqData = reportData.voiceQuality["Voice Quality"];
    const classes = [];

    const mapExcellentToPass = (cls) => cls === 'bg-performance-excellent' ? 'bg-performance-pass' : cls;

    if (testCase.includes('Audio Delay')) {
      const data = vqData[testCase];
      if (data && data.DUT1 && data.REF1 && data.DUT2 && data.REF2) {
        const dut1Key = Object.keys(data.DUT1)[0];
        const ref1Key = Object.keys(data.REF1)[0];
        const dut2Key = Object.keys(data.DUT2)[0];
        const ref2Key = Object.keys(data.REF2)[0];
        const avgDut = (data.DUT1[dut1Key].mean + data.DUT2[dut2Key].mean) / 2;
        const avgRef = (data.REF1[ref1Key].mean + data.REF2[ref2Key].mean) / 2;
        classes.push(mapExcellentToPass(getKpiCellClass('AudioDelay', avgDut, avgRef)));
      }
    } else {
      const caseData = vqData[testCase];
      if (caseData) {
        if (testCase.includes('AMR NB')) {
          const metrics = [
            { name: 'mean', rule: 'AmrMosAverage' },
            { name: '% MOS < 2.0', rule: 'AmrMosTwoPointZero' },
            { name: '% MOS < 3.0', rule: 'AmrMosThreePointZero' }
          ];
          ['DUT1', 'DUT2'].forEach(dut => {
            metrics.forEach(m => {
              const valDl = getFormattedValue(caseData, [dut, 'dl_mos_stats', m.name]);
              const refDl = getFormattedValue(caseData, ['REF1', 'dl_mos_stats', m.name]) || getFormattedValue(caseData, ['REF', 'dl_mos_stats', m.name]);
              if (valDl !== null && refDl !== null) classes.push(mapExcellentToPass(getKpiCellClass(m.rule, valDl, refDl)));

              const valUl = getFormattedValue(caseData, [dut, 'ul_mos_stats', m.name]);
              const refUl = getFormattedValue(caseData, ['REF1', 'ul_mos_stats', m.name]) || getFormattedValue(caseData, ['REF', 'ul_mos_stats', m.name]);
              if (valUl !== null && refUl !== null) classes.push(mapExcellentToPass(getKpiCellClass(m.rule, valUl, refUl)));
            });
          });
        } else if (testCase.includes('AMR WB')) {
          const metrics = [
            { name: 'MOS Average', rule: 'AmrMosAverage' },
            { name: '% MOS < 2.0', rule: 'AmrMosTwoPointZero' },
            { name: '% MOS < 3.0', rule: 'AmrMosThreePointZero' }
          ];
          ['Base', 'Mobile'].forEach(cat => {
            ['DUT1', 'DUT2'].forEach(dut => {
              const suffix = cat.toLowerCase();
              const prefix = `vonr enable amr wb`;
              metrics.forEach(m => {
                const val = getFormattedValue(caseData, [cat, `${prefix} ${dut} ${suffix}`, m.name]);
                const ref = getFormattedValue(caseData, [cat, `${prefix} REF1 ${suffix}`, m.name]) || getFormattedValue(caseData, [cat, `${prefix} REF ${suffix}`, m.name]);
                if (val !== null && ref !== null) classes.push(mapExcellentToPass(getKpiCellClass(m.rule, val, ref)));
              });
            });
          });
        } else if (testCase.includes('EVS WB')) {
          const isEnabled = testCase.includes('Enabled');
          const prefix = isEnabled ? 'vonr enable evs wb' : 'vonr disable evs wb';
          const metrics = [
            { name: 'MOS Average', evsRule: 'EvsToEvsMosAverage', amrRule: 'EvsToAmrMosAverage' },
            { name: '% MOS < 3.4', evsRule: 'EvsToEvsMosThreePointFour', amrRule: 'EvsToAmrMosThreePointFour' },
            { name: '% MOS < 3.0', evsRule: 'EvsToEvsMosThreePointZero', amrRule: 'EvsToAmrMosThreePointZero' }
          ];
          ['Base', 'Mobile'].forEach(cat => {
            const suffix = cat.toLowerCase();
            metrics.forEach(m => {
              const val1 = getFormattedValue(caseData, [cat, `${prefix} DUT1 ${suffix}`, m.name]);
              const ref1 = getFormattedValue(caseData, [cat, `${prefix} REF1 ${suffix}`, m.name]);
              if (val1 !== null && ref1 !== null) classes.push(mapExcellentToPass(getKpiCellClass(m.evsRule, val1, ref1)));

              const val2 = getFormattedValue(caseData, [cat, `${prefix} DUT2 ${suffix}`, m.name]);
              const ref2 = getFormattedValue(caseData, [cat, `${prefix} REF2 ${suffix}`, m.name]);
              if (val2 !== null && ref2 !== null) classes.push(mapExcellentToPass(getKpiCellClass(m.amrRule, val2, ref2)));
            });
          });
        }
      }
    }

    return getWorstKpiClass(classes);
  };

  const VqSummaryData = [
    { testCase: '5G Auto VoNR Disabled Audio Delay' },
    { testCase: '5G Auto VoNR Enabled Audio Delay' },
    { testCase: '5G Auto VoNR Enabled AMR NB VQ' },
    { testCase: '5G Auto VoNR Enabled AMR WB VQ' },
    { testCase: '5G Auto VoNR Disabled EVS WB VQ' },
    { testCase: '5G Auto VoNR Enabled EVS WB VQ' },

  ];

  return (
    <>
      <PageBreak id="summary-page">
        <DynamicHeader level={1}>Voice Quality Test Overview</DynamicHeader>
        <table className="general-table-style">
          <thead>
            <tr>
              <th rowSpan="2">Test Cases</th>
              <th colSpan={markets.length}>Market</th>
            </tr>
            <tr>
              {markets.map(market => (
                <th key={market}>{market}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VqSummaryData.map((data, index) => (
              <tr key={index}>
                <td>{data.testCase}</td>
                {markets.map(market => {
                  const cellColor = calculateSummaryColor(data.testCase, market);
                  return (
                    <td key={market} className={cellColor}>
                      <a href={getDynamicLink(data.testCase, market)}>Results</a>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </PageBreak>
      <PageBreak>
        <h2>Audio input/output levels and average attenuation</h2>
        {/* TODO: Add audio input/output levels and average attenuation table for each cases exclude audio delay */}
      </PageBreak>
    </>
  );
};

export default VqSummaryPage;