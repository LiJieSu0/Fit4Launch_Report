import React from 'react';
import '../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from './DynamicHeader';

const deviceData = [
    {
        testDeviceLabel: "Motorola XT2575-4",
        role: "Device Under Test",
        softwareVersion: "17.0.02.147_Development Version",
        imei: [
            "352274860000855", "352274860001077", "352274860000996 ", "352274860001119 "
        ]
    },
    {
        testDeviceLabel: "Samsung Galaxy A14 5G (SM-A146U) ",
        role: "Reference",
        softwareVersion: "AP3A.240905.015.A2.A146USQSFEYK3",
        imei: [
            "350545460016108", "350545460016157", "350545460014939", "350545460015225"
        ]
    }
];

const DeviceInfoPage = () => {
    return (
        <div className="page-content device-info-page">
            <h2>Device Information</h2>
            <table className="device-info-table general-table-style">
                <thead>
                    <tr>
                        <th>Test Device Label</th>
                        <th>Role</th>
                        <th>Software Version</th>
                        <th>IMEI</th>
                    </tr>
                </thead>
                <tbody>
                    {deviceData.map((device, index) => (
                        <tr key={index}>
                            <td>{device.testDeviceLabel}</td>
                            <td>{device.role}</td>
                            <td>{device.softwareVersion}</td>
                            <td>
                                {device.imei.map((imei, i) => (
                                    <div key={i}>{imei}</div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
};

export default DeviceInfoPage;