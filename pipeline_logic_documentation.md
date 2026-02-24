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
| **HTTP** | Filename contains `http` OR Path contains `play-store app` |
| **UDP** | Filename contains `udp` OR Filename/Path contains `mobility` |
| **PING** | Filename contains `ping` |

---

## 2. Detailed Statistic Logic

### A. Data Performance (`data_performance_statics.py`)

#### 1. Throughput (HTTP/UDP)
*   **Logic:** Detects "intervals" of active data transfer based on Start/End events. Calculates average throughput for each interval, then averages those averages.
*   **Direction Logic:** If not found in filename, checks parent directories. Defaults to **UL** for `mobility`/`drive` paths if ambiguous.
*   **Start Event:** `Download Started` (HTTP DL), `Upload Started` (HTTP UL), `IPERF_T_Start` (UDP)
*   **End Event:** `Download Ended` (HTTP DL), `Upload Ended` (HTTP UL), `IPERF_T_End` (UDP)
*   **Filter:** Removes `0` and `NaN` values.

| Direction | Network | **Primary Header** | **Fallback Header 1** | **Fallback Header 2** |
| :--- | :--- | :--- | :--- | :--- |
| **DL** | 5G/NR | `[Call Test] [Throughput] Application DL TP` | `[NR5G] [(NR + LTE)] [Throughput] PDSCH TP` | `DL TP (excl. slow start)` |
| **DL** | LTE | `[LTE] [Data Throughput] [Downlink (All)] [PDSCH] PDSCH TP (Total)` | N/A | `DL TP (excl. slow start)` |
| **UL** | 5G/NR | `[Call Test] [Throughput] Application UL TP` | `[NR5G] [Throughput] PUSCH TP` | `UL Avg TP` |
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
*   **Logic:** Extracts RSRP and Tx Power at the location of specific "No Service" events.
*   **Filtering:** Rows with `Tx Power == 0` or matching **HPUE Limits** are removed:
    *   **PC2 Devices:** Tx Power > 26 dBm is removed.
    *   **PC3 Devices:** Tx Power > 24 dBm is removed.

| Metric | **Primary Header** | **Fallback Header** |
| :--- | :--- | :--- |
| **RSRP** | `[NR5G] [RF] RSRP` | N/A |
| **Tx Power**| `[NR5G] [Power] Tx power (PUSCH Actual)` | `[NR5G] [Power] Tx power (Total)` |

#### 2. Secondary KPIs (`coverage_secondary_kpi_analyzer.py`)
*   **Logic:** Segments data into First 30%, Middle 40%, Last 30% relative to a "No Service" cut-off.
*   **Tx Power Logic:** Uses fuzzy search with the following priority (case-insensitive):
    1. `tx power (pusch actual)`
    2. `tx power (total)`
    3. `tx power (total actual)`
    *   (In LTE context, tries `[LTE] [Power] [Tx Power] Tx power (PUSCH Total)` first).

| Metric | **Primary Header (5G)** | **LTE Context Header** |
| :--- | :--- | :--- |
| **BLER** | `[NR5G] [BLER & HARQ] PDSCH BLER` | `[LTE] [L1] [BLER] PDSCH BLER` |
| **MCS** | `[NR5G] [PCC] [PUSCH] [Modulation] MCS (Avg)` | `[LTE-A] [PCell] [L1] [MCS] DL MCS (TB0 & TB1 - Avg)` |
| **Tx Power**| Fuzzy Priority: `PUSCH Actual` > `Total` > `Total Actual` | `[LTE] [Power] [Tx Power] Tx power (PUSCH Total)` |

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
    5.  *Fuzzy Match:* Header contains `throughput`, `dl tp`, or `ul tp`.

---

### G. MHS Drive Performance (`DataPerformance/mhs_drive_analyzer.py`)

*   **Logic:** Same as Data Performance (Throughput, Jitter, Error Ratio) but specifically for MHS contexts.
*   **Ping RTT:** Extracted directly from MHS CSV.
*   **Ping Header:** `[Call Test] [PING] [RTT] RTT`

---

### H. WFC Performance (`wfc_performance_analyzer.py`)

*   **TC Determination**: Test Case (TC) is extracted from the filename (e.g., `TC-164` or `TC164`). Fallback to parent directory name if not found in filename.
*   **Category (MO/MT) Determination**:
    *   **Device**: `DUT` (default) or `REF` if "REF" is in filename.
    *   **Direction**: Identified by `MO` or `MT` keywords.
    *   **Flexible Delimiters**: The analyzer use a robust regex `r'(?:[^a-zA-Z0-9]|^)(MO|MT)(?:[^a-zA-Z0-9]|$)'`. This supports `MO`/`MT` surrounded by ANY non-alphanumeric character (e.g., `_`, `-`, ` `, `.`, `[`).
    *   > [!NOTE]
    *   > **TC151 Improvement**: Filenames like `SEA DUT MO_TC-151.csv` are now correctly identified as `DUT MO`.
*   **Logic**: Aggregates data from multiple CSV files/runs for the same TC and Category. 
*   **Excluded Directories**: Skips `MOS PATCH` directory if present (standard analysis is used for all).
*   **Handover Count**: Specifically for **TC >= 162**, counts transitions between `NR` and `IWLAN` in the network type header.

| Metric | logic/Header |
| :--- | :--- |
| **MOS** | Average of `[Per Rx Clip] MOS Value` (Primary) or `[Sampled Values] MOS (POLQA)` (Secondary). |
| **IP Impairments MOS** | Specifically for **TC171-TC179**. Finds the first relevant network transition (e.g., `IWLAN` -> `NR`). Averages MOS for the **last 10 samples** of the preceding block (`mos_before_handover_average`) and the **first 10 samples** of the succeeding block (`mos_after_handover_average`). Also extracts the first valid **Mouth to Ear Delay** sample immediately after the handover (`handover_impact_delay`). Missing Network Type values are forward-filled. |
| **Setup Time** | Tries 1. `SIP Setup Duration` header, 2. `Setup Success` - `Orig Success` event diff, 3. `Answer Request` - `Scheduling Start` event diff. |
| **Call Performance** | Calculates `Total attempts`, `Failures (Orig/Drop)`, and `Successes` for MO calls. |
| **P-Value** | Calculates p-values for MO Initiation and MO Retention using Fisher's Exact test (comparing DUT MO vs REF MO). |
| **RSSI** | `[WiFi] [Serving AP] RSSI` |
| **RSRP** | `[Per Rx Clip] [RF Quality] 5G RSRP` (Primary) or `[NR5G] [RF] RSRP` (Fallback). |

---

### I. WFC Line Chart Post-Processing (`WfcLineChartAnalyzer.py`)

*   **Logic**: Executed during pipeline post-processing. Groups WFC files by TC and generates statistical distributions.
*   **TC164+ Special Handling**: For **TC >= 164**, data is grouped by `DUT`/`REF` only (no MO/MT separation). For older TCs, MO/MT separation is maintained.
*   **MO/MT Detection**: Both MOS and RSSI charts now use a consistent, robust regex to identify MO/MT, supporting various delimiters including spaces.
*   **MOS Line Chart**: Bins MOS values into intervals (e.g., `< 2.0`, `[2.0, 2.1)`, ..., `[4.4, 4.5)`, `>= 4.5`) and calculates percentages.
*   **RSSI Line Chart**: 
    1. Bins RSSI values (e.g., `< -100`, `[-100, -98)`, ..., `[-32, -30)`, `>= -30`).
    2. Exports raw RSSI samples to a corresponding CSV file for detailed analysis.

---

## 3. Filename Naming Conventions (`rules.py`)

The pipeline uses token-based matching to validate and classify files. Standard tokens include:

| Category | Options |
| :--- | :--- |
| **Operator** | `TMO`, `ATT`, `VZW` |
| **Network** | `SA`, `LTE`, `VONR ON`, `VONR OFF`, `5G AUTO`, `5G NSA` |
| **City** | `SEA`, `NY` |
| **Device** | `DUT` (CH01), `REF` (CH02) |
| **Location** | `L1` (Good), `L2` (Moderate), `L3` (Poor) |
| **Band** | `N41`, `N25`, `N71` |
| **VQ Mode** | `BASE`, `MOBILE` |

### WFC Specific Naming
For WFC tests, the filename should ideally follow:
`{Operator}_{Network}_WFC_{Device}-{Direction}_TC-{Number}.csv`
Example: `TMO_5G_WFC_DUT-MO_TC-151.csv`

> [!TIP]
> **Supported Delimiters**: The pipeline now supports any non-alphanumeric character as a delimiter for `MO`/`MT` (e.g., `DUT MO`, `DUT_MO`, `DUT-MO`).
