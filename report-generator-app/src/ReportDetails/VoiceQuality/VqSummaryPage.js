import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';

const VqSummaryPage = () => {
  const VqSummaryData = [
    {
      testCase: '5G Auto VoNR Enabled AMR NB VQ',
      results: {
        'Seattle': { link: '#2.1', cellColor: 'bg-performance-pass' },
        'New York': { link: '#NY2.1', cellColor: 'bg-performance-pass' }
      }
    },
    {
      testCase: '5G Auto VoNR Enabled AMR WB VQ',
      results: {
        'Seattle': { link: '#2.2', cellColor: 'bg-performance-pass' },
        'New York': { link: '#NY2.2', cellColor: 'bg-performance-pass' }
      }
    },
    {
      testCase: '5G Auto VoNR Disabled EVS WB VQ',
      results: {
        'Seattle': { link: '#2.3', cellColor: 'bg-performance-fail' },
        'New York': { link: '#NY2.3', cellColor: 'bg-performance-fail' }
      }
    },
    {
      testCase: '5G Auto VoNR Enabled EVS WB VQ',
      results: {
        'Seattle': { link: '#2.4', cellColor: 'bg-performance-fail' },
        'New York': { link: '#NY2.4', cellColor: 'bg-performance-fail' }
      }
    },
    {
      testCase: '5G Auto VoNR Disabled Audio Delay',
      results: {
        'Seattle': { link: '#2.5', cellColor: 'bg-performance-pass' },
        'New York': { link: '#NY2.5', cellColor: 'bg-performance-pass' }
      }
    },
    {
      testCase: '5G Auto VoNR Enabled Audio Delay',
      results: {
        'Seattle': { link: '#2.6', cellColor: 'bg-performance-pass' },
        'New York': { link: '#NY2.6', cellColor: 'bg-performance-pass' }
      }
    },
  ];

  const markets = ['Seattle', 'New York'];

  return (
    <div className="page-content">
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
              {markets.map(market => (
                <td key={market} className={data.results[market].cellColor}>
                  <a href={data.results[market].link}>Results</a>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VqSummaryPage;