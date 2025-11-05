import React from 'react';
import '../StyleScript/Restricted_Report_Style.css';
const deviceData = [
    {
        market: "Seattle",
        testDeviceLabel: "Samsung XCover Pro7",
        role: "Device Under Test",
        softwareVersion: "SP1A.210812.016.A125USQU3CVG4",
        imei: [
            "354879770010297", "354879770011428", "354879770012160",
            "354879770012335", "354879770011139", "354879770011535",
            "354879770010388", "354879770012210", "354879770011048",
            "354879770012475"
        ]
    },
    {
        market: "",
        testDeviceLabel: "Samsung GS25 FE",
        role: "Reference",
        softwareVersion: "BP2A.250605.031.A3.S731USQU1AYH5",
        imei: [
            "358625370021547", "358625370020499", "358625370022602",
            "358625370021935", "358625370022487", "358625370020408",
            "358625370022867", "358625370021489", "358625370021489",
            "358625370021596"
        ]
    }
];

const DeviceInfoPage = () => {
    return (
        <div className="page-content">
            <h2>Device Information</h2>
            
            <table className="device-info-table">
                <thead>
                    <tr>
                        <th>Market</th>
                        <th>Test Device Label</th>
                        <th>Role</th>
                        <th>Software Version</th>
                        <th>IMEI</th>
                    </tr>
                </thead>
                <tbody>
                    {deviceData.map((device, index) => (
                        <tr key={index}>
                            <td>{device.market}</td>
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