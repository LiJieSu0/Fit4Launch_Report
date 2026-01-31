import os
import sys

def rename_csv_files(directory="."):
    """
    遞迴重命名指定目錄及其所有子目錄下的 CSV 檔案
    將 CH01 替換為 DUT，CH02 替換為 REF
    
    Args:
        directory: 要處理的目錄路徑，預設為當前目錄
    """
    # 確保目錄存在
    if not os.path.exists(directory):
        print(f"錯誤: 目錄 '{directory}' 不存在")
        return
    
    # 計數器
    renamed_count = 0
    skipped_count = 0
    
    # 使用 os.walk 遞迴遍歷所有子目錄
    for root, dirs, files in os.walk(directory):
        # 顯示當前處理的目錄
        rel_path = os.path.relpath(root, directory)
        if rel_path == ".":
            print(f"\n處理目錄: {os.path.basename(os.path.abspath(directory))} (根目錄)")
        else:
            print(f"\n處理目錄: {rel_path}")
        print("-" * 60)
        
        # 標記當前目錄是否有 CSV 檔案
        has_csv = False
        
        for filename in files:
            # 只處理 CSV 檔案
            if not filename.lower().endswith('.csv'):
                continue
            
            has_csv = True
            
            # 建立新檔名
            new_filename = filename
            
            # 替換 CH01 為 DUT
            if 'CH01' in new_filename:
                new_filename = new_filename.replace('CH01', 'DUT')
            
            # 替換 CH02 為 REF
            if 'CH02' in new_filename:
                new_filename = new_filename.replace('CH02', 'REF')
            
            # 如果檔名有變化，進行重命名
            if new_filename != filename:
                old_path = os.path.join(root, filename)
                new_path = os.path.join(root, new_filename)
                
                # 檢查新檔名是否已存在
                if os.path.exists(new_path):
                    print(f"  ⚠ 警告: 無法重命名 '{filename}' -> '{new_filename}' (目標檔案已存在)")
                    skipped_count += 1
                else:
                    try:
                        os.rename(old_path, new_path)
                        print(f"  ✓ 已重命名: {filename} -> {new_filename}")
                        renamed_count += 1
                    except Exception as e:
                        print(f"  ✗ 錯誤: 無法重命名 '{filename}': {e}")
                        skipped_count += 1
            else:
                print(f"  - 跳過 (無需重命名): {filename}")
                skipped_count += 1
        
        if not has_csv:
            print("  (此目錄無 CSV 檔案)")
    
    # 顯示總結
    print(f"\n{'='*60}")
    print(f"處理完成!")
    print(f"成功重命名: {renamed_count} 個檔案")
    print(f"跳過: {skipped_count} 個檔案")
    print(f"{'='*60}")

if __name__ == "__main__":
    # 如果有提供命令列參數，使用該目錄；否則使用當前目錄
    target_directory = sys.argv[1] if len(sys.argv) > 1 else "."
    
    print(f"{'='*60}")
    print(f"CSV 檔案重命名工具 (遞迴處理所有子目錄)")
    print(f"{'='*60}")
    print(f"目標目錄: {os.path.abspath(target_directory)}")
    print(f"重命名規則: CH01 -> DUT, CH02 -> REF")
    print(f"{'='*60}")
    
    rename_csv_files(target_directory)
