import React, { useContext } from 'react';
import '../StyleScript/Restricted_Report_Style.css';
import { ReportContext } from '../Contexts/ReportContext';
import PageBreak from './PageBreak';

const DeviceInfoPage = () => {
    const { project } = useContext(ReportContext);

    const deviceData = project?.deviceData || [];

    const hasMarketData = deviceData.length > 0 && deviceData[0].hasOwnProperty('marketData');

    const renderDeviceRows = () => {
        const rows = [];
        
        deviceData.forEach((device, deviceIndex) => {
            if (hasMarketData && device.marketData) {
                device.marketData.forEach((market, marketIndex) => {
                    const isFirstMarket = marketIndex === 0;
                    
                    rows.push(
                        <tr key={`${deviceIndex}-${marketIndex}`}>
                            {isFirstMarket && (
                                <>
                                    <td rowSpan={device.marketData.length}>{device.testDeviceLabel}</td>
                                    <td rowSpan={device.marketData.length}>{device.role}</td>
                                    <td rowSpan={device.marketData.length}>{device.softwareVersion}</td>
                                    <td rowSpan={device.marketData.length}>{device.hardwareVersion}</td>
                                </>
                            )}
                            <td>{market.market}</td>
                            <td>
                                {market.imei?.map((imei, i) => (
                                    <div key={i}>{imei}</div>
                                ))}
                            </td>
                        </tr>
                    );
                });
            } else {
                rows.push(
                    <tr key={deviceIndex}>
                        <td>{device.testDeviceLabel}</td>
                        <td>{device.role}</td>
                        <td>{device.softwareVersion}</td>
                        <td>{device.hardwareVersion}</td>
                        <td>
                            {device.imei?.map((imei, i) => (
                                <div key={i}>{imei}</div>
                            ))}
                        </td>
                    </tr>
                );
            }
        });
        
        return rows;
    };

    return (
        <PageBreak className="device-info-page">
            <h2>Device Information</h2>
            <table className="device-info-table general-table-style">
                <thead>
                    <tr>
                        <th>Test Device Label</th>
                        <th>Role</th>
                        <th>Software Version</th>
                        <th>Hardware Version</th>
                        {hasMarketData && <th>Market</th>}
                        <th>IMEI</th>
                    </tr>
                </thead>
                <tbody>
                    {deviceData.length > 0 ? (
                        renderDeviceRows()
                    ) : (
                        <tr>
                            <td colSpan={hasMarketData ? 6 : 5} style={{ textAlign: 'center', padding: '20px' }}>
                                No device information available for this project.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h2>Test Duration: {project?.testDuration}</h2>
        </PageBreak>
    );
};

export default DeviceInfoPage;