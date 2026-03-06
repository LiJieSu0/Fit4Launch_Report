import soundfile as sf
import p56_utils as p56
import numpy as np
import json

# 1. 讀取音訊
file_path = "Cellular.wav"
signal, fs = sf.read(file_path)

# 如果是多聲道，取第一聲道
if len(signal.shape) > 1:
    signal = signal[:, 0]

# 2. 原始數據檢查 (用於診斷硬體問題)
raw_peak_level = 20 * np.log10(np.max(np.abs(signal)) + 1e-12)
clipping_count = np.sum(np.abs(signal) >= 0.999)

# 3. 數據預處理：裁切前後 0.5 秒 (移除接通瞬間的電雜音)
trim_sec = 0.5
num_trim = int(trim_sec * fs)
if len(signal) > 2 * num_trim:
    clean_signal = signal[num_trim:-num_trim]
else:
    clean_signal = signal

# 4. 計算核心 P.56 指標 (使用乾淨的信號)
# Active Speech Level 即為 P.56 RMS Long Term Energy
active_level = p56.calculate_active_speech_level(clean_signal, fs)
peak_level = 20 * np.log10(np.max(np.abs(clean_signal)) + 1e-12)
active_peak_factor = peak_level - active_level

# 5. 自動化判定邏輯 (用於報告狀態)
status = "PASS"
warnings = []

if clipping_count > 0:
    status = "FAIL"
    warnings.append(f"Detected {clipping_count} clipping samples. Reduce input gain.")

if active_peak_factor > 20:
    # 正常語音 Peak Factor 應在 12-18dB 之間
    status = "WARNING"
    warnings.append("High Peak Factor: Possible impulse noise detected.")

# 6. 輸出結果
print("-" * 30)
print(f"分析報告: {file_path}")
print(f"RMS Long Term Energy: {active_level:.2f} dBFS")
print(f"Active Peak Factor:   {active_peak_factor:.2f} dB")
print(f"Peak Level:           {peak_level:.2f} dBFS")
print(f"判定結果:             {status}")
if warnings:
    for w in warnings:
        print(f"⚠️ {w}")
print("-" * 30)
