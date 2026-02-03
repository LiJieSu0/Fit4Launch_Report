

import subprocess
import time
import threading
import sys
import os
import logging

# --- CONFIGURATION SETTINGS ---
# 你可以在這裡直接修改撥號設定
PHONE_NUMBER = "922"           # 撥打號碼
CALL_DURATION = 50             # 通話時長 (秒)
WAIT_TIME_AFTER_HANGUP = 5     # 掛斷後等待時間 (秒)
NUM_CALLS = 300                # 總撥打次數
# 指定設備序號，留空則自動使用所有連線設備，例如: ["R5CR31GAESR", "DEVICE_2"]
SPECIFIC_DEVICES = [
    
] 

# 日誌設定
LOG_FILE = "logs/auto_call.log"
LOG_LEVEL = "INFO"
# ------------------------------

# Ensure log directory exists
log_dir = os.path.dirname(LOG_FILE)
if log_dir and not os.path.exists(log_dir):
    try:
        os.makedirs(log_dir)
    except Exception:
        pass

# Configure logging
logging.basicConfig(
    level=getattr(logging, LOG_LEVEL.upper(), logging.INFO),
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler(LOG_FILE, encoding='utf-8') if os.access(os.path.dirname(LOG_FILE) or ".", os.W_OK) else logging.NullHandler(),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger("auto_call")

# Global event to signal threads to stop
stop_event = threading.Event()

def run_adb_command(device_serial, command):
    """Executes an ADB command for a specific device."""
    full_command = f"adb -s {device_serial} {command}" if device_serial else f"adb {command}"
    try:
        result = subprocess.run(full_command, shell=True, capture_output=True, text=True, check=True, timeout=60) 
        logger.debug(f"Device {device_serial}: {command} -> {result.stdout.strip()}")
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        logger.error(f"Error on device {device_serial} with command '{command}': {e.stderr.strip()}")
        return None
    except subprocess.TimeoutExpired:
        logger.warning(f"Command timed out for device {device_serial}: '{command}'")
        return None
    except Exception as e:
        logger.exception(f"An unexpected error occurred for device {device_serial} with command '{command}': {e}")
        return None

def get_connected_devices():
    """Lists all connected ADB devices and returns their serials."""
    output = run_adb_command(None, "devices")
    if not output:
        return []
    
    devices = []
    lines = output.splitlines()
    for line in lines:
        if "\tdevice" in line:
            serial = line.split("\t")[0]
            devices.append(serial)
    return devices

def make_call(device_serial, phone_number, call_duration, wait_time_after_hangup, num_calls):
    """Performs a series of calls on a single device."""
    logger.info(f"Starting call sequence on device: {device_serial}")
    for i in range(num_calls):
        if stop_event.is_set():
            logger.info(f"Device {device_serial}: Interruption signal received. Stopping call sequence.")
            break

        logger.info(f"Device {device_serial}: Call {i+1}/{num_calls}")
        
        # Dial the number
        dial_command = f"shell am start -a android.intent.action.CALL -d tel:{phone_number}"
        if run_adb_command(device_serial, dial_command) is None:
            logger.error(f"Device {device_serial}: Failed to initiate call. Skipping to next call attempt.")
            continue
        
        logger.info(f"Device {device_serial}: Calling {phone_number} for {call_duration} seconds...")
        if stop_event.wait(call_duration):
            logger.info(f"Device {device_serial}: Interruption signal received during call. Hanging up and stopping.")
            run_adb_command(device_serial, "shell input keyevent KEYCODE_ENDCALL")
            break
        
        # Hang up
        hangup_command = "shell input keyevent KEYCODE_ENDCALL"
        if run_adb_command(device_serial, hangup_command) is None:
            logger.warning(f"Device {device_serial}: Failed to hang up call. Proceeding to next call attempt.")
        
        logger.info(f"Device {device_serial}: Call sequence step completed. Waiting for {wait_time_after_hangup} seconds before next call.")
        if i < num_calls - 1:
            if stop_event.wait(wait_time_after_hangup):
                logger.info(f"Device {device_serial}: Interruption signal received during wait. Stopping.")
                break
    logger.info(f"Finished call sequence on device: {device_serial}")

def main():
    if not check_adb_available():
        logger.error("ADB is not found in your system PATH. Please install Android Platform Tools.")
        return

    all_connected_devices = get_connected_devices()
    if not all_connected_devices:
        logger.error("No ADB devices found. Please ensure devices are connected and ADB is authorized.")
        return

    devices_to_use = []
    if SPECIFIC_DEVICES:
        for dev in SPECIFIC_DEVICES:
            if dev in all_connected_devices:
                devices_to_use.append(dev)
            else:
                logger.warning(f"Specified device '{dev}' not found among connected devices.")
    else:
        devices_to_use = all_connected_devices

    if not devices_to_use:
        logger.error("No valid devices selected for dialing. Exiting.")
        return

    logger.info(f"Selected devices for dialing: {devices_to_use}")

    threads = []
    for device_serial in devices_to_use:
        thread = threading.Thread(target=make_call, args=(device_serial, PHONE_NUMBER, CALL_DURATION, WAIT_TIME_AFTER_HANGUP, NUM_CALLS))
        threads.append(thread)
        thread.start()

    try:
        while any(thread.is_alive() for thread in threads):
            time.sleep(1)
    except KeyboardInterrupt:
        logger.info("\nMain thread: KeyboardInterrupt received. Signaling all threads to stop.")
        stop_event.set()
    finally:
        for thread in threads:
            thread.join()
        logger.info("All parallel dialing tasks completed or interrupted gracefully.")

def check_adb_available():
    """Checks if ADB is available in the system path."""
    try:
        subprocess.run(["adb", "version"], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

if __name__ == "__main__":
    main()
