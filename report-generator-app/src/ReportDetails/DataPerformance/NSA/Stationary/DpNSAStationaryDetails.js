import React from 'react';
import DpNSAHttpMSTable from './Table/DpNSAHttpMSTable';
import DpNSAHttpSSTable from './Table/DpNSAHttpSSTable';
import DpNSAPingTable from './Table/DpNSAPingTable';
import processPingData from './NSAPingData';
import DpHistogramComponent from '../../DpHistogramComponent';
import MultiStreamHTTPData from '../../../../DataFiles/NSA/DpStationaryResults/Multi Stream HTTP.json';
import SingleStreamHTTPData from '../../../../DataFiles/NSA/DpStationaryResults/Single Stream HTTP.json';
import PingData from '../../../../DataFiles/NSA/DpStationaryResults/Ping.json';
import DpNSAUDPComponent from './DpNSAUDPComponent';

function DpNSAStationaryDetails() {
  const pingData = processPingData(PingData);
  return (
    <div className='page-content'>
      <h2>NSA Stationary Data Performance Details</h2>
      {/* Data processing and table rendering for HTTP and Ping */}
      {/* Single Stream HTTP Download Table */}
      <DpNSAHttpSSTable
        data={{
          Moderate: {
            DUT: SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["DUT_Single Stream HTTP Download for 60 seconds"].Throughput,
            REF: SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["REF Single Stream HTTP Download for 60 seconds"].Throughput,
          },
          Poor: {
            DUT: SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["DUT HTTP DL"].Throughput,
            REF: SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["REF HTTP DL"].Throughput,
          },
        }}
        tableName="Single Stream HTTP Download"
      />

      {/* Single Stream HTTP Upload Table */}
      <DpNSAHttpSSTable
        data={{
          Moderate: {
            DUT: SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput,
            REF: SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput,
          },
          Poor: {
            DUT: SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput,
            REF: SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput,
          },
        }}
        tableName="Single Stream HTTP Upload"
      />

      {/* Multi Stream HTTP Download Table */}
      <DpNSAHttpMSTable
        data={{
          Moderate: {
            DUT: MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput,
            REF: MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput,
          },
          Poor: {
            DUT: MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput,
            REF: MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput,
          },
        }}
        tableName="Multi Stream HTTP Download"
      />

      {/* Multi Stream HTTP Upload Table */}
      <DpNSAHttpMSTable
        data={{
          Moderate: {
            DUT: MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["DUT 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput,
            REF: MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["REF 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput,
          },
          Poor: {
            DUT: MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH01_TMO-dut_5G NSA_Multi Stream HTTP Upload for 30 seconds_Poor Coverage_DA Test"].Throughput,
            REF: MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH02_TMO-ref_5G NSA_UDP UMulti Stream HTTP Upload for 30 second_Poor Coverage_DA Test"].Throughput,
          },
        }}
        tableName="Multi Stream HTTP Upload"
      />
      <DpNSAPingTable data={pingData} tableName="Ping RTT" />
      <DpNSAUDPComponent />
    </div>
  );
}

export default DpNSAStationaryDetails;