# Pipeline Logic Documentation

This document outlines the logic used by the `ReportGenerator` pipeline to process data, calculate statistics, and handle fallbacks.

## 1. High-Level Routing Logic
The entry point is `pipeline.py`. It auto-discovers projects and markets, then iterates through files and directories to determine the appropriate analyzer based on path and filename patterns.

### Project & Market Auto-Discovery
- **Project Discovery**: Scans `[base_raw_data_dir]` for folders starting with `#` (e.g., `#ProjectName`)
- **Market Discovery**: For each project folder, scans subfolders and filters against a whitelist in `config.yaml` (`markets` key)
- **Directory Structure**:
  - With Project: `[base_raw_data_dir]/[Project]/[Market]`
  - Without Project: `[base_raw_data_dir]/[Market]`

### Excluded Analysis Types (File-Level)
The following analysis types are processed as directory-level analysis only (individual CSV files in these categories are skipped):
- `call_performance`
- `voice_quality_combined`
- `coverage_coordinate`
- `n41_coverage`
- `vonr_coverage_performance`
- `google_throughput_analysis`
- `mhs_drive_performance`
- `wfc_performance`

### Directory-Based Routing (config.yaml)
For folder-level analysis types, the pipeline uses configuration from `config.yaml`:

| Analysis Type | Trigger Condition (Path - Case-Insensitive) |
| :--- | :--- |
| **MRAB Performance** | Path contains `5g vonr mrab stationary` |
| **MHS Drive** | Path contains `5g auto data test mhs drive` |
| **Google Throughput** | Path contains `play-store app` |
| **Data Performance** | Path contains `5g auto dp` OR `5g nsa dp` |
| **N41 Coverage** | Path contains `5g n41 hpue coverage test` |
| **VoNR Coverage** | Path contains `5g vonr coverage test` |
| **VoNR Coverage Performance** | Directory config: `vonr_coverage_performance` |
| **LTE Coverage** | Path contains `lte coverage test` |
| **Coverage (Coord)** | Path contains `coverage performance` |
| **Voice Quality** | Path contains `voice quality` |
| **WFC** | Path contains `wfc` |
| **Call Performance** | Path contains `call performance` |

### Protocol Detection (Data Performance Files)
| Protocol | Trigger Condition |
| :--- | :--- |
| **WEB_PAGE** | Filename contains `web page` OR Path contains `web-kepler` / `kepler` |
| **HTTP** | Filename contains `http` OR Path contains `play-store app` |
| **UDP** | Filename contains `udp` OR Filename/Path contains `mobility` |
| **PING** | Filename contains `ping` |

### Device Detection Priority (File-Level Analysis)
When grouping CSV files for analysis, the pipeline determines device type using this priority order:
1. **PCx Match** (Highest Priority): Regex `PC(\d+)` matches anywhere in filename → Maps to `PC2`, `PC3`, etc.
2. **Explicit DUT/REF at End**: Regex `_(DUT|REF)_\.CSV$` matches at end of filename
3. **General DUT/REF**: First occurrence of `DUT` or `REF` in filename
4. **Channel Number Fallback** (Lowest Priority):
   - `CH01` → `REF`
   - `CH02` → `DUT`

---

## 2. Detailed Statistic Logic

### A. Data Performance (`data_performance_statics.py`)

#### Path Rules
| Path Pattern | Analysis Type |
| :--- | :--- |
| Path contains `5g vonr mrab stationary` | MRAB Performance |
| Path contains `5g auto data test mhs drive` | MHS Drive |
| Path contains `play-store app` | Google Throughput |
| Path contains `5g auto dp` OR `5g nsa dp` | Data Performance |
| Path contains `5g n41 hpue coverage test` | N41 Coverage |

#### Filename Rules
| Pattern | Description |
| :--- | :--- |
| `DUT`, `REF` | Device type in filename |
| `DL`, `UL` | Direction (Downlink/Uplink) in filename |
| `web page` | Web Page protocol |
| `http` | HTTP protocol |
| `udp` | UDP protocol |
| `ping` | PING protocol |
| `_dp`, `_drive`, `_mhs` | Test type suffix |

#### 1. Throughput (HTTP/UDP)
*   **Logic:** Detects "intervals" of active data transfer based on Start/End events. Calculates average throughput for each interval, then averages those averages.
*   **Direction Logic:** If not found in filename, checks parent directories. Defaults to **UL** for `mobility`/`drive` paths if ambiguous.
*   **Start Event:** `Download Started` (HTTP DL), `Upload Started` (HTTP UL), `IPERF_T_Start` (UDP)
*   **End Event:** `Download Ended` (HTTP DL), `Upload Ended` (HTTP UL), `IPERF_T_End` (UDP)
*   **Filter:** Removes `0` and `NaN` values.

#### Header Search Order
The pipeline uses a 4-tier header search strategy:
1. **Primary Header**: Exact match for the standard header
2. **Fallback Header 1**: Alternative standard header
3. **Fallback Header 2**: Third alternative header
4. **Fuzzy Match**: Case-insensitive search for headers containing key terms (e.g., `throughput`, `dl tp`, `ul tp`)

| Direction | Network | **Primary Header** | **Fallback Header 1** | **Fallback Header 2** | **Fuzzy Match** |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DL** | 5G/NR | `[Call Test] [Throughput] Application DL TP` | `[NR5G] [(NR + LTE)] [Throughput] PDSCH TP` | `DL TP (excl. slow start)` | Contains `dl tp` or `throughput` |
| **DL** | LTE | `[LTE] [Data Throughput] [Downlink (All)] [PDSCH] PDSCH TP (Total)` | N/A | `DL TP (excl. slow start)` | Contains `dl tp` or `throughput` |
| **UL** | 5G/NR | `[Call Test] [Throughput] Application UL TP` | `[NR5G] [Throughput] PUSCH TP` | `UL Avg TP` | Contains `ul tp` or `throughput` |
| **UL** | LTE | `[LTE] [Data Throughput] [Uplink (All)] [PUSCH] PUSCH TP (Total)` | N/A | `UL Avg TP` | Contains `ul tp` or `throughput` |

#### 2. CDF Analysis
*   **Logic:** Calculates Cumulative Distribution Function for throughput values.
*   **Binning:** Data is binned into intervals (e.g., `< 10 Mbps`, `[10-20)`, `[20-30)`, ..., `>= 100 Mbps`).
*   **Percentiles:** Computes 25th (Q1), 50th (median), and 75th (Q3) percentile values.

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

### B. Call Performance (`call_performance_analyzer.py` / `call_analyze.py`)

#### Path & Directory Structure
*   **Main Folder**: `Call Performance`
*   **Expected Structure**:
    ```
    Call Performance/
    ├── {Scenario_Name}/
    │   ├── DUT/
    │   │   └── *.csv
    │   └── REF/
    │       └── *.csv
    ```

#### Filename Rules
| Pattern | Description |
| :--- | :--- |
| All `.csv` files in DUT/REF folders | Process all CSV files |
| No specific filename keywords required | Uses CSV content for filtering |

#### Device Detection
| Pattern | Maps To |
| :--- | :--- |
| Subfolder named `DUT` | Device Under Test |
| Subfolder named `REF` | Reference Device |

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

#### Call Result Categories
| Category | Description |
| :--- | :--- |
| Initiation Failures | `Orig. Fail` |
| Retention Failures | `Drop` |

---

### C. Voice Quality (`VoiceQuality` folder / `voice_quality_analyzer.py`)

#### Path & Directory Structure
*   **Main Folder**: `Voice Quality`
*   **Expected Structure**:
    ```
    Voice Quality/
    ├── 5G Auto VoNR Enabled AMR NB VQ/
    │   ├── DUT/ or DUT1/ or DUT2/
    │   └── REF/ or REF1/ or REF2/
    ├── 5G Auto VoNR Enabled AMR WB VQ/
    │   ├── DUT/ or DUT1/ or DUT2/
    │   └── REF/ or REF1/ or REF2/
    ├── 5G Auto VoNR Enabled EVS WB VQ/
    │   ├── Base/
    │   │   ├── DUT/ or DUT1/ or DUT2/
    │   │   └── REF/ or REF1/ or REF2/
    │   └── Mobile/
    │       ├── DUT/ or DUT1/ or DUT2/
    │       └── REF/ or REF1/ or REF2/
    ├── 5G Auto VoNR Disabled EVS WB VQ/
    │   ├── Base/
    │   └── Mobile/
    └── Audio Delay/
        ├── 5G Auto VoNR Enabled Audio Delay/
        └── 5G Auto VoNR Disabled Audio Delay/
    ```

#### Subfolder Routing
| Subfolder Keyword | Analysis Type |
| :--- | :--- |
| `5G Auto VoNR Enabled AMR NB VQ` | AMR Narrowband (NB) |
| `5G Auto VoNR Enabled AMR WB VQ` | AMR Wideband (WB) |
| `EVS WB VQ` | EVS Wideband |
| `Audio Delay` | Audio Delay |
| `Base` (subfolder) | BASE scenario (Stationary) |
| `Mobile` (subfolder) | MOBILE scenario (Mobility) |

#### Filename Rules
| Pattern | Description |
| :--- | :--- |
| `DUT`, `DUT1`, `DUT2` | Device Under Test (PC2) |
| `REF`, `REF1`, `REF2` | Reference Device (PC3) |
| Regex: `r'(DUT[12]|REF[12]?)'` | Device identifier pattern |
| Naming format: `vonr <enable\|disable> <codec> <device> <base\|mobile>` | React key naming convention |

#### 1. AMR NB / WB
*   **Logic:** Calculates MOS statistics (Mean, % < 2.0, % < 3.0).
*   **Header Fallback Logic (NB/WB):**
    1. Primary: `[Call Test] [Voice Quality] [UL MOS] MOS`
    2. Fallback: `[Call Test] [Voice Quality] [Per Rx Clip] MOS Value`
    3. Secondary: `[Call Test] [Voice Quality] [Sampled Values] MOS (POLQA)`

#### 2. EVS WB
*   **Logic:** Calculates MOS statistics.
*   **Scenario Detection:** The analyzer distinguishes between **BASE** and **MOBILE** scenarios based on the filename or path:
    *   **BASE**: Stationary test conditions (path contains `Base`)
    *   **MOBILE**: Mobility test conditions (path contains `Mobile`)
*   **Header:** `[Call Test] [Voice Quality] [Per Rx Clip] MOS Value`

#### 3. Audio Delay
*   **Logic:** Calculates statistics for audio delay.
*   **Headers:**
    *   Primary: `[Call Test] [Audio] [Delay] Round Trip Delay`
    *   Secondary: `[Call Test] [Voice Quality] [Per Rx Clip] Mouth to Ear Delay (Avg)`

---

### D. Coverage Performance (`Coverage` folder / `coverage_performance_analyzer.py`)

#### Path & Directory Structure
*   **Main Folders**:
    *   `Coverage Performance` (generic)
    *   `Coverage Performance/5G n41 HPUE Coverage Test`
    *   `Coverage Performance/5G VoNR Coverage Test`
    *   `Coverage Performance/LTE Coverage Test`

#### Path Routing
| Path | Analysis Type |
| :--- | :--- |
| `Coverage Performance` | Coverage Coordinate |
| `Coverage Performance/5G n41 HPUE Coverage Test` | N41 Coverage |
| `Coverage Performance/5G VoNR Coverage Test` | VoNR Coverage |
| `Coverage Performance/LTE Coverage Test` | LTE Coverage |

#### Filename Rules
| Pattern | Description |
| :--- | :--- |
| `DUT`, `DUT1`, `DUT2` | PC2 Device (Power Class 2) |
| `REF`, `REF1`, `REF2` | PC3 Device (Power Class 3) |
| `PC2`, `PC3` | Power Class direct match |
| `CH01`, `CH02`, `CH1`, `CH2` | Channel number (odd=REF, even=DUT) |
| `N25`, `N41`, `N71` | NR Band identifiers |
| `B66`, `B2`, `B4` | LTE Band identifiers |
| `Run1`, `Run2`, `Run3`... | Run identification |
| Regex: `r'(DUT\d*|REF\d*|PC\d*)'` | Device identifier pattern |
| Regex: `r'(DUT|REF|CH(\d+))'` | Channel-based matching |
| Example: `_20260125_CH01_TMO_5GNR_Coverage_DUT-N25_R1.csv` | File naming format |

#### Technology Mode Detection
| Mode | Detection | Headers Used |
| :--- | :--- | :--- |
| **5G/NR** | Default | `[NR5G] [RF] RSRP`, `[NR5G] [Power] Tx power...` |
| **LTE** | Path contains `lte` | `[LTE] [L1] BLER`, `[LTE] [Power] Tx Power...` |

#### 1. N41 Coverage (`n41_coverage_analyzer.py`)
*   **Logic:** Extracts RSRP and Tx Power at the location of specific "No Service" events.
*   **UL TP Search Logic:** After identifying a "No Service" event, the analyzer searches **upwards** (earlier rows) to find the first valid UL throughput sample > 1 Mbps. This determines the coverage edge.
*   **HPUE Filtering Rules:** Rows with `Tx Power == 0` or matching HPUE power limits are removed:
    *   **PC2 Devices:** Tx Power > 26 dBm is removed.
    *   **PC3 Devices:** Tx Power > 24 dBm is removed.

| Metric | **Primary Header** | **Fallback Header** |
| :--- | :--- | :--- |
| **RSRP** | `[NR5G] [RF] RSRP` | N/A |
| **Tx Power**| `[NR5G] [Power] Tx power (PUSCH Actual)` | `[NR5G] [Power] Tx power (Total)` |
| **UL TP** | `[Call Test] [Throughput] Application UL TP` | `[NR5G] [Throughput] PUSCH TP` |

#### 2. Secondary KPIs (`coverage_secondary_kpi_analyzer.py`)
*   **Logic:** Segments data into First 30%, Middle 40%, Last 30% relative to a "No Service" cut-off.
*   **Tx Power Fuzzy Search Priority:**
    1. `tx power (pusch actual)`
    2. `tx power (total)`
    3. `tx power (total actual)`
    *   (In LTE context, tries `[LTE] [Power] [Tx Power] Tx power (PUSCH Total)` first).

| Metric | **Primary Header (5G)** | **LTE Context Header** |
| :--- | :--- | :--- |
| **BLER** | `[NR5G] [BLER & HARQ] PDSCH BLER` | `[LTE] [L1] [BLER] PDSCH BLER` |
| **MCS** | `[NR5G] [PCC] [PUSCH] [Modulation] MCS (Avg)` | `[LTE-A] [PCell] [L1] [MCS] DL MCS (TB0 & TB1 - Avg)` |
| **Tx Power**| Fuzzy Priority: `PUSCH Actual` > `Total` > `Total Actual` | `[LTE] [Power] [Tx Power] Tx power (PUSCH Total)` (or `Tx power (Total)`) |

---

### E. MRAB Performance (`mrab_performance_analyzer.py`)

*   **Logic:** Identifies "Pre Call", "In Call", "Post Call" intervals based on 3-cycle grouping of data bursts.
*   **Header:** `[Call Test] [Throughput] Application DL TP`

---

### F. Google Throughput (`DataPerformance/google_throughput_analyzer.py`)

*   **Logic:** Identifies intervals where **Throughput > 2 Mbps**. Ends interval after 3 consecutive values < 2 Mbps. Excludes `0` values from the interval average calculation.
*   **Header Search Order:**
    1.  `[WiFi] [MPTCP] [Throughput] [Downlink] Android (Mobile + WiFi) DL Throughput`
    2.  `[Call Test] [Throughput] Application DL TP`
    3.  `[NR5G] [(NR + LTE)] [Throughput] PDSCH TP`
    4.  `[NR5G] [Throughput] PDSCH TP`
    5.  `[LTE] [Data Throughput] [Downlink (All)] [PDSCH] PDSCH TP (Total)`
    6.  *Fuzzy Match:* Header contains `throughput`, `dl tp`, or `ul tp`.

---

### G. MHS Drive Performance (`DataPerformance/mhs_drive_analyzer.py`)

*   **Logic:** Same as Data Performance (Throughput, Jitter, Error Ratio) but specifically for MHS contexts.
*   **Ping RTT:** Extracted directly from MHS CSV.
*   **Ping Header:** `[Call Test] [PING] [RTT] RTT`

---

### H. WFC Performance (`wfc_performance_analyzer.py`)

#### Path & Directory Structure
*   **Main Folder**: `WFC`
*   **Expected Structure**:
    ```
    WFC/
    ├── TC150/
    │   ├── DUT/
    │   │   └── *.csv
    │   └── REF/
    │       └── *.csv
    ├── TC151/
    │   ├── DUT-MO/
    │   │   └── *.csv
    │   ├── DUT-MT/
    │   │   └── *.csv
    │   ├── REF-MO/
    │   │   └── *.csv
    │   └── REF-MT/
    │       └── *.csv
    └── TC164+/
        ├── DUT/
        │   └── *.csv
        └── REF/
            └── *.csv
    ```

#### Path Rules
| Path Pattern | Description |
| :--- | :--- |
| Path contains `WFC` | Triggers WFC Performance analysis |
| TC subdirectories (e.g., `TC150`, `TC151`) | Groups files by Test Case number |

#### Filename Rules
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
| **MOS** | Primary: `[Per Rx Clip] MOS Value`<br>Secondary: `[Sampled Values] MOS (POLQA)` |
| **IP Impairments MOS** | Specifically for **TC171-TC179**. Finds the first relevant network transition (e.g., `IWLAN` -> `NR`).<br>- **Before Block**: Averages MOS for the **last 10 samples** of the preceding block (`mos_before_handover_average`)<br>- **After Block**: Averages MOS for the **first 10 samples** of the succeeding block (`mos_after_handover_average`)<br>- **Handover Impact Delay**: Extracts the first valid **Mouth to Ear Delay** sample immediately after the handover.<br>Missing Network Type values are forward-filled. |
| **Delay** | Primary: `[Call Test] [Audio] [Delay] Round Trip Delay`<br>Secondary: `[Call Test] [Voice Quality] [Per Rx Clip] Mouth to Ear Delay (Avg)` |
| **Setup Time** | Tries 1. `SIP Setup Duration` header, 2. `Setup Success` - `Orig Success` event diff, 3. `Answer Request` - `Scheduling Start` event diff. |
| **Call Performance** | Calculates `Total attempts`, `Failures (Orig/Drop)`, and `Successes` for MO calls. |
| **P-Value** | Calculates p-values for MO Initiation and MO Retention using Fisher's Exact test (comparing DUT MO vs REF MO). |
| **RSSI** | `[WiFi] [Serving AP] RSSI` |
| **RSRP** | Primary: `[Call Test] [Voice Quality] [Per Rx Clip] [RF Quality] 5G RSRP`<br>Fallback: `[NR5G] [RF] RSRP` |

---

### I. WFC Line Chart Post-Processing (`WfcLineChartAnalyzer.py`)

*   **Logic**: Executed during pipeline post-processing. Groups WFC files by Test Case (TC) and generates statistical distributions.
*   **TC162+ Special Handling**: For **TC >= 162**, data is grouped by `DUT`/`REF` only (no MO/MT separation). For older TCs, MO/MT separation is maintained.
*   **MO/MT Detection**: Both MOS and RSSI charts now use a consistent, robust regex to identify MO/MT, supporting various delimiters including spaces.
*   **MOS Line Chart**: Bins MOS values into intervals (e.g., `< 2.0`, `[2.0, 2.1)`, ..., `[4.4, 4.5)`, `>= 4.5`) and calculates percentages.
*   **RSSI Line Chart**: 
    1. Bins RSSI values (e.g., `< -100`, `[-100, -98)`, ..., `[-32, -30)`, `>= -30`).
    2. Exports raw RSSI samples to a corresponding CSV file for detailed analysis.

---

## 3. Post-Processing Steps
After the main analysis, the pipeline executes additional post-processing steps:

### A. VQ Line Chart Data
- **Input**: Voice Quality CSV files from specific EVS WB VQ scenarios
- **Scenarios Processed**:
  - `5G Auto VoNR Disabled EVS WB VQ/Base`
  - `5G Auto VoNR Disabled EVS WB VQ/Mobile`
  - `5G Auto VoNR Enabled EVS WB VQ/Base`
  - `5G Auto VoNR Enabled EVS WB VQ/Mobile`
- **Output**: JSON files in `vq_linechart_data/` with MOS statistics (binned distributions)

### B. WFC Line Chart Data
- **Input**: All WFC CSV files grouped by Test Case (TC)
- **Processing**:
  1. **MOS Line Chart**: Calculates MOS value distributions (binned intervals)
  2. **RSSI Line Chart**: Calculates RSSI distributions + exports raw samples to CSV
- **Excluded**: Skips `MOS PATCH` directories (uses standard analysis)
- **Output**: `wfc_linechart_data/` and `wfc_rssi_linechart_data/` directories

### C. RSRP & Tx Power Extraction
- **Input**: Coverage Performance runs from `5G n41 HPUE Coverage Test`
- **Devices**: PC2, PC3
- **Metrics Extracted**:
  - RSRP: Column `[NR5G] [RF] RSRP`
  - Tx Power: Primary `[NR5G] [Power] Tx power (PUSCH Actual)`, Fallback `[NR5G] [Power] Tx power (Total)`
- **Output**: CSV files in `rsrp_data/` and `tx_power_data/` directories

### D. CDF Throughput Data Export
- **Logic**: Recursively traverses `data_performance` results and exports any `Throughput_CDF` data to separate JSON files
- **Output Directory**: `cdf_throughput_data/`
- **Filename Format**: `{path_parts}_{device}.json` (e.g., `5g_auto_dp_tc_name_DUT.json`)
- **Note**: The `Throughput_CDF` key is removed from the main results JSON after export

---

## 4. Export Structure
The pipeline exports results into the following JSON files:

| Category | Output File | Root Key |
| :--- | :--- | :--- |
| Data Performance | `data_performance_results.json` | `"Data Performance"` |
| Call Performance | `call_performance_results.json` | `"Call Performance"` |
| Voice Quality | `voice_quality_results.json` | `"Voice Quality"` |
| Coverage Performance | `coverage_performance_results.json` | `"Coverage Performance"` |
| WFC Performance | `wfc_performance_results.json` | `"WFC"` |

### Additional Output Files
- `processing_summary.json`: Contains market, total files processed, success/failure counts, and lists of valid/invalid files
- `Processed File Count.txt`: Quick reference text file with processing counts

---

## 5. Filename Naming Conventions (`rules.py`)

The pipeline uses token-based matching to validate and classify files. Standard tokens include:

| Category | Options |
| :--- | :--- |
| **Operator** | `TMO`, `ATT`, `VZW` |
| **Network** | `SA`, `LTE`, `VONR ON`, `VONR OFF`, `5G AUTO`, `5G NSA` |
| **City** | `SEA`, `NY` |
| **Device** | `DUT` (CH01, PC2), `REF` (CH02, PC3) |
| **Device Type Mapping** | `DUT` = PC2, `REF` = PC3 |
| **Location** | `L1` (Good), `L2` (Moderate), `L3` (Poor) |
| **Band** | `N41`, `N25`, `N71` |
| **VQ Mode** | `BASE`, `MOBILE` |

### Token-Based Validation
*   **Logic:** The pipeline extracts tokens from filenames using delimiters (e.g., `_`, `-`, ` `).
*   **Validation:** Each token is matched against the allowed options table above.
*   **Unrecognized tokens** are flagged but do not halt processing.

### Robust MO/MT Detection
The analyzer uses a robust regex for MO/MT detection:
```
r'(?:[^a-zA-Z0-9]|^)(MO|MT)(?:[^a-zA-Z0-9]|$)'
```

This regex supports `MO`/`MT` surrounded by **ANY non-alphanumeric character** (e.g., `_`, `-`, ` `, `.`, `[`) or at the start/end of the string.

**Examples of supported formats:**
| Filename | Detected Direction |
| :--- | :--- |
| `DUT-MO_TC-151.csv` | MO |
| `DUT_MO_TC151.csv` | MO |
| `REF MT.csv` | MT |
| `SEA DUT MO_TC-151.csv` | MO |
| `TMO_5G_WFC_DUT-MO_TC-151.csv` | MO |

### WFC Specific Naming
For WFC tests, the filename should ideally follow:
`{Operator}_{Network}_WFC_{Device}-{Direction}_TC-{Number}.csv`
Example: `TMO_5G_WFC_DUT-MO_TC-151.csv`

> [!TIP]
> **Supported Delimiters**: The pipeline now supports any non-alphanumeric character as a delimiter for `MO`/`MT` (e.g., `DUT MO`, `DUT_MO`, `DUT-MO`).
