import subprocess
import time
import threading
import sys
import os

# Add src to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from report_generator.utils.logger import setup_logger
from report_generator.utils.config_loader import Config

# Initialize config and logger
config = Config("config/config.yaml")
log_config = config.get("logging")
logger = setup_logger(name="auto_call", log_file=log_config.get("log_file"), level=log_config.get("level"))

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
    # Load parameters from config
    ac_config = config.get("auto_call")
    PHONE_NUMBER = ac_config.get("phone_number")
    CALL_DURATION = ac_config.get("call_duration")
    WAIT_TIME_AFTER_HANGUP = ac_config.get("wait_time_after_hangup")
    NUM_CALLS = ac_config.get("num_calls")
    SPECIFIC_DEVICES = ac_config.get("specific_devices", [])

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

if __name__ == "__main__":
    main()
