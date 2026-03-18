import React from 'react';
import '../../../StyleScript/Restricted_Report_Style.css';

/**
 * VqAttenuationTable Component
 * 
 * Displays attenuation and input/output data for VQ reports.
 * The header structure matches the user-provided image with dynamic entity support.
 * 
 * @param {Object} props
 * @param {Array} props.data - The data rows to display. Each row should have:
 *   {
 *     market: string,
 *     testType: string,
 *     mobile: { REF: value, DUT1: value, DUT2: value, ... },
 *     base: { REF: value, DUT1: value, DUT2: value, ... },
 *     downlink: { REF: value, DUT1: value, DUT2: value, ... },
 *     uplink: { REF: value, DUT1: value, DUT2: value, ... }
 *   }
 * @param {Array} props.entities - Optional list of entity names in Row 2 (e.g., ['REF', 'DUT1', 'DUT2']).
 *                                If not provided, it will be inferred from the first data row's 'mobile' object.
 */
const VqAttenuationTable = ({ data, entities: propEntities, title, showUplinkAttenuation = true }) => {
  if (!data || data.length === 0) {
    return <div>No attenuation data available.</div>;
  }

  // Discover entities if not provided as a prop
  const entities = propEntities || (data[0].mobile ? Object.keys(data[0].mobile) : ['REF', 'DUT1', 'DUT2']);
  const entityCount = entities.length;

  return (
    <div className="vq-attenuation-table-container">
      <h4>{title || "Audio input/output levels and average attenuation"}</h4>
      <table className="general-table-style performance-table">
        <thead>
          <tr>
            <th rowSpan="2">Market</th>
            <th colSpan={entityCount}>Input Level</th>
            <th colSpan={entityCount}>Output Level</th>
            <th colSpan={entityCount}>Downlink Attenuation</th>
            {showUplinkAttenuation && <th colSpan={entityCount}>Uplink Attenuation</th>}
          </tr>
          <tr>
            {/* Row 2: Entities repeated for each of the categories */}
            {Array(showUplinkAttenuation ? 4 : 3).fill(null).map((_, groupIdx) => (
              <React.Fragment key={`group-${groupIdx}`}>
                {entities.map(entity => (
                  <th key={`group-${groupIdx}-${entity}`}>{entity}</th>
                ))}
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={`row-${rowIdx}`}>
              <td>{row.market || 'Unknown'}</td>

              {/* Mobile Input/Output */}
              {entities.map(entity => (
                <td key={`mobile-${rowIdx}-${entity}`}>{row.mobile?.[entity] ?? 'N/A'}</td>
              ))}

              {/* Base Input/Output */}
              {entities.map(entity => (
                <td key={`base-${rowIdx}-${entity}`}>{row.base?.[entity] ?? 'N/A'}</td>
              ))}

              {/* Downlink Attenuation */}
              {entities.map(entity => (
                <td key={`downlink-${rowIdx}-${entity}`}>{row.downlink?.[entity] ?? 'N/A'}</td>
              ))}

              {/* Uplink Attenuation */}
              {showUplinkAttenuation && entities.map(entity => (
                <td key={`uplink-${rowIdx}-${entity}`}>{row.uplink?.[entity] ?? 'N/A'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VqAttenuationTable;
