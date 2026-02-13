# Pipeline Logic Documentation

This document outlines the logic used by the `ReportGenerator` pipeline to process data, calculate statistics, and handle fallbacks.

## 1. High-Level Routing Logic
The entry point is `pipeline.py`. It iterates through files and directories to determine the appropriate analyzer.

### File-Based Routing (`data_performance_statics.py`)
For individual CSV files (Data Performance, etc.), the `_determine_analysis_parameters` function decides the analysis type based on the filename and path:

| Analysis Type | Trigger Condition (Case-Insensitive) |
| :--- | :--- |
| **MRAB Performance** | Path contains `5g vonr mrab stationary` |
| **MHS Drive** | Path contains `5g auto data test mhs drive` |
| **Google Throughput** | Path contains `play-store app` |
| **Data Performance** | Path contains `5g auto dp` OR `5g nsa dp` |
| **N41 Coverage** | Path contains `5g n41 hpue coverage test` |
| **Coverage (Coord)** | Path contains `coverage` (fallback) |

### Protocol Detection
| Protocol | Trigger Condition |
| :--- | :--- |
| **WEB_PAGE** | Filename contains `web page` OR Path contains `web-kepler` / `kepler` |
| **HTTP** | Filename contains `http` |
| **UDP** | Filename contains `udp` |
| **PING** | Filename contains `ping` |

---

## 2. Detailed Statistic Logic

### A. Data Performance (`data_performance_statics.py`)

#### 1. Throughput (HTTP/UDP)
*   **Logic:** Detects "intervals" of active data transfer based on Start/End events. Calculates average throughput for each interval, then averages those averages.
*   **Start Event:** `Download Started` (HTTP DL), `Upload Started` (HTTP UL), `IPERF_T_Start` (UDP)
*   **End Event:** `Download Ended` (HTTP DL), `Upload Ended` (HTTP UL), `IPERF_T_End` (UDP)
*   **Filter:** Removes `0` and `NaN` values.

| Direction | Network | **Primary Header** | **Fallback Header 1** | **Fallback Header 2** |
| :--- | :--- | :--- | :--- | :--- |
| **DL** | 5G/NR | `[Call Test] [Throughput] Application DL TP` | `[NR5G] [(NR + LTE)] [Throughput] PDSCH TP` | `DL TP (excl. slow start)` |
| **DL** | LTE | `[LTE] [Data Throughput] [Downlink (All)] [PDSCH] PDSCH TP (Total)` | N/A | `DL TP (excl. slow start)` |
| **UL** | 5G/NR | `[Call Test] [Throughput] Application UL TP` | `[NR5G] [(NR + LTE)] [Throughput] PUSCH TP` | `UL Avg TP` |
| **UL** | LTE | `[LTE] [Data Throughput] [Uplink (All)] [PUSCH] PUSCH TP (Total)` | N/A | `UL Avg TP` |

#### 2. UDP Jitter & Error Ratio
*   **Logic:** Calculates average over intervals defined by `IPERF_T_Start` and `IPERF_T_End`.

| Metric | Direction | **Primary Header** |
| :--- | :--- | :--- |
| **Jitter** | DL | `[Call Test] [iPerf] [Throughput] DL Jitter` |
| **Jitter** | UL | `[Call Test] [iPerf] [Call Average] [Jitter and Error] UL Jitter` |
| **Error Ratio** | DL | `[Call Test] [iPerf] [Throughput] DL Error Ratio` |
| **Error Ratio** | UL | `[Call Test] [iPerf] [Call Average] [Jitter and Error] UL Error Ratio` |

#### 3. Web Page Load Time
*   **Logic:** Measures time between `HTTP Traffic Start` and `HTTP Traffic End`, accounting for `TIMEOUT_Idle`.
*   **Header:** `[Call Test] [HTTP] Total duration`
*   **Event:** `[Event] [Data call test detail events] HTTP Call Event`

#### 4. Ping RTT
*   **Logic:** Calculates statistics (Mean, Min, Max, StdDev).
*   **Header:** `[Call Test] [PING] [RTT] RTT`

---

### B. Call Performance (`call_analyze.py`)

#### 1. Call Attempts & Result
*   **Logic:** Counts rows where `[Call Test] Call Type` contains "Voice". Excludes sections marked with `603 Declined` status.
*   **Headers:**
    *   `[Call Test] Call Type` (Filter: "Voice")
    *   `[Call Test] Call Result` (Aggregation target)

#### 2. Call Setup Time
*   **Logic:** Tries 3 methods in order (similar to WFC).
    1.  **Header:** `[Call Test] [VoNR VoLTE] [Duration] SIP Setup Duration (Invite~200OK)`
    2.  **Event Diff:** `[UE] Voice - Setup Success` time minus `[UE] Voice - Orig Success` time.
    3.  **Event Diff:** `[Tool] Voice - Answer Request` time minus `[Tool] Voice - Call Scheduling Start(Term)` time.

---

### C. Voice Quality (`VoiceQuality` folder)

#### 1. AMR NB / WB
*   **Logic:** Calculates MOS statistics (Mean, % < 2.0, % < 3.0).
*   **UL Header:** `[Call Test] [Voice Quality] [UL MOS] MOS`
*   **DL Header:** `[Call Test] [Voice Quality] [Per Rx Clip] MOS Value`

#### 2. EVS WB
*   **Logic:** Calculates MOS statistics.
*   **Header:** `[Call Test] [Voice Quality] [Per Rx Clip] MOS Value`

#### 3. Audio Delay
*   **Logic:** Calculates statistics for audio delay.
*   **Header:** `[Call Test] [Audio] [Delay] Round Trip Delay`

---

### D. Coverage Performance (`Coverage` folder)

#### 1. N41 Coverage (`n41_coverage_analyzer.py`)
*   **Logic:** Extracts RSRP and Tx Power at the location of specific "No Service" events (looking upwards for data).
*   **Filtering:** Rows with `Tx Power == 0` or matching **HPUE Limits** are removed:
    *   **PC2 Devices:** Tx Power > 26 dBm is removed.
    *   **PC3 Devices:** Tx Power > 24 dBm is removed.

| Metric | **Primary Header** | **Fallback Header** |
| :--- | :--- | :--- |
| **RSRP** | `[NR5G] [RF] RSRP` | N/A |
| **Tx Power**| `[NR5G] [Power] Tx power (PUSCH Actual)` | `[NR5G] [Power] Tx power (Total)` |

#### 2. Secondary KPIs (`coverage_secondary_kpi_analyzer.py`)
*   **Logic:** Segments data into First 30%, Middle 40%, Last 30% relative to a "No Service" cut-off.
*   **Path Logic:** If path contains "Coverage" AND "LTE", forces LTE headers.

| Metric | **Primary Header (5G)** | **LTE Context Header** |
| :--- | :--- | :--- |
| **BLER** | `[NR5G] [BLER & HARQ] PDSCH BLER` | `[LTE] [L1] [BLER] PDSCH BLER` |
| **MCS** | `[NR5G] [PCC] [PUSCH] [Modulation] MCS (Avg)` | `[LTE-A] [PCell] [L1] [MCS] DL MCS (TB0 & TB1 - Avg)` |
| **Tx Power**| `[NR5G] [Power] Tx power (Total)` | `[LTE] [Power] [Tx Power] Tx power (PUSCH Total)` |

---

### E. MRAB Performance (`mrab_performance_analyzer.py`)

*   **Logic:** Identifies "Pre Call", "In Call", "Post Call" intervals based on 3-cycle grouping of data bursts.
*   **Header:** `[Call Test] [Throughput] Application DL TP`

---

### F. Google Throughput (`DataPerformance/google_throughput_analyzer.py`)

*   **Logic:** Identifies intervals where **Throughput > 2 Mbps**. Ends interval after 3 consecutive values < 2 Mbps.
*   **Header Search Order:**
    1.  `[Call Test] [Throughput] Application DL TP`
    2.  `[NR5G] [(NR + LTE)] [Throughput] PDSCH TP`
    3.  `[NR5G] [Throughput] PDSCH TP`
    4.  `[LTE] [Data Throughput] [Downlink (All)] [PDSCH] PDSCH TP (Total)`
    5.  *Fuzzy Match:* Any column containing "throughput", "dl tp", or "ul tp".

---

### G. MHS Drive Performance (`DataPerformance/mhs_drive_analyzer.py`)

*   **Logic:** Same as Data Performance (Throughput, Jitter, Error Ratio) but specifically for MHS contexts.
*   **Ping RTT:** Extracted directly from MHS CSV.
*   **Ping Header:** `[Call Test] [PING] [RTT] RTT`

---

### H. WFC Performance (`wfc_performance_analyzer.py`)

#### 1. MOS
*   **Logic:** Average of standard MOS headers.
*   **Primary:** `[Call Test] [Voice Quality] [Per Rx Clip] MOS Value`
*   **Secondary:** `[Call Test] [Voice Quality] [Sampled Values] MOS (POLQA)`

#### 2. Setup Time
*   **Logic:** Tries 3 methods in order.
    1.  **Header:** `[Call Test] [VoNR VoLTE] [Duration] SIP Setup Duration (Invite~200OK)`
    2.  **Event Diff:** `[UE] Voice - Setup Success` time minus `[UE] Voice - Orig Success` time.
    3.  **Event Diff:** `[Tool] Voice - Answer Request` time minus `[Tool] Voice - Call Scheduling Start(Term)` time.

#### 3. RSSI
*   **Header:** `[WiFi] [Serving AP] RSSI`

#### 4. RSRP
*   **Primary:** `[Call Test] [Voice Quality] [Per Rx Clip] [RF Quality] 5G RSRP`
*   **Fallback:** `[NR5G] [RF] RSRP`

#### 5. Handover Count
*   **Logic:** Counts transitions between "NR" and "IWLAN" in `[Mobile Info] [Android] [Radio] Network Type (Data Svc)`.
