import React, { useContext, useEffect } from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import { HeaderContext } from '../../Contexts/HeaderContext';
import { ReportContext } from '../../Contexts/ReportContext';
import PageBreak from '../../CommonPage/PageBreak';
import { getKpiCellClass, getWorstKpiClass } from '../../Utils/KpiRules';
import VqAttenuationTable from './VqCases/VqAttenuationTable';

const VqSummaryPage = () => {
  const { numberedHeaders } = useContext(HeaderContext);
  const { projectData, loadCityData } = useContext(ReportContext);
  const markets = ['Seattle', 'New York'];

  const VqSummaryData = [
    { testCase: '5G Auto VoNR Disabled Audio Delay' },
    { testCase: '5G Auto VoNR Enabled Audio Delay' },
    { testCase: '5G Auto VoNR Enabled AMR NB VQ' },
    { testCase: '5G Auto VoNR Enabled AMR WB VQ' },
    { testCase: '5G Auto VoNR Disabled EVS WB VQ' },
    { testCase: '5G Auto VoNR Enabled EVS WB VQ' },
  ];

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

  const getVqValue = (market, testCase, category, device, stat) => {
    const reportData = projectData[market];
    if (!reportData || !reportData.voiceQuality || !reportData.voiceQuality["Voice Quality"]) return 'N/A';

    const vqData = reportData.voiceQuality["Voice Quality"];
    const caseData = vqData[testCase];
    if (!caseData) return 'N/A';

    let path;
    if (testCase.includes('AMR NB')) {
      if (caseData[category] && caseData[category][device]) {
        path = [category, device, stat];
      } else {
        path = [device, stat];
      }
    } else if (testCase.includes('AMR WB')) {
      path = [category, `vonr enable amr wb ${device} ${category.toLowerCase()}`, stat];
    } else if (testCase.includes('EVS WB')) {
      const isEnabled = testCase.includes('Enabled');
      const prefix = isEnabled ? 'vonr enable evs wb' : 'vonr disable evs wb';
      path = [category, `${prefix} ${device} ${category.toLowerCase()}`, stat];
    } else {
      return 'N/A';
    }

    const val = getFormattedValue(caseData, path);
    return val !== null && val !== undefined ? (typeof val === 'number' ? val.toFixed(2) : val) : 'N/A';
  };

  const allAttenuationTables = [];
  VqSummaryData.filter(data => !data.testCase.includes('Audio Delay')).forEach((data, caseIdx) => {
    if (data.testCase.includes('AMR NB')) {
      const caseData = markets.map(market => ({
        market,
        mobile: {
          'REF': getVqValue(market, data.testCase, "Mobile", "REF", "INPUT LEVEL") !== 'N/A' ? getVqValue(market, data.testCase, "Mobile", "REF", "INPUT LEVEL") : getVqValue(market, data.testCase, "Mobile", "REF1", "INPUT LEVEL"),
          'DUT 1': getVqValue(market, data.testCase, "Mobile", "DUT1", "INPUT LEVEL"),
          'DUT 2': getVqValue(market, data.testCase, "Mobile", "DUT2", "INPUT LEVEL")
        },
        base: {
          'REF': getVqValue(market, data.testCase, "Base", "REF", "OUTPUT LEVEL") !== 'N/A' ? getVqValue(market, data.testCase, "Base", "REF", "OUTPUT LEVEL") : getVqValue(market, data.testCase, "Base", "REF1", "OUTPUT LEVEL"),
          'DUT 1': getVqValue(market, data.testCase, "Base", "DUT1", "OUTPUT LEVEL"),
          'DUT 2': getVqValue(market, data.testCase, "Base", "DUT2", "OUTPUT LEVEL")
        },
        downlink: {
          'REF': getVqValue(market, data.testCase, "Base", "REF", "DL MOS ATTN") !== 'N/A' ? getVqValue(market, data.testCase, "Base", "REF", "DL MOS ATTN") : getVqValue(market, data.testCase, "Base", "REF1", "DL MOS ATTN"),
          'DUT 1': getVqValue(market, data.testCase, "Base", "DUT1", "DL MOS ATTN"),
          'DUT 2': getVqValue(market, data.testCase, "Base", "DUT2", "DL MOS ATTN")
        },
        uplink: {
          'REF': getVqValue(market, data.testCase, "Base", "REF", "UL MOS ATTN") !== 'N/A' ? getVqValue(market, data.testCase, "Base", "REF", "UL MOS ATTN") : getVqValue(market, data.testCase, "Base", "REF1", "UL MOS ATTN"),
          'DUT 1': getVqValue(market, data.testCase, "Base", "DUT1", "UL MOS ATTN"),
          'DUT 2': getVqValue(market, data.testCase, "Base", "DUT2", "UL MOS ATTN")
        }
      }));
      allAttenuationTables.push(
        <VqAttenuationTable
          key={data.testCase}
          title={data.testCase}
          data={caseData}
          entities={['REF', 'DUT 1', 'DUT 2']}
        />
      );
    } else {
      const entities = data.testCase.includes('AMR WB') ? ['REF', 'DUT 1', 'DUT 2'] : ['DUT 1', 'REF 1', 'DUT 2', 'REF 2'];
      const deviceMap = data.testCase.includes('AMR WB')
        ? { 'REF': 'REF1', 'DUT 1': 'DUT1', 'DUT 2': 'DUT2' }
        : { 'DUT 1': 'DUT1', 'REF 1': 'REF1', 'DUT 2': 'DUT2', 'REF 2': 'REF2' };

      // Mobile Table
      allAttenuationTables.push(
        <VqAttenuationTable
          key={`${data.testCase}-Mobile`}
          title={`${data.testCase} - Mobile`}
          showUplinkAttenuation={false}
          data={markets.map(market => {
            const rowData = { market, mobile: {}, base: {}, downlink: {}, uplink: {} };
            entities.forEach(entity => {
              const device = deviceMap[entity];
              rowData.mobile[entity] = getVqValue(market, data.testCase, "Mobile", device, "INPUT LEVEL");
              rowData.base[entity] = getVqValue(market, data.testCase, "Mobile", device, "OUTPUT LEVEL");
              rowData.downlink[entity] = getVqValue(market, data.testCase, "Mobile", device, "DL MOS ATTN");
              rowData.uplink[entity] = getVqValue(market, data.testCase, "Mobile", device, "UL MOS ATTN");
            });
            return rowData;
          })}
          entities={entities}
        />
      );

      // Base Table
      allAttenuationTables.push(
        <VqAttenuationTable
          key={`${data.testCase}-Base`}
          title={`${data.testCase} - Base`}
          showUplinkAttenuation={false}
          data={markets.map(market => {
            const rowData = { market, mobile: {}, base: {}, downlink: {}, uplink: {} };
            entities.forEach(entity => {
              const device = deviceMap[entity];
              rowData.mobile[entity] = getVqValue(market, data.testCase, "Base", device, "INPUT LEVEL");
              rowData.base[entity] = getVqValue(market, data.testCase, "Base", device, "OUTPUT LEVEL");
              rowData.downlink[entity] = getVqValue(market, data.testCase, "Base", device, "DL MOS ATTN");
              rowData.uplink[entity] = getVqValue(market, data.testCase, "Base", device, "UL MOS ATTN");
            });
            return rowData;
          })}
          entities={entities}
        />
      );
    }
  });

  const chunkedTables = [];
  const firstChunkSize = 3; // Custom split to move the 4th table to the second page as requested
  if (allAttenuationTables.length > 0) {
    chunkedTables.push(allAttenuationTables.slice(0, firstChunkSize));
    for (let i = firstChunkSize; i < allAttenuationTables.length; i += 4) {
      const nextChunk = allAttenuationTables.slice(i, i + 4);
      if (nextChunk.length > 0) {
        chunkedTables.push(nextChunk);
      }
    }
  }

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
      {chunkedTables.map((chunk, index) => (
        <PageBreak key={`chunk-${index}`}>
          {index === 0 && <h2>Audio input/output levels and average attenuation</h2>}
          {chunk}
        </PageBreak>
      ))}
    </>
  );
};

export default VqSummaryPage;