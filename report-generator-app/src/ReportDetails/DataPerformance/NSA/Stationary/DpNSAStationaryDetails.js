import React from 'react';
import DpNSAHttpMSTable from './Table/DpNSAHttpMSTable';
import DpNSAHttpSSTable from './Table/DpNSAHttpSSTable';
import DpNSAPingTable from './Table/DpNSAPingTable';
import DpHistogramComponent from '../../DpHistogramComponent';
import MultiStreamHTTPData from '../../../../DataFiles/NSA/DpStationaryResults/Multi Stream HTTP.json';
import SingleStreamHTTPData from '../../../../DataFiles/NSA/DpStationaryResults/Single Stream HTTP.json';
import PingData from '../../../../DataFiles/NSA/DpStationaryResults/Ping.json';
import DpNSAUDPComponent from './DpNSAUDPComponent';

function DpNSAStationaryDetails() {
  return (
    <div className='page-content'>
      <h2>NSA Stationary Data Performance Details</h2>
      {/* Data processing and table rendering for HTTP and Ping */}
      {(() => {
        const singleStreamHTTPDownloadData = {
          Moderate: {
            DUT: SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["DUT_Single Stream HTTP Download for 60 seconds"].Throughput,
            REF: SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["REF Single Stream HTTP Download for 60 seconds"].Throughput,
          },
          Poor: {
            DUT: SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["DUT HTTP DL"].Throughput,
            REF: SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["REF HTTP DL"].Throughput,
          },
        };

        const singleStreamHTTPUploadData = {
          Moderate: {
            DUT: SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput,
            REF: SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput,
          },
          Poor: {
            DUT: SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput,
            REF: SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput,
          },
        };

        const multiStreamHTTPDownloadData = {
          Moderate: {
            DUT: MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput,
            REF: MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput,
          },
          Poor: {
            DUT: MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput,
            REF: MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput,
          },
        };

        const multiStreamHTTPUploadData = {
          Moderate: {
            DUT: MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["DUT 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput,
            REF: MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["REF 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput,
          },
          Poor: {
            DUT: MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH01_TMO-dut_5G NSA_Multi Stream HTTP Upload for 30 seconds_Poor Coverage_DA Test"].Throughput,
            REF: MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH02_TMO-ref_5G NSA_UDP UMulti Stream HTTP Upload for 30 second_Poor Coverage_DA Test"].Throughput,
          },
        };

        const processPingData = (pingRawData) => {
          const moderateDUT = pingRawData.Moderate["5G NSA_25x64 bytes PING_moderate"][Object.keys(pingRawData.Moderate["5G NSA_25x64 bytes PING_moderate"])[0]]["Ping RTT"];
          const moderateREF = pingRawData.Moderate["5G NSA_25x64 bytes PING_moderate"][Object.keys(pingRawData.Moderate["5G NSA_25x64 bytes PING_moderate"])[1]]["Ping RTT"];
          const poorDUT = pingRawData.Poor["25x64 bytes PING (ICMP)"][Object.keys(pingRawData.Poor["25x64 bytes PING (ICMP)"])[0]]["Ping RTT"];
          const poorREF = pingRawData.Poor["25x64 bytes PING (ICMP)"][Object.keys(pingRawData.Poor["25x64 bytes PING (ICMP)"])[1]]["Ping RTT"];

          const calculateOverall = (valModerate, valPoor) => (valModerate + valPoor) / 2;

          return {
            average: {
              DUT: {
                Overall: calculateOverall(moderateDUT.avg, poorDUT.avg),
                Moderate: moderateDUT.avg,
                Poor: poorDUT.avg,
              },
              REF: {
                Overall: calculateOverall(moderateREF.avg, poorREF.avg),
                Moderate: moderateREF.avg,
                Poor: poorREF.avg,
              },
            },
            std_dev: {
              DUT: {
                Overall: calculateOverall(moderateDUT.std_dev, poorDUT.std_dev),
                Moderate: moderateDUT.std_dev,
                Poor: poorDUT.std_dev,
              },
              REF: {
                Overall: calculateOverall(moderateREF.std_dev, poorREF.std_dev),
                Moderate: moderateREF.std_dev,
                Poor: poorREF.std_dev,
              },
            },
            max: {
              DUT: {
                Overall: calculateOverall(moderateDUT.max, poorDUT.max),
                Moderate: moderateDUT.max,
                Poor: poorDUT.max,
              },
              REF: {
                Overall: calculateOverall(moderateREF.max, poorREF.max),
                Moderate: moderateREF.max,
                Poor: poorREF.max,
              },
            },
            min: {
              DUT: {
                Overall: calculateOverall(moderateDUT.min, poorDUT.min),
                Moderate: moderateDUT.min,
                Poor: poorDUT.min,
              },
              REF: {
                Overall: calculateOverall(moderateREF.min, poorREF.min),
                Moderate: moderateREF.min,
                Poor: poorREF.min,
              },
            },
          };
        };

        const pingData = processPingData(PingData);

        return (
          <>
            {/* DpNSAhttpSS table (Download) */}
            <DpNSAHttpSSTable data={singleStreamHTTPDownloadData} tableName="Single Stream HTTP Download" />
            {/* DpNSAhttpSS table (Upload) */}
            <DpNSAHttpSSTable data={singleStreamHTTPUploadData} tableName="Single Stream HTTP Upload" />
            {/* DpNSAhttpMS table (Download) */}
            <DpNSAHttpMSTable data={multiStreamHTTPDownloadData} tableName="Multi Stream HTTP Download" />
            {/* DpNSAhttpMS table (Upload) */}
            <DpNSAHttpMSTable data={multiStreamHTTPUploadData} tableName="Multi Stream HTTP Upload" />
            {/* DpNSAPing table */}
            <DpNSAPingTable data={pingData} tableName="Ping RTT" />
          </>
        );
      })()}
      <DpNSAUDPComponent />
    </div>
  );
}

export default DpNSAStationaryDetails;