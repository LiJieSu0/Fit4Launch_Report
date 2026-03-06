import numpy as np

def calculate_active_speech_level(signal, fs):
    """
    簡易版 ITU-T P.56 主動語音位準計算
    """
    # 1. 預處理：取絕對值
    abs_signal = np.abs(signal)
    
    # 2. 設定常數 (根據 P.56 規範)
    # 這裡通常涉及一個時間常數為 30ms 的平滑濾波器
    time_constant = 0.03 
    alpha = np.exp(-1.0 / (fs * time_constant))
    
    # 3. 封絡線追蹤 (Envelope Tracking)
    envelope = 0
    envelopes = []
    for x in abs_signal:
        envelope = alpha * envelope + (1 - alpha) * x
        envelopes.append(envelope)
    
    # 4. 根據門檻值計算 Active Level (dB)
    # 這裡簡化為 RMS 計算，標準 P.56 會更複雜
    rms_level = 20 * np.log10(np.sqrt(np.mean(signal**2)) + 1e-12)
    
    return rms_level

# 你原本的程式碼改為：
# import p56_utils as p56
# level = p56.calculate_active_speech_level(signal, fs)