import React, { useContext } from 'react';
import '../StyleScript/Restricted_Report_Style.css';
import { ReportContext } from '../Contexts/ReportContext';
import PageBreak from './PageBreak';

const DeviceInfoPage = () => {
    const { project } = useContext(ReportContext);

    // Get deviceData from the project object, fallback to empty array if not found
    const deviceData = project?.deviceData || [];

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
                        <th>IMEI</th>
                    </tr>
                </thead>
                <tbody>
                    {deviceData.length > 0 ? (
                        deviceData.map((device, index) => (
                            <tr key={index}>
                                <td>{device.testDeviceLabel}</td>
                                <td>{device.role}</td>
                                <td>{device.softwareVersion}</td>
                                <td>{device.hardwareVersion}</td>
                                <td>
                                    {device.imei.map((imei, i) => (
                                        <div key={i}>{imei}</div>
                                    ))}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
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