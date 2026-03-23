# Pipeline Logic Documentation

This document outlines the logic used by the `ReportGenerator` pipeline to process data, calculate statistics, and handle fallbacks.

---

## 0. Quick Start - How to Run Pipeline

### Basic Usage

```bash
cd D:\ReportGenerator\python_scripts\src\report_generator
python pipeline.py
```

### What Happens When You Run

```
pipeline.py
    ↓
读取 config/config.yaml
    ↓
扫描 base_raw_data_dir 寻找 # 开头的项目文件夹
    ↓
对每个 #Project/Market 组合运行分析
    ↓
输出结果到 output_dir
```

### Programmatic Usage

```python
from report_generator.pipeline import DataAnalysisPipeline

# 方式 1: 自动发现所有项目和市场
# (在 pipeline.py 的 if __name__ == "__main__" 中)

# 方式 2: 指定项目和市场
pipeline = DataAnalysisPipeline(
    config_path="config/config.yaml",
    market_name="Seattle",
    project_name="#Dry Run"
)
pipeline.run()

# 方式 3: 使用默认配置
pipeline = DataAnalysisPipeline()
pipeline.run()
```

---

## 0.1 Configuration File (config/config.yaml)

The pipeline reads configuration from `config/config.yaml`:

```yaml
# ===== 项目基本设置 =====
project:
  name: "ReportGenerator"              # 项目名称（仅用于标识）
  base_raw_data_dir: "D:/ReportGenerator/Raw Data"   # 原始数据根目录
  output_dir: "D:/ReportGenerator/report-generator-app/public/AnalyzeResults"  # 输出目录

# ===== 日志设置 =====
logging:
  level: "INFO"                        # 日志级别: DEBUG, INFO, WARNING, ERROR
  log_file: "logs/report_generator.log"  # 日志文件路径

# ===== 分析目录配置 =====
analysis:
  directories:
    - path: "Data Performance/5G AUTO DP"    # 相对于 base_raw_data_dir 的路径
      analysis_type: "data_performance"       # 分析类型
    - path: "Coverage Performance/5G n41 HPUE Coverage Test"
      analysis_type: "n41_coverage"

# ===== 市场/基站配置 =====
markets:
  Seattle:
    latitude: 47.409192               # 基站纬度
    longitude: -121.973509           # 基站经度
  "New York":
    latitude: 40.562337
    longitude: -74.695998
  Seattle_LTE:
    latitude: 47.570236              # LTE 基站可能有不同的坐标
    longitude: -121.888454
```

### Config Fields Explained

| 字段 | 必填 | 说明 |
|:---|:---:|:---|
| `project.name` | 否 | 项目标识名称 |
| `project.base_raw_data_dir` | ✅ | 原始数据根目录 |
| `project.output_dir` | ✅ | 分析结果输出目录 |
| `logging.level` | 否 | 日志详细程度 |
| `analysis.directories` | ✅ | 要分析的数据路径列表 |
| `analysis.directories[].path` | ✅ | 相对于 base_raw_data_dir 的路径 |
| `analysis.directories[].analysis_type` | ✅ | 分析类型标识符 |
| `analysis.directories[].timeline_analysis` | 否 | 是否生成时间轴数据 (true/false) |
| `markets` | ✅ | 市场白名单 + 基站坐标 |

### Adding New Analysis Paths

To add a new data path for analysis:

```yaml
analysis:
  directories:
    # ... 现有配置 ...
    - path: "Data Performance/5G NEW TEST"    # 新路径
      analysis_type: "data_performance"        # 选择合适的 analysis_type
```

---

## 0.2 analysis_type vs excluded_types

### Concept Overview

```
config.yaml 定义 path → analysis_type
                           ↓
                  excluded_types 清单检查
                           ↓
                  决定用哪种处理方式
```

### excluded_types 清单 (pipeline.py:178)

```python
excluded_types = [
    "call_performance",          # 通话性能
    "voice_quality_combined",   # 语音质量
    "coverage_coordinate",       # 覆盖坐标
    "n41_coverage",             # N41 HPUE 覆盖
    "vonr_coverage_performance", # VoNR/LTE 覆盖性能
    "google_throughput_analysis", # Google 吞吐量
    "mhs_drive_performance",    # MHS 驾驶性能
    "wfc_performance"           # WiFi Calling 性能
]
```

### Processing Flow

```
┌──────────────────────────────────────────────────────────────┐
│ Step 1: 读取 config.yaml，得到 analysis_type                  │
│         例如：path="Coverage Performance" → analysis_type=    │
│         "coverage_coordinate"                                 │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ Step 2: 检查 analysis_type 是否在 excluded_types 中           │
└──────────────────────────────────────────────────────────────┘
                              ↓
        ┌─────────────────────┴─────────────────────┐
        ↓ 在名单上                                    ↓ 不在名单上
┌───────────────────┐                     ┌───────────────────┐
│ 目录级处理         │                     │ 文件级处理        │
│ (Directory-Level) │                     │ (File-Level)      │
├───────────────────┤                     ├───────────────────┤
│ 扫描整个目录       │                     │ 收集单个 CSV 文件  │
│ 调用专用分析器     │                     │ 按目录+设备分组    │
│ 处理所有子文件夹   │                     │ 聚合统计          │
└───────────────────┘                     └───────────────────┘
```

### analysis_type 完整对照表

| analysis_type | excluded_types | 处理方式 | 专用分析器 |
|:---|:---:|:---:|:---|
| `data_performance` | ❌ | 文件级 | `DataPerformanceAnalyzer` |
| `mrab_performance` | ❌ | 文件级 | `MrabPerformanceAnalyzer` |
| `google_throughput_analysis` | ✅ | 目录级 | `GoogleThroughputAnalyzer` |
| `mhs_drive_performance` | ✅ | 目录级 | `MHSDriveAnalyzer` |
| `coverage_coordinate` | ✅ | 目录级 | `_analyze_coordinate()` |
| `n41_coverage` | ✅ | 目录级 | `_analyze_n41()` |
| `vonr_coverage_performance` | ✅ | 目录级 | `_analyze_vonr()` |
| `call_performance` | ✅ | 目录级 | `CallPerformanceAnalyzer` |
| `voice_quality_combined` | ✅ | 目录级 | `VoiceQualityAnalyzer` |
| `wfc_performance` | ✅ | 目录级 | `WfcPerformanceAnalyzer` |

### 简单记忆法

> **需要整柜处理的 = 在 excluded_types 名单上**
> 
> 规则：不是简单的"数据处理"，而是需要扫描目录结构、识别子场景、调用特殊分析逻辑的，都需要目录级处理。

---

## 1. High-Level Routing Logic
The entry point is `pipeline.py`. It auto-discovers projects and markets, then iterates through files and directories to determine the appropriate analyzer based on path and filename patterns.

### Project & Market Auto-Discovery
- **Project Discovery**: Scans `[base_raw_data_dir]` for folders starting with `#` (e.g., `#ProjectName`)
- **Market Discovery**: For each project folder, scans subfolders and filters against a whitelist in `config.yaml` (`markets` key)
- **Directory Structure**:
  - With Project: `[base_raw_data_dir]/[Project]/[Market]`
  - Without Project: `[base_raw_data_dir]/[Market]`

### Excluded Analysis Types (Directory-Level Only)
> ⚠️ **See Section 0.2 for detailed explanation.**

These analysis types are processed as **directory-level analysis only** (individual CSV files in these categories are skipped):

| analysis_type | Description | Processing Method |
|:---|:---|:---|
| `call_performance` | Call Performance | Directory scan → `CallPerformanceAnalyzer` |
| `voice_quality_combined` | Voice Quality | Directory scan → `VoiceQualityAnalyzer` |
| `coverage_coordinate` | Coverage Coordinate | Directory scan → coordinate extraction |
| `n41_coverage` | N41 HPUE Coverage | Run folder scan → edge analysis |
| `vonr_coverage_performance` | VoNR/LTE Coverage | Band folder scan → 4-point analysis |
| `google_throughput_analysis` | Google Throughput | Directory scan → interval detection |
| `mhs_drive_performance` | MHS Drive | Directory scan → throughput analysis |
| `wfc_performance` | WiFi Calling | TC-based grouping → aggregation |

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

### CSV Filename Conventions

Standard filename format for test data files:

| Component | Pattern | Example |
|:---|:---|:---|
| **Timestamp** | `_YYYYMMDD_HHMMSS_` | `_20260125_130627_` |
| **Channel** | `CH01`/`CH02` | `CH01` = REF, `CH02` = DUT |
| **Operator** | `TMO`, `ATT`, `VZW` | `TMO` |
| **Network** | `5GNR`, `LTE`, `5G` | `5GNR` |
| **Device** | `DUT`, `REF`, `PC2`, `PC3` | `DUT` |
| **Band** | `N25`, `N41`, `B66` | `N41` |
| **Run** | `R1`, `R2`, `R3` | `R1` |

**Common filename patterns:**
```
_20260125_CH01_TMO_5GNR_Coverage_DUT-N25_R1.csv
TMO_5G_AUTO_DP_DUT_TC001.csv
SEA_DUT_MO_TC-151.csv
```

### Multiple CSV Files Processing Logic

The pipeline implements a **group-and-aggregate** strategy for handling multiple CSV files:

#### Step 1: File Grouping (`pipeline.py:119-167`)
```
_all_csv_files → _group_files_by_directory_and_device()
```

Files are grouped by two criteria:
1. **Same Directory**: All files in the same folder are candidates
2. **Same Device Type**: Files matching the same device type (PC2, PC3, DUT, REF)

#### Step 2: Aggregation Process
For each group (directory + device type):
```
file_list = [file1.csv, file2.csv, file3.csv, ...]
↓
analyzer.analyze(file_list)  # Pass entire list, not individual files
↓
Single aggregated statistics output
```

#### Step 3: Result Merging
- The **first file's path structure** determines the output JSON nesting
- The **detected device type** replaces the leaf filename as the final key
- Multiple files in the same directory + device type produce **one combined result**

**Example:**
```
Input:
  Raw Data/Seattle/Data Performance/5G AUTO DP/TC_001/DUT/file1.csv
  Raw Data/Seattle/Data Performance/5G AUTO DP/TC_001/DUT/file2.csv

Output JSON:
  "Data Performance": {
    "5G AUTO DP": {
      "TC_001": {
        "DUT": { /* aggregated statistics */ }
      }
    }
  }
```

#### Step 4: Data Aggregation Methods
Different analyzers handle multiple files differently:

| Analyzer | Aggregation Method |
| :--- | :--- |
| **DataPerformanceAnalyzer** | Collects all interval averages → calculates combined statistics |
| **Throughput Analysis** | All throughput intervals from all files → single Mean/Std/Max/Min |
| **CDF Analysis** | All throughput points from all files → single CDF distribution |
| **UDP Jitter/Error** | All interval means from all files → overall mean |
| **Coverage analyzers** | Processes each file individually, outputs per-run results |

### Pipeline Execution Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           MAIN PIPELINE LOOP                             │
├─────────────────────────────────────────────────────────────────────────┤
│  1. Auto-Discovery                                                        │
│     ├── Scan base_raw_data_dir for '#'-prefixed folders (Projects)       │
│     └── For each project, scan subfolders against markets whitelist      │
│                                                                          │
│  2. For each (project, market) combination:                             │
│     │                                                                      │
│     ├─── PHASE 1: File-Level Analysis ──────────────────────────────── │
│     │   │                                                                 │
│     │   ├── Collect CSV files from Data Performance directories          │
│     │   ├── Group by (directory + device_type)                           │
│     │   │                                                                 │
│     │   └── For each group:                                              │
│     │       ├── analyzer.analyze([file1, file2, ...])  ← aggregation    │
│     │       └── Insert results into nested JSON structure               │
│     │                                                                      │
│     ├─── PHASE 2: Directory-Level Analysis ────────────────────────────│
│     │   │                                                                 │
│     │   ├── Coverage Coordinate ─→ _analyze_coordinate()                │
│     │   ├── N41 HPUE ─→ _analyze_n41()                                 │
│     │   ├── VoNR/LTE Coverage ─→ _analyze_vonr()                       │
│     │   ├── Timeline Analysis ─→ _analyze_timeline() (if enabled)       │
│     │   ├── Call Performance ─→ CallPerformanceAnalyzer                 │
│     │   ├── Voice Quality ─→ VoiceQualityAnalyzer                        │
│     │   └── WFC ─→ WfcPerformanceAnalyzer                               │
│     │                                                                      │
│     ├─── PHASE 3: Post-Processing ────────────────────────────────────│
│     │   │                                                                 │
│     │   ├── VQ Line Chart ─→ calculate_vq_statistics()                  │
│     │   ├── WFC Line Chart ─→ calculate_wfc_statistics()                │
│     │   ├── RSRP/TxPower CSV ─→ extract_coverage_data_to_csv()          │
│     │   └── CDF Export ─→ _export_cdf_data()                            │
│     │                                                                      │
│     └─── PHASE 4: Export ──────────────────────────────────────────────│
│         │                                                                 │
│         ├── data_performance_results.json                               │
│         ├── coverage_performance_results.json                             │
│         ├── call_performance_results.json                                │
│         ├── voice_quality_results.json                                   │
│         ├── wfc_performance_results.json                                  │
│         ├── processing_summary.json                                       │
│         └── Processed File Count.txt                                     │
└─────────────────────────────────────────────────────────────────────────┘
```

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
| Path | Analysis Type | Analyzer Function |
| :--- | :--- | :--- |
| `Coverage Performance` | Coverage Coordinate | `_analyze_coordinate()` |
| `Coverage Performance/5G n41 HPUE Coverage Test` | N41 Coverage | `_analyze_n41()` |
| `Coverage Performance/5G VoNR Coverage Test` | VoNR Coverage | `_analyze_vonr()` |
| `Coverage Performance/LTE Coverage Test` | LTE Coverage | `_analyze_vonr()` |

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

#### D1. Coverage Coordinate Analysis (`coverage_coordinate_analyzer.py`)

**Purpose**: Calculate distance to base station from the last valid GPS coordinate.

**Flow Diagram**:
```
Coverage Performance/ (root directory)
    ↓
Iterate subdirectories (e.g., Run1, Run2, ...)
    ↓
find_dut_ref_files() - Pair DUT/REF files by timestamp
    ↓
For each pair:
    ├── analyze_coverage_coordinates(DUT_file) → PC2 distance
    └── analyze_coverage_coordinates(REF_file) → PC3 distance
    ↓
Output: {subfolder: {DUT: {distance}, REF: {distance}}}
```

**File Pairing Logic (`find_dut_ref_files()`)**:
1. **Timestamp-based grouping**: Files with same `_YYYYMMDD_HHMMSS_` prefix are grouped
2. **Within each group**:
   - `CH02` or `DUT` → DUT (PC2)
   - `CH01` or `REF` → REF (PC3)
3. **Non-timestamped files**: Look for `pc2.csv` / `pc3.csv` directly

**Coordinate Analysis Logic**:
- Reads CSV from bottom to top
- Finds first row with valid Latitude AND Longitude
- Calculates Haversine distance to base station coordinates
- Base station coordinates from `config.yaml`: `markets.{market}.latitude/longitude`

**Special Case - Seattle LTE**: Uses `markets.Seattle_LTE` coordinates instead of `markets.Seattle`

#### D2. N41 HPUE Coverage Analysis (`n41_coverage_analyzer.py`)

**Purpose**: Extract coverage edge data (RSRP, TxPower) at the point of service loss.

**Flow Diagram**:
```
5G n41 HPUE Coverage Test/
├── Run1/
│   ├── PC2_*.csv → {'Device type': 'PC2', lat, lon, ul_tp, rsrp, tx_power}
│   └── PC3_*.csv → {'Device type': 'PC3', lat, lon, ul_tp, rsrp, tx_power}
├── Run2/
...
```

**Processing Logic (per CSV file)**:
1. Read CSV file
2. Find all rows where `[General] Serving Network` contains "No service"
3. For each "No service" event:
   a. Search **upwards** from that row
   b. Find first row where `UL TP > 1 Mbps`
   c. Record: latitude, longitude, RSRP, TxPower at that row
4. Apply HPUE filtering (see below)
5. Return list of data points per file

**HPUE Power Filtering Rules**:
| Device Type | Filter Condition | Reason |
| :--- | :--- | :--- |
| **PC2 / DUT** | TxPower > 26 dBm → **excluded** | PC2 max is 26 dBm |
| **PC3 / REF** | TxPower > 24 dBm → **excluded** | PC3 max is 24 dBm |
| **Any** | TxPower = 0 → **excluded** | Invalid reading |

**Output Structure**:
```json
{
  "Run1": [
    {"Device type": "PC2", "latitude": 47.44, "longitude": -121.98, "ul_tp_value": 22.0, "rsrp_value": -124.5, "tx_power_value": 23.0, "distance_km": 3.73},
    {"Device type": "PC3", "latitude": 47.43, "longitude": -121.97, "ul_tp_value": 24.1, "rsrp_value": -124.5, "tx_power_value": 18.0, "distance_km": 1.88}
  ],
  "Run2": [...],
  ...
}
```

#### D3. VoNR/LTE Coverage Performance Analysis (`coverage_performance_analyzer.py` → `_analyze_vonr()`)

**Purpose**: Extract 4 key coordinate points for VoNR and LTE coverage tests.

**Flow Diagram**:
```
5G VoNR Coverage Test/ (or LTE Coverage Test/)
├── N25/ (Band folder)
│   ├── file1.csv → Analyze → DUT Run1
│   ├── file2.csv → Analyze → DUT Run2
│   ├── file3.csv → Analyze → REF Run1
│   └── file4.csv → Analyze → REF Run2
├── N41/
├── N71/
└── B66/ (for LTE)
```

**Device Type Mapping**:
1. Extract PC number from filename (`PC2`/`PC3`)
2. If found:
   - PC2 → `DUT`
   - PC3 → `REF`
   - Other PC# → keep as `PC#`
3. Fallback: Extract `DUT`/`REF` from filename
4. Fallback: Use `CH01`/`CH02` (odd=REF, even=DUT)

**Run Number Assignment**: Files are **sorted by name** (chronological), then assigned Run1, Run2, Run3... for each device type.

**Four Coordinate Points Calculated**:

| Point | Description | Search Logic |
| :--- | :--- | :--- |
| **mos_before_drop** | Last valid MOS before call dropped | Find `[Event] Voice Call Event == Drop` → search upwards for first valid MOS → get coordinates |
| **call_drop** | Drop event coordinates | Get `[Event] Voice Call Event == Drop` row coordinates; if missing, search upwards |
| **first_dl_tp_gt_1** | First DL TP > 1 location | Search from bottom (or "No Service" cut-off) upwards for first `DL TP > 1` |
| **first_ul_tp_gt_1** | First UL TP > 1 location | Search from bottom (or "No Service" cut-off) upwards for first `UL TP > 1` |

**"No Service" Cut-off Logic**:
1. Wait for valid service to start (`NR SA` for 5G, `LTE` for LTE)
2. When service starts, find first subsequent "No Service"
3. All searches stop at this cut-off point

**Secondary KPIs Integration**: After coordinate extraction, `analyze_secondary_kpis()` is called for each file to add BLER, MCS, CQI, TxPower data.

#### D4. Coverage Timeline Analysis (`coverage_timeline_analyzer.py`)

**Purpose**: Generate RSRP, SINR, and TxPower time-series data for charting.

**Output Directory Structure**:
```
CoverageTimeLine/
├── RSRPTimeLine/
│   ├── N25_Run1.csv
│   ├── N25_Run2.csv
│   ├── N41_Run1.csv
│   └── ...
├── SINRTimeLine/
│   └── ...
└── TxPowerTimeLine/
    └── ...
```

**CSV Output Format**:
```csv
DUT,REF
-85.5,-84.2
-86.1,-85.0
-84.8,-83.9
...
```

**Valid Data Range Detection**:
```
1. Wait for valid service (NR SA for 5G, LTE for LTE)
2. Find first "No Service" event AFTER valid service started
3. Truncate all data at that index
```

**Device Pairing Logic**:
1. Extract timestamp from filename: `_YYYYMMDD_HHMMSS_`
2. Group files by timestamp
3. Within each timestamp:
   - `DUT`/`PC2`/`CH02` → DUT column
   - `REF`/`PC3`/`CH01` → REF column

**Header Search Priority**:

| Metric | 5G Header | LTE Header (Fallback) |
| :--- | :--- | :--- |
| **RSRP** | `[NR5G] [RF] RSRP` | `[LTE] [L1] [RF] RSRP` |
| **SINR** | `[NR5G] [RF] SINR` | `[LTE] [Cell Info] [Serving Cell List] [Top N] [Top1] SINR` |
| **TxPower** | `[NR5G] [Power] Tx power (PUSCH Actual)` | `[LTE] [Power] [Tx Power] Tx Power (PUSCH Actual)`<br>`[LTE] [Power] [Tx Power] Tx power (Total)` |

#### D5. Secondary KPIs Analysis (`coverage_secondary_kpi_analyzer.py`)

**Purpose**: Calculate BLER, MCS, CQI, TxPower statistics segmented by distance.

**Segmentation Logic**:
```
All valid data (before "No Service") → Split into 3 segments:
├── First 30%:   indices [0 to 30%)
├── Middle 40%: indices [30% to 70%)
└── Last 30%:   indices [70% to end]
```

**Metrics Calculated per Segment**:
| Metric | 5G Header | LTE Header |
| :--- | :--- | :--- |
| **BLER** | `[NR5G] [BLER & HARQ] PDSCH BLER` | `[LTE] [L1] [BLER] PDSCH BLER` |
| **DL MCS** | `[NR5G] [PCC] [PDSCH] [Modulation (TB0+TB1)] MCS (Avg)` | `[LTE] [L1] [Modulation] DL MCS (TB0 & TB1 - Avg)` |
| **UL MCS** | `[NR5G] [PCC] [PUSCH] [Modulation] MCS (Avg)` | `[LTE] [L1] [Modulation] UL MCS (TB0 - Average)` |
| **CQI** | `[NR5G] [Quality Report] [CQI] WB CQI (Avg)` | N/A |
| **TxPower** | Fuzzy match: `PUSCH Actual` > `Total` > `Total Actual` | `[LTE] [Power] [Tx Power] Tx Power (PUSCH Actual)` > `Tx power (Total)` > `Tx power (PUSCH Total)` |

**HPUE TxPower Filtering** (only for HPUE tests):
| Device | Filter |
| :--- | :--- |
| PC2/DUT | TxPower > 26 dBm → excluded |
| PC3/REF | TxPower > 24 dBm → excluded |

**Output Structure**:
```json
{
  "First 30%": {
    "AVG BLER": 2.5,
    "AVG DL MCS": 8.3,
    "AVG UL MCS": 6.1,
    "AVG CQI": 12.4,
    "AVG TxPower": 15.2
  },
  "Middle 40%": {...},
  "Last 30%": {...},
  "TxPower": 14.8
}
```

---

### D6. Coverage RSPR/TxPower CSV Export (Post-Processing)

**Triggered by**: `pipeline.py` → `_run_post_processing()`

**Input**: `5G n41 HPUE Coverage Test/Run*/*.csv`

**Output**:
```
rsrp_data/Run1_PC2_PC3_RSRP_Analysis.csv
tx_power_data/Run1_PC2_PC3_TxPower_Analysis.csv
```

**Processing** (`extract_coverage_data_to_csv()`):
1. Read all CSV files in the Run folder
2. Filter by device type (PC2, PC3)
3. Extract specified column data up to "No Service" cut-off
4. Clean TxPower: Remove rows where TxPower = 0 or exceeds HPUE limits
5. Concatenate all runs into single CSV per metric

### D7. Coverage Performance JSON Output Structure

The `coverage_performance_results.json` file contains all coverage analysis results:

```json
{
  "Coverage Performance": {
    "Coverage Coordinate": {
      "Run1": {
        "DUT": {
          "last_valid_coords_distance_to_base_station_km": 2.78
        },
        "REF": {
          "last_valid_coords_distance_to_base_station_km": 2.70
        }
      },
      "Run2": {...}
    },
    
    "5G n41 HPUE Coverage Test": {
      "Run1": [
        {
          "Device type": "PC2",
          "latitude": 47.434,
          "longitude": -121.973,
          "ul_tp_value": 20.97,
          "rsrp_value": -110.65,
          "tx_power_value": 23.7,
          "distance_km": 2.78
        },
        {
          "Device type": "PC3",
          "latitude": 47.433,
          "longitude": -121.973,
          "ul_tp_value": 22.02,
          "rsrp_value": -111.25,
          "tx_power_value": 23.7,
          "distance_km": 2.70
        }
      ],
      "Run2": [...],
      "Run3": [...],
      "Run4": [...],
      "Run5": [...]
    },
    
    "5G VoNR Coverage Test": {
      "N25": {
        "DUT": {
          "Run1": {
            "mos_before_drop": {"latitude": 47.44, "longitude": -121.98, "distance_km": 3.5},
            "call_drop": {"latitude": 47.44, "longitude": -121.98, "distance_km": 3.5},
            "first_dl_tp_gt_1": {"latitude": 47.44, "longitude": -121.98, "distance_km": 3.5},
            "first_ul_tp_gt_1": {"latitude": 47.44, "longitude": -121.98, "distance_km": 3.5},
            "secondary_kpi": {
              "First 30%": {"AVG BLER": 2.5, "AVG DL MCS": 8.3, "AVG UL MCS": 6.1, "AVG CQI": 12.4, "AVG TxPower": 15.2},
              "Middle 40%": {...},
              "Last 30%": {...},
              "TxPower": 14.8
            }
          },
          "Run2": {...}
        },
        "REF": {...}
      },
      "N41": {...},
      "N71": {...}
    },
    
    "LTE Coverage Test": {
      "B66": {
        "DUT": {...},
        "REF": {...}
      }
    }
  }
}
```

**Frontend Component Mapping**:

| Data Path | Component | Expected Keys |
| :--- | :--- | :--- |
| `Coverage Performance["5G n41 HPUE Coverage Test"]` | `HpueCoverageSection.js` | `Run1-Run5` arrays with `PC2`/`PC3` devices |
| `Coverage Performance["5G VoNR Coverage Test"]` | `VonrCoverageSection.js` | Band (N25/N41/N71), DUT/REF, Run1-5 |
| `Coverage Performance["LTE Coverage Test"]` | `LteCoverageSection.js` | Band (B66), DUT/REF, Run1-5 |
| `Coverage Performance["Coverage Coordinate"]` | `CoverageSummaryTable.js` | `last_valid_coords_distance_to_base_station_km` |

**Common NA Display Issues and Troubleshooting**:

| Cause | Symptom | Solution |
| :--- | :--- | :--- |
| Wrong data folder selected | All sections show N/A | Check `project.dataFolderName` in frontend matches folder name |
| Missing test data files | Specific section shows N/A | Verify CSV files exist in raw data folder |
| Data structure mismatch | Coverage shows N/A, HPUE works | Ensure JSON keys match frontend expectations |
| HPUE filtering removed all data | TxPower is NaN | Check if HPUE power limits are too aggressive |

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
After the main analysis completes, the pipeline executes additional post-processing steps in `_run_post_processing()`. These steps generate supplementary data files used by the frontend for charts and detailed analysis.

### A. VQ Line Chart Data (`VqLineChartAnalyzer.py`)

**Trigger Condition**: Voice Quality EVS WB scenarios exist in raw data

**Input Paths** (checked in order):
```
Voice Quality/5G Auto VoNR Disabled EVS WB VQ/Base
Voice Quality/5G Auto VoNR Disabled EVS WB VQ/Mobile
Voice Quality/5G Auto VoNR Enabled EVS WB VQ/Base
Voice Quality/5G Auto VoNR Enabled EVS WB VQ/Mobile
```

**Output Directory**: `vq_linechart_data/`

**Output Filename Format**: `vq_mos_statistics_{scenario}_{subfolder}.json`

**Example**:
```
vq_linechart_data/
├── vq_mos_statistics_5g_auto_vonr_disabled_evs_wb_vq_base.json
├── vq_mos_statistics_5g_auto_vonr_disabled_evs_wb_vq_mobile.json
├── vq_mos_statistics_5g_auto_vonr_enabled_evs_wb_vq_base.json
└── vq_mos_statistics_5g_auto_vonr_enabled_evs_wb_vq_mobile.json
```

**Processing Logic**:
1. Read all CSV files in the scenario folder
2. Group by device type (DUT, REF)
3. Collect MOS values
4. Bin into intervals (e.g., `< 2.0`, `[2.0-2.5)`, ..., `>= 4.5`)
5. Calculate percentage in each bin
6. Export as JSON

### B. WFC Line Chart Data (`WfcLineChartAnalyzer.py`)

**Trigger Condition**: WFC folder exists in raw data

**Input**: All CSV files under `WFC/` directory (excluding `MOS PATCH`)

**Output Directories**:
- `wfc_linechart_data/`: MOS distribution
- `wfc_rssi_linechart_data/`: RSSI distribution + raw samples

**Processing Logic**:
1. **Group by TC**: Extract TC number from filename, group files
2. **For each TC**:
   a. Read all CSV files in the group
   b. Calculate MOS statistics → `wfc_mos_statistics_{tc}.json`
   c. Calculate RSSI statistics → `wfc_rssi_statistics_{tc}.json`
   d. Export raw RSSI samples to CSV

**TC162+ Special Handling**:
- For TC >= 162: Group by `DUT`/`REF` only (no MO/MT separation)
- For TC < 162: Maintain MO/MT separation

**Output Filename Format**:
```
wfc_linechart_data/wfc_mos_statistics_tc150.json
wfc_linechart_data/wfc_mos_statistics_tc151.json
wfc_rssi_linechart_data/wfc_rssi_statistics_tc150.csv
wfc_rssi_linechart_data/wfc_rssi_statistics_tc150.json
```

### C. RSRP & TxPower Extraction (`n41_coverage_analyzer.py`)

**Trigger Condition**: `5G n41 HPUE Coverage Test` folder exists

**Input Structure**:
```
5G n41 HPUE Coverage Test/
├── Run1/
│   ├── PC2_*.csv
│   └── PC3_*.csv
├── Run2/
├── Run3/
├── Run4/
└── Run5/
```

**Output Directories**:
- `rsrp_data/`: RSRP time-series per run
- `tx_power_data/`: TxPower time-series per run

**Processing Logic**:
1. For each Run folder (Run1-Run5):
   a. Filter files by device type (PC2, PC3)
   b. Read CSV, extract RSRP/TxPower column
   c. Truncate at "No Service" cut-off
   d. Clean TxPower: Remove rows where TxPower = 0 or exceeds HPUE limits
   e. Export combined CSV

**HPUE Power Filtering** (TxPower only):
| Device | Threshold | Action |
| :--- | :--- | :--- |
| PC3 / REF | > 24 dBm | Set to NaN (excluded) |
| PC2 / DUT | > 26 dBm | Set to NaN (excluded) |
| Any | = 0 | Set to NaN (excluded) |

**Output Filename Format**:
```
rsrp_data/Run1_PC2_PC3_RSRP_Analysis.csv
rsrp_data/Run2_PC2_PC3_RSRP_Analysis.csv
tx_power_data/Run1_PC2_PC3_TxPower_Analysis.csv
tx_power_data/Run2_PC2_PC3_TxPower_Analysis.csv
```

**CSV Format**:
```csv
PC2,PC3
-85.5,-84.2
-86.1,
-84.8,-83.9
...
```
*(Empty cells indicate excluded/missing data)*

### D. Coverage Timeline Generation (`CoveragePerformanceAnalyzer._analyze_timeline()`)

**Trigger Condition**: `timeline_analysis: true` in config for VoNR/LTE Coverage paths

**Config Setting**:
```yaml
- path: "Coverage Performance/5G VoNR Coverage Test"
  analysis_type: "vonr_coverage_performance"
  timeline_analysis: true
- path: "Coverage Performance/LTE Coverage Test"
  analysis_type: "vonr_coverage_performance"
  timeline_analysis: true
```

**Input Structure**:
```
Coverage Performance/5G VoNR Coverage Test/
├── N25/
│   ├── timestamped_DUT_file.csv
│   └── timestamped_REF_file.csv
├── N41/
└── N71/
```

**Output Directory**: `CoverageTimeLine/`

**Output Structure**:
```
CoverageTimeLine/
├── RSRPTimeLine/
│   ├── N25_Run1.csv
│   ├── N25_Run2.csv
│   └── N41_Run1.csv
├── SINRTimeLine/
│   └── ...
└── TxPowerTimeLine/
    └── ...
```

### E. CDF Throughput Data Export

**Purpose**: Export Throughput CDF data to separate files for frontend charting

**Trigger**: Automatically during main analysis if CDF data is generated

**Processing Logic**:
1. After `data_performance` results are complete
2. Recursively traverse the nested dictionary
3. Find any `Throughput_CDF` keys
4. Export to separate JSON file
5. Remove `Throughput_CDF` from main results (avoid duplication)

**Output Directory**: `cdf_throughput_data/`

**Filename Format**: `{path_parts}_{device}.json`

**Example Transformation**:
```
Input (in data_performance_results.json):
{
  "5G AUTO DP": {
    "TC001": {
      "DUT": {
        "Throughput": {...},
        "Throughput_CDF": {...}  ← This gets exported
      }
    }
  }
}

Output (cdf_throughput_data/):
5g_auto_dp_tc001_DUT.json  ← Contains only the CDF data
```

---

## 4. Export Structure

The pipeline exports results into the following JSON files:

| Category | Output File | Root Key | Post-Processing Subdirs |
| :--- | :--- | :--- | :--- |
| Data Performance | `data_performance_results.json` | `"Data Performance"` | `cdf_throughput_data/` |
| Call Performance | `call_performance_results.json` | `"Call Performance"` | - |
| Voice Quality | `voice_quality_results.json` | `"Voice Quality"` | `vq_linechart_data/` |
| Coverage Performance | `coverage_performance_results.json` | `"Coverage Performance"` | `CoverageTimeLine/`, `rsrp_data/`, `tx_power_data/` |
| WFC Performance | `wfc_performance_results.json` | `"WFC"` | `wfc_linechart_data/`, `wfc_rssi_linechart_data/` |

### Output Directory Structure Example

```
AnalyzeResults/
├── #Dry Run/
│   ├── Seattle/
│   │   ├── data_performance_results.json
│   │   ├── coverage_performance_results.json
│   │   ├── call_performance_results.json
│   │   ├── voice_quality_results.json
│   │   ├── wfc_performance_results.json
│   │   ├── processing_summary.json
│   │   ├── "Processed File Count.txt"
│   │   │
│   │   ├── cdf_throughput_data/
│   │   │   ├── 5g_auto_dp_http_multi_stream_dl_good_dut.json
│   │   │   └── 5g_auto_dp_http_multi_stream_dl_good_ref.json
│   │   │
│   │   ├── vq_linechart_data/
│   │   │   └── vq_mos_statistics_*.json
│   │   │
│   │   ├── CoverageTimeLine/
│   │   │   ├── RSRPTimeLine/
│   │   │   │   ├── N25_Run1.csv
│   │   │   │   └── N41_Run1.csv
│   │   │   ├── SINRTimeLine/
│   │   │   └── TxPowerTimeLine/
│   │   │
│   │   ├── rsrp_data/
│   │   │   └── Run*_PC2_PC3_RSRP_Analysis.csv
│   │   │
│   │   ├── tx_power_data/
│   │   │   └── Run*_PC2_PC3_TxPower_Analysis.csv
│   │   │
│   │   ├── wfc_linechart_data/
│   │   │   └── wfc_mos_statistics_tc*.json
│   │   │
│   │   └── wfc_rssi_linechart_data/
│   │       ├── wfc_rssi_statistics_tc*.json
│   │       └── wfc_rssi_statistics_tc*.csv
│   │
│   └── New York/
│       └── ...
│
└── #Huaqin/
    └── Seattle/
        └── ...
```

### processing_summary.json Structure
```json
{
  "market": "Seattle",
  "total_files_processed": 150,
  "successfully_processed": 145,
  "failed_or_skipped": 5,
  "valid_files": [
    "D:/ReportGenerator/Raw Data/#Dry Run/Seattle/Data Performance/...",
    "..."
  ],
  "invalid_files": [
    "D:/ReportGenerator/Raw Data/#Dry Run/Seattle/Data Performance/...",
    "..."
  ]
}
```

### Processed File Count.txt
```
Total files processed: 150
Correctly processed statistics: 145
Incorrect paths/Invalid data: 5
```

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
